// components/MainComponents.tsx
"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import LandingSection from "./LandingSection/LandingSection";
import React, { Suspense } from "react";
import AboutUs from "./AboutUs/AboutUs";
import Products from "./Products/Products";
import Solutions from "./Solutions/Solutions";
import { useLocale } from "next-intl";

const GetStarted = React.lazy(() => import("./GetStarted/GetStarted"));
const News = React.lazy(() => import("./News/News"));


//  /const ShowNews = React.lazy(() => import("../components/News/ShowNews")); // Lazy load the component
const MainComponents = () => {
  const currentLang = useLocale();


  return (
    <div className="container-fluid content rounded-bottom-5">
      <LandingSection />
      <AboutUs />
      <Solutions />
      <Products />
       <News />
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_KEY || ""}
        language={currentLang === "ar" ? "ar" : "ar"}
        container={{
          element: "recaptcha-badge-container",
          parameters: {
            badge: "inline",
          },
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <GetStarted />
        </Suspense>
      </GoogleReCaptchaProvider>
   
    </div>
  );
};

export default MainComponents;
