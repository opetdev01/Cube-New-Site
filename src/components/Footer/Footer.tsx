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
    { name: t("SERVICES"), path: "/services" },
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
          <div className={styles.footerSocialsRow}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              in
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              ig
            </a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" aria-label="Behance">
              bē
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              tw
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
