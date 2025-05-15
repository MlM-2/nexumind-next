"use client";

import { useState, useEffect, ReactNode } from "react";
import "./Preloader.css";
interface PreloaderProps {
  children: ReactNode;
}

const Preloader = ({ children }: PreloaderProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleWindowLoad = () => {
      setLoading(false);
    };

    const handleFontsLoaded = () => {};

    window.addEventListener("load", handleWindowLoad);

    const timeoutFallback = setTimeout(() => {
      setLoading(false);
    }, 5);

    Promise.all([
      new Promise((resolve) => window.addEventListener("load", resolve)),
      document.fonts.ready.then(handleFontsLoaded).catch(() => {}),
    ])
      .then(() => {
        clearTimeout(timeoutFallback);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading resources:", error);
        clearTimeout(timeoutFallback);
        setLoading(false);
      });

    return () => {
      window.removeEventListener("load", handleWindowLoad);
      clearTimeout(timeoutFallback);
    };
  }, []);

  return (
    <>
      {loading ? (
        <div className="preloader">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="app-content">{children}</div>
      )}
    </>
  );
};

export default Preloader;
