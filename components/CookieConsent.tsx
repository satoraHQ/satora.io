"use client";

import Link from "next/link";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

interface ConsentPreferences {
  necessary: boolean; // Always true
  functional: boolean;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    functional: false,
  });

  const bannerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Only show the banner for EU/EEA/UK visitors (set by middleware via cf-ipcountry)
    const isEU = document.cookie.split("; ").some((c) => c === "geo-eu=1");

    const savedConsent = localStorage.getItem("cookie-consent");
    let timerId: ReturnType<typeof setTimeout> | undefined;

    if (!savedConsent && isEU) {
      setShowBanner(true);
      timerId = setTimeout(() => {
        setIsVisible(true);
        closeButtonRef.current?.focus();
      }, 100);
    }

    return () => {
      if (timerId !== undefined) clearTimeout(timerId);
    };
  }, []);

  // Handle Escape key to close banner
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showBanner) {
        handleDecline();
      }
    };

    if (showBanner) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [showBanner]);

  // Focus trap within banner
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Tab" && bannerRef.current) {
      const focusableElements = bannerRef.current.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])",
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allPrefs: ConsentPreferences = {
      necessary: true,
      functional: true,
    };

    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-preferences", JSON.stringify(allPrefs));

    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-preferences", JSON.stringify(preferences));

    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  const handleDecline = () => {
    const minimalPrefs: ConsentPreferences = {
      necessary: true,
      functional: false,
    };

    localStorage.setItem("cookie-consent", "declined");
    localStorage.setItem("cookie-preferences", JSON.stringify(minimalPrefs));

    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  const handleClose = () => {
    handleDecline();
  };

  const togglePreference = (key: keyof ConsentPreferences) => {
    if (key === "necessary") return;
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      onKeyDown={handleKeyDown}
      className={`
      fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 md:max-w-md
      bg-gradient-to-br from-white to-gray-50 dark:from-white/[0.06] dark:to-white/[0.03]
      backdrop-blur-xl
      border border-gray-200/60 dark:border-white/10
      rounded-[1.5rem]
      shadow-lg
      p-5 md:p-6
      z-50
      transition-all duration-500 ease-out
      ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}
    `}
    >
      {/* Close button */}
      <button
        ref={closeButtonRef}
        onClick={handleClose}
        className="
          absolute top-3 right-3
          w-7 h-7
          flex items-center justify-center
          text-gray-400 dark:text-gray-500
          hover:text-gray-700 dark:hover:text-gray-200
          hover:bg-gray-100/50 dark:hover:bg-white/10
          rounded-full
          transition-all duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
          group
        "
        aria-label="Dismiss cookie consent banner"
        title="Close"
        type="button"
      >
        <svg
          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-90"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
        <span className="sr-only">Close cookie consent banner</span>
      </button>

      <div className="flex flex-col gap-3">
        {/* Title and description */}
        <div className="pr-6">
          <h3
            id="cookie-consent-title"
            className="text-base font-semibold text-black dark:text-white mb-1.5"
          >
            We value your privacy
          </h3>
          <p
            id="cookie-consent-description"
            className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            {!showDetails
              ? (
                <>
                  We use cookies to improve your experience.
                </>
              )
              : (
                <>
                  Select which cookies you'd like to accept. Necessary cookies are always enabled.
                </>
              )}
          </p>

          {/* Privacy Links */}
          <div className="flex items-center gap-3 mt-2">
            <Link
              href="https://docs.satora.io"
              className="text-[12px] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              Privacy
            </Link>
            <span className="text-gray-300 dark:text-gray-600 text-[10px]">
              |
            </span>
            <Link
              href="https://docs.satora.io"
              className="text-[12px] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              Cookies
            </Link>
            <span className="text-gray-300 dark:text-gray-600 text-[10px]">
              |
            </span>
            <Link
              href="https://docs.satora.io"
              className="text-[12px] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              Terms
            </Link>
          </div>
        </div>

        {/* Cookie Preferences - Expandable */}
        {showDetails && (
          <div className="border-t border-gray-200/60 dark:border-white/10 pt-3 space-y-2.5">
            {/* Necessary Cookies */}
            <label className="flex items-center gap-2.5 cursor-default">
              <input
                type="checkbox"
                checked={preferences.necessary}
                disabled
                className="w-3.5 h-3.5 rounded border-gray-300 cursor-not-allowed opacity-40 accent-lime-light"
              />
              <span className="text-[13px] text-gray-400 dark:text-gray-500">
                Necessary (always on)
              </span>
            </label>

            {/* Functional Cookies */}
            <label
              htmlFor="functional"
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <input
                type="checkbox"
                id="functional"
                checked={preferences.functional}
                onChange={() => togglePreference("functional")}
                className="w-3.5 h-3.5 rounded border-gray-300 accent-lime-light cursor-pointer"
              />
              <span className="text-[13px] text-black dark:text-white">
                Functional
              </span>
            </label>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          {!showDetails
            ? (
              <>
                <div className="flex gap-2">
                  <button
                    onClick={handleDecline}
                    aria-label="Decline all cookies"
                    className="flex-1 h-9 px-4 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-transparent border border-gray-300 dark:border-white/15 rounded-full hover:border-gray-500 dark:hover:border-white/30 active:scale-95 transition-all duration-150 ease-out"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="flex-1 h-9 px-4 text-xs font-semibold text-black dark:text-white bg-transparent border border-gray-300 dark:border-white/15 rounded-full hover:border-gray-500 dark:hover:border-white/30 active:scale-95 transition-all duration-150 ease-out"
                  >
                    Manage
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    aria-label="Accept all cookies"
                    className="flex-1 h-9 px-4 text-xs font-semibold text-black bg-lime-light rounded-full hover:brightness-[0.93] active:scale-95 transition-all duration-150 ease-out"
                  >
                    Accept
                  </button>
                </div>
              </>
            )
            : (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 h-9 px-4 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-transparent border border-gray-300 dark:border-white/15 rounded-full hover:border-gray-500 dark:hover:border-white/30 active:scale-95 transition-all duration-150 ease-out"
                >
                  Back
                </button>
                <button
                  onClick={handleAcceptSelected}
                  aria-label="Accept selected cookies"
                  className="flex-1 h-9 px-4 text-xs font-semibold text-black bg-lime-light rounded-full hover:brightness-[0.93] active:scale-95 transition-all duration-150 ease-out"
                >
                  Save Selection
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
