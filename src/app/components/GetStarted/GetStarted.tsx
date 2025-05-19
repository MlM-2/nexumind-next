"use client";

import { useEffect, useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Controller, useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ar from "react-phone-input-2/lang/ar.json";
import { useTranslations, useLocale } from "next-intl";
import Image from 'next/image';

interface IFormInputs {
  name: string;
  jobtitle: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
  recaptchaToken?: string;
  lang?: string;
  skipRecaptcha?: boolean;
}

const GetStarted = () => {
  const t = useTranslations();
  const currentLang = useLocale();

  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("form_name_required"))
      .trim()
      .min(2, t("form_name_min"))
      .matches(/^[\p{L}\s]+$/u, t("form_name_valid")),

    jobtitle: Yup.string()
      .required(t("form_jobtitle_required"))
      .trim()
      .min(2, t("form_jobtitle_min"))
      .matches(/^[\p{L}\s]+$/u, t("form_jobtitle_valid")),

    company: Yup.string()
      .required(t("form_company_required"))
      .trim()
      .min(2, t("form_company_min"))
      .matches(/^[\p{L}\s]+$/u, t("form_company_valid")),

    email: Yup.string()
      .required(t("form_email_required"))
      .email(t("form_email_valid"))
      .matches(/^\S*$/, t("form_email_no_whitespace"))
      .matches(
        /^[a-zA-Z0-9._%+-]+@(?!gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|aol\.com|icloud\.com|mail\.ru|protonmail\.com|zoho\.com|yandex\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        currentLang === "ar" 
          ? "● يجب استخدام بريد إلكتروني خاص بشركتك."
          : "● Business email required."
      ),

    phone: Yup.string()
      .matches(/^\S*$/, t("form_phone_no_whitespace"))
      .test("phone-length", t("form_phone_min"), (value) => {
        if (!value) return true;
        const digits = value.replace(/\D/g, "");
        return digits.length <= 12;
      }),

    message: Yup.string()
      .required(t("form_message_required"))
      .trim()
      .min(10, t("form_message_min")),
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema) as Resolver<IFormInputs>,
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  
  const { executeRecaptcha } = useGoogleReCaptcha();
  const recaptchaInitialized = useRef(false);

  const [modalHeader, setModalHeader] = useState(t("modal_fail_header"));
  const [modalMessage, setModalMessage] = useState(t("modal_fail_message"));
  const [modalImgUrl, setModalImgUrl] = useState(t("modal_fail_img_url"));

  const skipRecaptcha = process.env.NEXT_PUBLIC_SKIP_RECAPTCHA === 'true';

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setFormStatus("loading");
    data.lang = currentLang;

    if (!executeRecaptcha && !skipRecaptcha) {
      console.error("reCAPTCHA not available");
      setFormStatus("error");
      setModalHeader(t("modal_fail_header"));
      setModalMessage(t("modal_fail_message") + " - reCAPTCHA not available");
      setModalImgUrl(t("modal_fail_img_url"));
      return;
    }

    try {
      if (!skipRecaptcha && executeRecaptcha) {
        const token = await executeRecaptcha("checkGetStartedForm");
        if (!token) {
          console.error("Failed to get reCAPTCHA token");
          setFormStatus("error");
          setModalHeader(t("modal_fail_header"));
          setModalMessage(t("modal_fail_message") + " - Failed to get reCAPTCHA token");
          setModalImgUrl(t("modal_fail_img_url"));
          return;
        }
        data.recaptchaToken = token;
      } else {
        data.skipRecaptcha = true;
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        setModalHeader(t("modal_success_header"));
        setModalMessage(t("modal_success_message"));
        setModalImgUrl(t("modal_success_img_url"));
        reset();
      } else {
        setFormStatus("error");
        setModalHeader(t("modal_fail_header"));
        setModalMessage(t("modal_fail_message") + (result.message ? ": " + result.message : ""));
        setModalImgUrl(t("modal_fail_img_url"));
      }
    } catch  {
      setFormStatus("error");
      setModalHeader(t("modal_fail_header"));
      setModalMessage(t("modal_fail_message") + " - Server error");
      setModalImgUrl(t("modal_fail_img_url"));
    }
  };

  useEffect(() => {
    register("phone");
    if (executeRecaptcha && !recaptchaInitialized.current) {
      recaptchaInitialized.current = true;
      executeRecaptcha("homepage").then(() => {
        console.log("reCAPTCHA initialized");
      }).catch(error => {
        console.error("reCAPTCHA init failed:", error);
        recaptchaInitialized.current = false;
      });
    }
  }, [executeRecaptcha, register]);

  useEffect(() => {
    recaptchaInitialized.current = false;
  }, [currentLang]);

  return (
    <section id="getStarted" className="container-fluid">
      <div className="row">
        <div className="col-md-5 col-sm-12">
          <b className="title-container">
            <br />
            <p dangerouslySetInnerHTML={{ __html: t("get_started_title") }}></p>
          </b>
          <div className="subtitle">{t("get_started_text")}</div>
          {skipRecaptcha && (
            <div style={{ 
              backgroundColor: "#FFF3CD", 
              color: "#856404", 
              padding: "10px", 
              borderRadius: "5px", 
              marginTop: "10px",
              textAlign: "center"
            }}>
              <strong>وضع الاختبار:</strong> تم تعطيل التحقق من الكابتشا مؤقتًا
            </div>
          )}
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
                  className={`input-field ${errors.jobtitle ? "is-invalid" : ""}`}
                  {...register("jobtitle")}
                />
                <div className="invalid-feedback">{errors.jobtitle?.message}</div>

                <input
                  type="text"
                  id="company"
                  placeholder={t("form_company")}
                  className={`input-field ${errors.company ? "is-invalid" : ""}`}
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
                    defaultValue=""
                    render={({ field }) => (
                      <PhoneInput
                        {...field}
                        country="sa"
                        disableInitialCountryGuess={false}
                        disableCountryCode={false}
                        countryCodeEditable={false}
                        enableAreaCodes={true}
                        excludeCountries={["il"]}
                        localization={currentLang === "ar" ? ar : undefined}
                        disableDropdown={false}
                        onChange={(phone) => {
                          field.onChange(phone);
                          setValue("phone", phone);
                        }}
                        disabled={formStatus === "loading"}
                      />
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
                    <Image 
                      loading="lazy" 
                      src={modalImgUrl} 
                      alt="Result envelope" 
                      width={100}
                      height={100}
                      style={{ width: 'auto', height: 'auto' }}
                    />
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