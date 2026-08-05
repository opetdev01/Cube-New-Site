"use client";

import React, { useState, useRef } from "react";
import { useLanguage } from "@/components/LanguageContext";
import Image from "next/image";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const { language, t } = useLanguage();
  const [videoSrc, setVideoSrc] = useState("/assets/magnific_i-want-the-robot-to-make-_P3NLI7242C.mp4");
  const maquetteVideoRef = useRef<HTMLVideoElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const handleRobotSayBye = () => {
    setVideoSrc("/assets/magnific_make-the-robot-make-bye-b_lJSCNOSgv9.mp4");
    const video = maquetteVideoRef.current;
    if (video) {
      video.muted = true;
      video.src = "/assets/magnific_make-the-robot-make-bye-b_lJSCNOSgv9.mp4";
      video.load();
      video.play().catch(err => console.warn("Video play failed:", err));
    }

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      
      const text = language === "ar" 
        ? "شكراً لزيارتكم كيو ب للاستشارات. نتمنى لكم يوماً سعيداً والى اللقاء!" 
        : "Thank you for visiting CUBE Consultants. Have a great day and goodbye!";
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (language === "ar") {
        utterance.lang = "ar-EG";
        const voices = window.speechSynthesis.getVoices();
        const egVoice = voices.find(v => 
          v.lang.toLowerCase().includes("ar-eg") || 
          v.name.toLowerCase().includes("egypt") ||
          v.name.toLowerCase().includes("hoda") ||
          v.name.toLowerCase().includes("shakir") ||
          v.name.toLowerCase().includes("tarik")
        );
        if (egVoice) utterance.voice = egVoice;
      } else {
        utterance.lang = "en-US";
      }
      
      window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => {
      setVideoSrc("/assets/magnific_i-want-the-robot-to-make-_P3NLI7242C.mp4");
      const video = maquetteVideoRef.current;
      if (video) {
        video.muted = true;
        video.src = "/assets/magnific_i-want-the-robot-to-make-_P3NLI7242C.mp4";
        video.load();
        video.play().catch(err => console.warn("Video play failed:", err));
      }
    }, 5500);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Blurred background elements */}
      <div className={styles.backgroundBlur} />
      <div className={styles.blurCircleRed} />
      <div className={styles.blurCircleWhite} />

      <div className={styles.contentWrapper}>
        <div className={styles.contentGrid}>

          {/* Left Column: Office info */}
          <div className={styles.infoColumn}>
            <header className={styles.header} style={{ marginBottom: "2.5rem" }}>
              <span className={styles.subtitle}>{t("Get in Touch")}</span>
              <h1 className={styles.title}>{t("Contact Us")}</h1>
              <div className={styles.titleDivider} />
            </header>
            <div className={styles.glassCard}>
              <div className={styles.infoBlock}>
                <h3>{t("Our Profile")}</h3>
                <p className={styles.profileText}>
                  {t("CUBE was founded in 1990 by Prof. Ashraf Abdel Mohsen, professor of architecture at the Faculty of Engineering, Ain Shams University, Cairo, Egypt. Over 35 years, we have crafted regional blueprints, commercial landmarks, and communities with architectural mastery.")}
                </p>
              </div>

              <div className={styles.infoBlock}>
                <h3>{t("Cairo Headquarters")}</h3>
                <div className={styles.contactItem}>
                  <span className={styles.itemLabel}>{t("ADDRESS")}</span>
                  <p>{t("6 Somal Street, Korba, Cairo, Egypt")}</p>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.itemLabel}>{t("TELEPHONE")}</span>
                  <p>{t("(+2) 02 2417 9168 / 02 2690 0673")}</p>
                  <p>{language === "ar" ? "٩٨٠ ٠٨٨ ٩ ٠١٠ / ٤٥ ٠٢ ٨٠ ٢١ (٢+)" : "(+2) 02 2180 2045 / 01020889980"}</p>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.itemLabel}>{t("EMAIL")}</span>
                  <p>
                    <a href="mailto:CUBE@CUBECONSULTANTS.ORG" className={styles.emailLink}>
                      {t("CUBE@CUBECONSULTANTS.ORG")}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed nested elegantly here */}
            <div className={styles.mapCard}>
              <iframe
                src="https://maps.google.com/maps?q=CUBE%20consultants&t=m&z=10&output=embed&iwloc=near"
                title="CUBE consultants"
                aria-label="CUBE consultants"
                loading="lazy"
                className={styles.mapIframe}
              />
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className={styles.formColumn}>
            <div className={styles.maquetteContainer}>
              <video
                ref={maquetteVideoRef}
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className={styles.maquetteVideo}
                key={videoSrc}
              />
            </div>
            <h3>{t("Send Us a Message")}</h3>

            {submitStatus === "success" ? (
              <div className={styles.successMessage}>
                <h4>{t("Thank you!")}</h4>
                <p>{t("Your message has been sent successfully. We will get back to you shortly.")}</p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className={styles.resetButton}
                >
                  {t("SEND ANOTHER MESSAGE")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">{t("Your Name")}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={language === "ar" ? "أحمد محمد" : "John Doe"}
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email">{t("Your Email")}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="subject">{t("Subject")}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={language === "ar" ? "استفسار عن الشراكة" : "Partnership Inquiry"}
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="message">{t("Message")}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder={t("Write your message here...")}
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.buttonRow}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitButton}
                  >
                    {isSubmitting ? t("SENDING...") : t("SEND MESSAGE")}
                    <span className={styles.btnLine} />
                  </button>

                  <a
                    href="https://wa.me/201020889980"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappButton}
                    title={t("Chat on WhatsApp")}
                    aria-label="Chat on WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" className={styles.whatsappIcon}>
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 1.981 14.119.957 11.997.957c-5.444 0-9.87 4.372-9.875 9.802-.001 1.768.474 3.49 1.374 5.013l-.994 3.633 3.73-.969zm11.168-5.367c-.29-.145-1.716-.848-1.982-.946-.266-.097-.459-.145-.653.145-.193.29-.748.946-.918 1.14-.17.193-.339.218-.629.073-.29-.145-1.222-.45-2.328-1.437-.86-.767-1.44-1.716-1.609-2.007-.17-.29-.018-.447.127-.591.13-.13.29-.339.435-.508.145-.17.193-.29.29-.483.097-.193.048-.363-.024-.508-.073-.145-.653-1.573-.895-2.153-.236-.569-.475-.491-.653-.5-.17-.008-.363-.009-.556-.009-.193 0-.507.073-.772.363-.266.29-1.014.99-1.014 2.415 0 1.425 1.038 2.802 1.182 2.996.145.193 2.043 3.12 4.949 4.373.691.298 1.232.476 1.653.609.694.22 1.327.189 1.827.114.557-.083 1.716-.701 1.958-1.378.243-.677.243-1.258.17-1.378-.073-.12-.266-.193-.556-.339z" />
                    </svg>
                  </a>
                </div>
              </form>
            )}

            {/* Q Robot Bye Trigger Button */}
            <button
              type="button"
              onClick={handleRobotSayBye}
              className={styles.robotByeBtn}
            >
              <img src="/assets/q-robot-face.png" alt="Q Robot" className={styles.qRobotIcon} />
              <span>{language === "ar" ? "كيو يريد توديعكم" : "Q wants to say bye"}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
