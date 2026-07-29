"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("cube_intro_shown") === "true") {
        setShowNav(true);
      }
      const handleDismiss = () => setShowNav(true);
      window.addEventListener("cube_intro_dismissed", handleDismiss);
      return () => window.removeEventListener("cube_intro_dismissed", handleDismiss);
    }
  }, []);

  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome or Safari.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === "en" ? "en-US" : "ar-EG";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      if (event.error === "not-allowed") {
        alert(language === "en" 
          ? "Microphone access is denied or blocked. Please click the icon in your address bar to allow microphone permission." 
          : "الوصول إلى الميكروفون مرفوض. يرجى الضغط على الأيقونة في شريط العنوان للسماح بصلاحية الميكروفون.");
      } else if (event.error !== "no-speech") {
        console.warn("Speech recognition warning:", event.error);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      console.log("Recognized speech navigation:", transcript);

      // Match targets in Arabic & English
      if (
        transcript.includes("ai lab") || 
        transcript.includes("ailab") || 
        transcript.includes("مختبر") || 
        transcript.includes("ذكاء") ||
        transcript.includes("الذكاء")
      ) {
        router.push("/ai-lab");
      } else if (
        transcript.includes("portfolio") || 
        transcript.includes("projects") || 
        transcript.includes("مشاريع") || 
        transcript.includes("المشاريع") || 
        transcript.includes("اعمال")
      ) {
        router.push("/projects");
      } else if (
        transcript.includes("contact") || 
        transcript.includes("اتصل") || 
        transcript.includes("تواصل") || 
        transcript.includes("اتصل بنا")
      ) {
        router.push("/contact");
      } else if (
        transcript.includes("about") || 
        transcript.includes("من نحن") || 
        transcript.includes("عن")
      ) {
        router.push("/about");
      } else if (
        transcript.includes("services") || 
        transcript.includes("الخدمات") || 
        transcript.includes("خدمات")
      ) {
        router.push("/services");
      } else if (
        transcript.includes("insights") || 
        transcript.includes("اخبار") || 
        transcript.includes("الأخبار") || 
        transcript.includes("الرؤى")
      ) {
        router.push("/insights");
      } else if (
        transcript.includes("home") || 
        transcript.includes("الرئيسية") || 
        transcript.includes("رئيسية") || 
        transcript.includes("البداية")
      ) {
        router.push("/");
      } else if (
        transcript.includes("portal") || 
        transcript.includes("بوابة") || 
        transcript.includes("البوابة")
      ) {
        router.push("/portal");
      } else if (
        transcript.includes("art gallery") || 
        transcript.includes("gallery") || 
        transcript.includes("معرض") || 
        transcript.includes("الفنون") || 
        transcript.includes("رسم")
      ) {
        router.push("/art-gallery");
      } else {
        alert(language === "en" ? `Command not recognized: "${transcript}"` : `لم يتم التعرف على الأمر: "${transcript}"`);
      }
    };

    recognition.start();
  };

  const menuItems = [
    { name: t("HOME"), path: "/" },
    { name: t("ABOUT"), path: "/about" },
    { name: t("PORTFOLIO"), path: "/projects" },
    { name: t("SERVICES"), path: "/services" },
    { name: t("INSIGHTS"), path: "/insights" },
    { name: t("CUBE Portal"), path: "/portal" },
    { name: t("Ai Lab"), path: "/ai-lab" },
    { name: t("Art Gallery"), path: "/art-gallery" },
    { name: t("CONTACT US"), path: "/contact" },
  ];

  if (!showNav && pathname === "/") {
    return null;
  }

  return (
    <div className={styles.navbarWrapper}>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink} onClick={() => setIsOpen(false)}>
            <Image 
              src="/logo-v4.png" 
              alt="CUBE Consultants" 
              width={80} 
              height={80} 
              className={styles.logoImage}
              priority
            />
          </Link>
        </div>

        {/* Right Nav Row containing switcher & hamburger */}
        <div className={styles.navRightActions}>
          {/* Unified Lang Switcher + Mic Control Box */}
          <div className={styles.switchGroupContainer}>
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className={styles.langSwitchBtn}
              aria-label="Switch Language"
            >
              {language === "en" ? "العربية" : "EN"}
            </button>

            <button
              onClick={startSpeechRecognition}
              className={`${styles.micBtn} ${isListening ? styles.micActive : ""}`}
              aria-label="Voice Navigation"
              title={language === "en" ? "Voice Navigation" : "الملاحة الصوتية"}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
              </svg>
            </button>
          </div>

          {/* Circular Hamburger Button */}
          <button 
            className={`${styles.menuToggle} ${isOpen ? styles.toggleActive : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>

        {/* Floating Vertical Dropdown Menu under the toggle */}
        <div className={`${styles.menuDropdown} ${isOpen ? styles.dropdownActive : ""}`}>
          <div className={styles.dropdownLinks}>
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.name} 
                  href={item.path} 
                  className={`${styles.dropdownItem} ${isActive ? styles.activeItem : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
