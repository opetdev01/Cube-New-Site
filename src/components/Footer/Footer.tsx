"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./Footer.module.css";

const Footer = () => {
  const { t } = useLanguage();

  const menuItems = [
    { name: t("HOME"), path: "/" },
    { name: t("ABOUT"), path: "/about" },
    { name: t("PROJECTS"), path: "/projects" },
    { name: t("INSIGHTS"), path: "/insights" },
    { name: t("Ai Lab"), path: "/ai-lab" },
    { name: t("Art Gallery"), path: "/art-gallery" },
    { name: t("CONTACT US"), path: "/contact" },
  ];

  return (
    <>
      <div className={styles.footerSeparator} />
      <footer className={styles.footer}>
      <div className={styles.footerMainGrid}>
        
        {/* Logo and Tagline Column */}
        <div className={styles.footerLogoCol}>
          <div className={styles.logoWrapper}>
            <Image
              src="/logo-v4.png"
              alt="CUBE Consultants"
              width={80}
              height={80}
              className={styles.footerLogoImage}
              style={{ objectFit: "contain" }}
            />
          </div>
          <span className={styles.footerBrandingSubText}>
            {t("Designs and Engineers")}
          </span>
          <span style={{ fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.12em", color: "var(--c-red)", textTransform: "uppercase", marginTop: "4px", display: "block" }}>
            {t("Shaping, Peaceful, Living")}
          </span>
          <div className={styles.footerSocialsRow}>
            <a 
              href="https://www.instagram.com/cubeconsultants/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className={styles.socialIconBtn}
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/CUBECONSULTANTS" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              className={styles.socialIconBtn}
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a 
              href="https://www.youtube.com/@cubeconsultants9128" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="YouTube"
              className={styles.socialIconBtn}
              title="YouTube"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.37zF9.75 15.02V8.48l5.75 3.27-5.75 3.27z"></path>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/company/cube-consultants/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className={styles.socialIconBtn}
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

        {/* Text Block Column */}
        <div className={styles.footerAboutCol}>
          <p className={styles.footerAboutText}>
            {t("CUBE was founded in 1990, by Prof. Ashraf Abdel Mohsen, professor of architecture at the Faculty of Engineering, Ain Shams University ,Cairo, Egypt.")}
          </p>
        </div>

        {/* Contact Details Column */}
        <div className={styles.footerContactCol}>
          <div className={styles.contactDetailItem}>
            <span className={styles.contactIcon}>📍</span>
            <p>{t("6 Somal Street, Korba, Cairo, Egypt")}</p>
          </div>
          <div className={styles.contactDetailItem}>
            <span className={styles.contactIcon}>✉️</span>
            <p>{t("CUBE@CUBECONSULTANTS.ORG")}</p>
          </div>
          <div className={styles.contactDetailItem}>
            <span className={styles.contactIcon}>📞</span>
            <p>{t("(+2) 02 2417 9168 / 02 2690 0673")}</p>
          </div>
        </div>

      </div>

      {/* Elegant Horizontal Navigation links bar */}
      <nav className={styles.footerNavLinksRow} aria-label="Footer Navigation">
        {menuItems.map((item) => (
          <Link href={item.path} key={item.path} className={styles.footerNavLink}>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className={styles.footerBottomBar}>
        <p className={styles.copyrightText}>
          {t("© 2026 CUBE CONSULTANTS. ALL RIGHTS RESERVED.")}
        </p>
        <div className={styles.footerLegalLinks}>
          <Link href="/">{t("PRIVACY POLICY")}</Link>
          <Link href="/">{t("TERMS & CONDITIONS")}</Link>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
