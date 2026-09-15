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
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" 
                />
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
