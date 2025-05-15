"use client";

import { useEffect, useState } from "react";
// import "react-phone-input-2/lib/style.css"; // Import styles for react-phone-input-2
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
// Import Arabic translations for country names
import ar from "react-phone-input-2/lang/ar.json";
import { useTranslations , useLocale } from "next-intl";
import Image from 'next/image';
// Define the interface for your form inputs
interface IFormInputs {
  name: string;
  jobtitle: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  recaptchaToken?: string;
  lang?: string;
}

const GetStarted = () => {
  const  t  = useTranslations();
  const currentLang = useLocale();
  

  // Local state for form status
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("form_name_required"))
      .trim() // Automatically trims leading/trailing whitespace
      .min(2, t("form_name_min"))
      .matches(/^[\p{L}\s]+$/u, t("form_name_valid")), // Allows alphabetic characters and spaces only (no numbers/special chars)

    jobtitle: Yup.string()
      .required(t("form_jobtitle_required"))
      .trim() // Automatically trims leading/trailing whitespace
      .min(2, t("form_jobtitle_min"))
      .matches(/^[\p{L}\s]+$/u, t("form_jobtitle_valid")), // Allows alphabetic characters and spaces only (no numbers/special chars)

      company: Yup.string()
      .required(t("form_company_required"))
      .trim() // Automatically trims leading/trailing whitespace
      .min(2, t("form_company_min"))
      .matches(/^[\p{L}\s]+$/u, t("form_company_valid")), // Allows alphabetic characters and spaces only (no numbers/special chars)

    email: Yup.string()
      .required(t("form_email_required"))
      .email(t("form_email_valid"))
      .matches(/^\S*$/, t("form_email_no_whitespace")), // Disallow any whitespace

    phone: Yup.string()
      .required(t("form_phone_required"))
      .matches(/^\S*$/, t("form_phone_no_whitespace")) // Disallow any whitespace
      .test("phone-length", t("form_phone_min"), (value) => {
        if (!value) return false; // If the value is undefined or empty
        const digits = value.replace(/\D/g, ""); // Remove non-digit characters
        return digits.length >= 12; // Adjust based on your phone number requirements
      }),

    message: Yup.string()
      .required(t("form_message_required"))
      .trim() // Automatically trims leading/trailing whitespace
      .min(10, t("form_message_min")),
  });

  // Best practice usage of trim() ensures:
  // - Leading and trailing whitespace are automatically removed from "name" and "message" fields, improving data cleanliness without unnecessary validation errors.
  // - Trim is more user-friendly compared to completely rejecting the input because of unintentional spaces.

  // Initialize react-hook-form
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
    mode: "onTouched", // Validate when fields are touched
    reValidateMode: "onChange", // Re-validate fields as soon as they are changed
  });

  // ReCaptcha hook
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Modal states
  const [modalHeader, setModalHeader] = useState(t("modal_fail_header"));
  const [modalMessage, setModalMessage] = useState(t("modal_fail_message"));
  const [modalImgUrl, setModalImgUrl] = useState(t("modal_fail_img_url"));

  // Form submission
  const onSubmit = async (data: IFormInputs) => {
    setFormStatus("loading");
    // const myForm = document.getElementById("myForm") as HTMLElement;
    // const modal = document.getElementById("modal-custom") as HTMLElement;

    data.lang = currentLang;

    // Check if recaptcha is available
    if (!executeRecaptcha) {
      // console.log("Execute recaptcha not yet available");
      setFormStatus("idle");
      return;
    }

    try {
      // Get reCAPTCHA token
      const token = await executeRecaptcha("checkGetStartedForm");
      data.recaptchaToken = token;

      // Send form data to the server
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      // console.log("Success:", result);

      if (result.success) {
        setFormStatus("success");
        setModalHeader(t("modal_success_header"));
        setModalMessage(t("modal_success_message"));
        setModalImgUrl(t("modal_success_img_url"));
        reset();
      } else {
        setFormStatus("error");
        setModalHeader(t("modal_fail_header"));
        setModalMessage(t("modal_fail_message"));
        setModalImgUrl(t("modal_fail_img_url"));
      }

      setFormStatus("success");
      // myForm.style.display = "none";
      // modal.style.display = "block";
    } catch (error) {
      console.error("Error:", error);
      setFormStatus("error");
      setModalHeader(t("modal_fail_header"));
      setModalMessage(t("modal_fail_message"));
      setModalImgUrl(t("modal_fail_img_url"));
      // myForm.style.display = "none";
      // modal.style.display = "block";
    }
  };

  // Register the phone field and execute recaptcha on load
  useEffect(() => {
    if (executeRecaptcha) {
      executeRecaptcha("homepage").then(() => {
        // console.log("Recaptcha token:", token);
      });
    }
    register("phone");
  }, [executeRecaptcha, register]);

  // Render the form
  return (
    <section id="getStarted" className="container-fluid">
      <div className="row">
        <div className="col-md-5 col-sm-12">
          <b className="title-container">
            <br />
            <p dangerouslySetInnerHTML={{ __html: t("get_started_title") }}></p>
          </b>
          <div className="subtitle">{t("get_started_text")}</div>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-6 col-sm-12">
          <div
            className={
              currentLang === "ar"
                ? "rectangle-div float-end"
                : "rectangle-div float-start"
            }
          >
            {formStatus === "idle" || formStatus === "loading" ? (
              <form
                action=""
                className="input-container"
                id="myForm"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  id="name"
                  placeholder={t("form_name")}
                  className={`input-field ${errors.name ? "is-invalid" : ""}`}
                  {...register("name")}
                />
                <div className="invalid-feedback">{errors.name?.message}</div>


                <input
                  type="text"
                  id="jobtitle"
                  placeholder={t("form_jobtitle")}
                  className={`input-field ${errors.name ? "is-invalid" : ""}`}
                  {...register("jobtitle")}
                />
                <div className="invalid-feedback">{errors.jobtitle?.message}</div>

                <input
                  type="text"
                  id="company"
                  placeholder={t("form_company")}
                  className={`input-field ${errors.name ? "is-invalid" : ""}`}
                  {...register("company")}
                />
                <div className="invalid-feedback">{errors.company?.message}</div>

                <input
                  type="email"
                  id="email"
                  placeholder={t("form_email")}
                  className={`input-field ${errors.email ? "is-invalid" : ""}`}
                  {...register("email")}
                />
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors.email && <span>{errors.email.message}</span>}
                </div>

                <div className="phone-container">
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <>
                        <PhoneInput
                          {...field}
                          country="sa"
                          disableInitialCountryGuess={false}
                          disableCountryCode={false} // Allow country code in the input (required for input to work)
                          countryCodeEditable={false} // Prevent editing of the country code
                          enableAreaCodes={true}
                          excludeCountries={["il"]}
                          localization={currentLang === "ar" ? ar : undefined}
                          // inputStyle={{ paddingLeft: "58px" }} // Adjust alignment for phone number
                          disableDropdown={false}
                          onChange={(phone) => {
                            field.onChange(phone);
                            setValue("phone", phone); // Update form value
                          }}
                          disabled={formStatus === "loading"}
                        />
                      </>
                    )}
                  />
                </div>
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors.phone && <span>{errors.phone.message}</span>}
                </div>
                <textarea
                  placeholder={t("form_message")}
                  id="message"
                  className={`input-field ${
                    errors.message ? "is-invalid" : ""
                  }`}
                  {...register("message")}
                />
                <div className="invalid-feedback">
                  {errors.message?.message}
                </div>

                <div
                  id="recaptcha-badge-container"
                  className="g-recaptcha"
                  style={{ marginBottom: "1rem" }}
                ></div>

                <button
                  type="submit"
                  className="button"
                  disabled={formStatus === "loading"}
                >
                  <span className="button-text">
                    {formStatus === "loading"
                      ? t("form_submitting")
                      : t("form_submit")}
                  </span>
                </button>
              </form>
            ) : formStatus === "success" || formStatus === "error" ? (
              <div className="modal-dialog modal-custom" id="modal-custom">
                <div className="modal-content">
                  <div className="modal-body">
                    <Image loading="lazy" src={modalImgUrl} alt="Envelope" />
                    <h2
                      className={currentLang == "ar" ? "arabic-font" : ""}
                      dangerouslySetInnerHTML={{
                        __html: modalHeader,
                      }}
                    ></h2>
                    <p
                      className={currentLang == "ar" ? "arabic-font" : ""}
                      dangerouslySetInnerHTML={{
                        __html: modalMessage,
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
