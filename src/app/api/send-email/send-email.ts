import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import path from 'path';
import * as fs from 'fs';

interface PlaceholderData {
  fullName: string;
  companyName: string;
  jobTitle: string;
  businessEmail?: string;  
  phone?: string;    
  message?: string;      
}


const transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-2.amazonaws.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.AWS_SES_SMTP_USER, // Your SMTP username
    pass: process.env.AWS_SES_SMTP_PASSWORD, // Your SMTP password
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }


  const { businessEmail} = req.body;
  
  const customerHtmlFilePath = path.join(__dirname, '../../../../templates', req.body.language === "ar" ? 'request-received-ar.html' : 'request-received.html');
  const customerHtmlContent = fs.readFileSync(customerHtmlFilePath, 'utf8');
  const emailHtmlContent = replacePlaceholders(customerHtmlContent, req.body);

  const processorHtmlFilePath = path.join(__dirname, '../../../../templates', 'send-request.html');
  const processorHtmlContent = fs.readFileSync(processorHtmlFilePath, 'utf8');
  const processorEmailHtmlContent = proReplacePlaceholders(processorHtmlContent, req.body);

  // // Email content
  const customerMailOptions = {
    from: process.env.FROM_EMAIL,
    to: businessEmail,
    subject: 'Request a Demo for NexuCX',
    html: emailHtmlContent,
  };

  const processorMailOptions = {
    from: process.env.FROM_EMAIL,
    to: process.env.PROCESSOR_EMAIL,
    subject: 'New Request Received for NexuCX',
    html: processorEmailHtmlContent,
  };

  // Send email
  try {
    await transporter.sendMail(processorMailOptions);
    await transporter.sendMail(customerMailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form: ' + error });
  }
}


function replacePlaceholders(template: string, data: PlaceholderData): string {
  return template
    .replace(/{{fullName}}/g, data.fullName)
    .replace(/{{companyName}}/g, data.companyName)
    .replace(/{{jobTitle}}/g, data.jobTitle);
    // .replace(/{{country}}/g, data.country);
}

function proReplacePlaceholders(template: string, data: PlaceholderData): string {
  return template
    .replace(/{{email}}/g, data.businessEmail ?? '')
    .replace(/{{phone}}/g, data.phone ?? '')
    .replace(/{{fullName}}/g, data.fullName)
    .replace(/{{companyName}}/g, data.companyName)
    .replace(/{{jobTitle}}/g, data.jobTitle)
    .replace(/{{message}}/g, data.message ??'');
    // .replace(/{{country}}/g, data.country);
}


export function getProjectRoot(): string {
  return path.resolve(__dirname, '..');
}
