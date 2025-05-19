import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';
import * as fs from 'fs';
import { Transporter } from 'nodemailer';

interface FormData {
  name: string;
  jobtitle: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  recaptchaToken?: string;
  lang?: string;
  skipRecaptcha?: boolean;
}

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}


// interface Transporter {
//   sendMail(options: MailOptions): Promise<{ response?: string, [key: string]: any }>;
// }

function replacePlaceholders(template: string, data: { fullName: string; companyName: string; jobTitle: string }): string {

  return template
    .replace(/{{fullName}}/g, data.fullName)
    .replace(/{{companyName}}/g, data.companyName)
    .replace(/{{jobTitle}}/g, data.jobTitle);
}

function proReplacePlaceholders(template: string, data: {
  businessEmail?: string;
  phone?: string;
  fullName: string;
  companyName: string;
  jobTitle: string;
  message?: string;
}): string {

  return template
    .replace(/{{email}}/g, data.businessEmail || '')
    .replace(/{{phone}}/g, data.phone || '')
    .replace(/{{fullName}}/g, data.fullName)
    .replace(/{{companyName}}/g, data.companyName)
    .replace(/{{jobTitle}}/g, data.jobTitle)
    .replace(/{{message}}/g, data.message || '');
}

// reCAPTCHA verification function
async function verifyRecaptcha(token: string) {
  // تعطيل الكابتشا للتطوير - يمكن تفعيله أو تعطيله بسهولة
  const skipRecaptcha = process.env.SKIP_RECAPTCHA === 'true';
  if (skipRecaptcha) {
    console.log('تخطي التحقق من الكابتشا (وضع التطوير)');
    return true;
  }
  
  try {
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
      console.error('RECAPTCHA_SECRET_KEY is not defined in environment variables');
      return false;
    }

    console.log('Verifying reCAPTCHA token...');
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${recaptchaSecret}&response=${token}`,
    });

    if (!response.ok) {
      console.error(`reCAPTCHA verification failed with status: ${response.status}`);
      return false;
    }

    const data = await response.json();
    console.log('reCAPTCHA verification result:', data);
    
    if (!data.success) {
      console.error('reCAPTCHA verification returned unsuccessful response:', data['error-codes']);
    }
    
    return data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

// Create email transporter with error handling
let transporter: Transporter;
try {
  // Check if SMTP credentials are available
  if (!process.env.AWS_SES_SMTP_USER || !process.env.AWS_SES_SMTP_PASSWORD) {
    console.warn('SMTP credentials not configured, using test account');
    
    // Create a test SMTP transporter
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'ethereal.user@ethereal.email',
        pass: 'ethereal.password',
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: "email-smtp.us-east-2.amazonaws.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.AWS_SES_SMTP_USER,
        pass: process.env.AWS_SES_SMTP_PASSWORD,
      },
    });
  }
} catch (error) {
  console.error('Error creating email transporter:', error);
  // Create a fallback transporter that will be used as last resort
}

export async function POST(request: Request) {
  try {
    const formData: FormData = await request.json();
    console.log('Received form submission for:', formData.email);
    
    const skipRecaptcha = process.env.SKIP_RECAPTCHA === 'true';
    
    // Verify reCAPTCHA token (unless skipped)
    if (!skipRecaptcha) {
      if (!formData.recaptchaToken) {
        console.error('Missing reCAPTCHA token in form submission');
        return NextResponse.json({ success: false, message: 'رمز التحقق مفقود. يرجى تحديث الصفحة والمحاولة مرة أخرى.' }, { status: 400 });
      }
      
      const isRecaptchaValid = await verifyRecaptcha(formData.recaptchaToken);
      if (!isRecaptchaValid) {
        console.error('reCAPTCHA verification failed for submission:', formData.email);
        return NextResponse.json({ success: false, message: 'فشل التحقق من رمز الكابتشا. يرجى تحديث الصفحة والمحاولة مرة أخرى.' }, { status: 400 });
      }
    } else {
      console.log('تخطي التحقق من الكابتشا (وضع التطوير)');
    }

    const language = formData.lang || 'en';
    
    // Adapt form data to match expected fields in the email templates
    const adaptedData = {
      fullName: formData.name,
      jobTitle: formData.jobtitle,
      companyName: formData.company,
      businessEmail: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      console.log('Reading email templates from src/app/templates/');
      
      // Read email templates from the correct path
      const appDir = process.cwd();
      const templatesDir = path.join(appDir, 'src', 'app', 'templates');
      
      console.log('Templates directory:', templatesDir);
      
      // Use the appropriate template based on language
      const customerTemplatePath = path.join(
        templatesDir, 
        language === 'ar' ? 'request-received-ar.html' : 'request-received.html'
      );
      
      const processorTemplatePath = path.join(templatesDir, 'send-request.html');
      
      console.log('Customer template path:', customerTemplatePath);
      console.log('Processor template path:', processorTemplatePath);
      
      // Read template files
      const customerTemplate = fs.readFileSync(customerTemplatePath, 'utf8');
      const processorTemplate = fs.readFileSync(processorTemplatePath, 'utf8');
      
      // Apply placeholder replacements
      const emailHtmlContent = replacePlaceholders(customerTemplate, adaptedData);
      const processorEmailHtmlContent = proReplacePlaceholders(processorTemplate, adaptedData);
      
      console.log('Email templates processed successfully');
    
      // Email content
      const customerMailOptions: MailOptions = {
        from: process.env.FROM_EMAIL || 'contact@nexumind.com',
        to: formData.email,
        subject: language === 'ar' ? 'طلب عرض توضيحي لـ NexuCX' : 'Request a Demo for NexuCX',
        html: emailHtmlContent,
      };
  
      const processorMailOptions: MailOptions = {
        from: process.env.FROM_EMAIL || 'contact@nexumind.com',
        to: process.env.PROCESSOR_EMAIL || 'contact@nexumind.com',
        subject: 'New Request Received for NexuCX',
        html: processorEmailHtmlContent,
      };
  
      console.log('Attempting to send emails...');
      
      // Send emails with better error handling
      try {
        // First try to send the processor email
        console.log('Sending processor email to:', processorMailOptions.to);
        const processorInfo = await transporter.sendMail(processorMailOptions);
        console.log('Processor email sent successfully:', processorInfo.response || processorInfo);
        
        // Then try to send the customer confirmation email
        console.log('Sending customer email to:', customerMailOptions.to);
        const customerInfo = await transporter.sendMail(customerMailOptions);
        console.log('Customer email sent successfully:', customerInfo.response || customerInfo);
        
        return NextResponse.json({ 
          success: true, 
          message: 'تم إرسال الطلب بنجاح! سنتواصل معك قريبًا.',
          debug: {
            to: formData.email,
            processor: process.env.PROCESSOR_EMAIL || 'contact@nexumind.com'
          }
        });
      } catch {
        console.error('Failed to send email:');
        return NextResponse.json({ 
          success: false, 
          message: 'فشل في إرسال البريد الإلكتروني: ' 
        }, { status: 500 });
      }
    } catch  {
      console.error('Error with email templates:');
      return NextResponse.json({ 
        success: false, 
        message: 'Error with email templates: ' 
      }, { status: 500 });
    }
  } catch  {
    console.error('Error sending email');
    return NextResponse.json({ 
      success: false, 
      message: 'Error submitting form: ' 
    }, { status: 500 });
  }
} 