"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";
import ObsidianSystem from "@/components/SpiritCare/ObsidianSystem";
import CubeEquation from "@/components/CubeEquation/CubeEquation";
import styles from "./about.module.css";

const PARTNER_LOGOS_GENERAL = Array.from({ length: 66 }, (_, i) => `/assets/partners_v5/general_${i}.png`);
const PARTNER_LOGOS_GOV = Array.from({ length: 18 }, (_, i) => `/assets/partners_v5/gov_${i}.png`);

export default function AboutPage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <div id="cube-architectural-grid" className={styles.cubeArchitecturalGrid}>
      <div className={styles.cgContainer}>
        
        {/* 1. KEY FIGURES */}
        <div className={`${styles.cgSection} ${styles.metricsBgSection}`}>
          <div className={styles.bgOverlay}>
            <Image 
              src="/assets/cube_entrance.jpg"
              alt="CUBE Consultants Entrance"
              fill
              className={styles.bgImage}
              priority
            />
            <div className={styles.bgColorOverlay} />
          </div>

          <div className={styles.metricsContent}>
            <span className={styles.cgLabel} style={{ color: '#e30613' }}>{t("Identity Framework")}</span>
            <h1 
              className={styles.cgTitle}
              style={{ color: '#ffffff', borderInlineStartColor: '#e30613' }}
              dangerouslySetInnerHTML={{ 
                __html: t("The Power of <br> Engineering <span style=\"color:#e30613\">Visions</span>") 
              }}
            />
            
            <div className={styles.cgMetricsGrid}>
              <div>
                <span className={styles.cgMetricVal} style={{ color: '#ffffff' }}>+500</span>
                <span className={styles.cgMetricLbl} style={{ color: '#eaeaea' }}>{t("Architecture Projects")}</span>
              </div>
              <div>
                <span className={styles.cgMetricVal} style={{ color: '#ffffff' }}>+250</span>
                <span className={styles.cgMetricLbl} style={{ color: '#eaeaea' }}>{t("Urban Masterplans")}</span>
              </div>
              <div>
                <span className={styles.cgMetricVal} style={{ color: '#ffffff' }}>+50</span>
                <span className={styles.cgMetricLbl} style={{ color: '#eaeaea' }}>{t("National Visions")}</span>
              </div>
              <div>
                <span className={styles.cgMetricVal} style={{ color: '#ffffff' }}>+35</span>
                <span className={styles.cgMetricLbl} style={{ color: '#eaeaea' }}>{t("Years of Mastery")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership / Founder & CEO */}
        <div className={styles.ceoLayout}>
          <div className={styles.ceoImageContainer}>
            <Image 
              src="/assets/1781339129945-removebg-preview.png"
              alt="Dr. Ashraf Abdel Mohsen"
              fill
              className={styles.ceoImage}
              sizes="(max-width: 768px) 100vw, 320px"
              priority
            />
          </div>
          <div className={styles.ceoTextContainer}>
            <span className={styles.cgLabel}>{t("Leadership")}</span>
            <h2 className={styles.ceoName}>{t("Dr. Ashraf Abdel Mohsen")}</h2>
            <span className={styles.ceoSubtitle}>{t("Founder & CEO")}</span>
            <p className={styles.ceoBio}>
              {t("In 1990, Professor Dr. Ashraf Abdel Mohsen founded CUBE, an architecture firm with a specialized focus. Driven by his passion for the field, he carefully selected a team of skilled designers and creatives to collaborate closely on projects, bringing unique visions to fruition. Abdel Mohsen’s goal was to promote sustainable urban expansion that adhered to international standards. He proposed a visionary plan named Cairo 2050 to enhance the urban quality of Cairo, which spanned from 2005 to 2010.")}
            </p>
          </div>
        </div>

        {/* 2. PURE VECTOR MAP */}
        <div className={styles.cgMapBox}>
          <svg viewBox="0 0 1000 500" width="100%" height="auto" style={{ display: "block", margin: "0 auto" }}>
            
            <image href="/world-map.svg" xlinkHref="/world-map.svg" x="0" y="0" width="1000" height="500" preserveAspectRatio="none" opacity="0.85"/>
            
            <text x="30" y="60" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="28" fill="#000" letterSpacing="-0.02em">
              {t("CUBE GLOBALY")}
            </text>

            <g transform="translate(0, 15)">
              {/* Animated Rings */}
              <circle className={styles.ringAnim} cx="583" cy="175" r="50" stroke="#e30613" strokeWidth="1" fill="none" opacity="0.6"/>
              <circle className={styles.ringAnim} cx="583" cy="175" r="120" stroke="#e30613" strokeWidth="1" fill="none" opacity="0.4"/>
              <circle className={styles.ringAnim} cx="583" cy="175" r="210" stroke="#e30613" strokeWidth="1" fill="none" opacity="0.2"/>
              
              {/* EGYPT */}
              <Link href="/projects/thecapitalcairo" className={styles.cgMapLink}>
                <circle cx="583" cy="175" r="16" fill="#777777" opacity="0.4" style={{ pointerEvents: "none" }} />
                <circle cx="583" cy="175" r="5" fill="#e30613" />
                <text x="583" y="198" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" fill="#000" textAnchor="middle">
                  {t("Egypt")}
                </text>
              </Link>

              {/* KSA */}
              <Link href="/projects/skiv" className={styles.cgMapLink}>
                <circle cx="630" cy="188" r="4" fill="#e30613"/>
                <text x="630" y="205" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="13" fill="#000" textAnchor="middle">
                  {t("KSA")}
                </text>
              </Link>

              {/* UAE */}
              <Link href="/projects/majarra" className={styles.cgMapLink}>
                <circle cx="660" cy="180" r="4" fill="#e30613"/>
                <text x="660" y="172" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="12" fill="#000" textAnchor="middle">
                  {t("UAE")}
                </text>
              </Link>

              {/* Oman */}
              <Link href="/projects/jusur-competition-ksa-2" className={styles.cgMapLink}>
                <circle cx="665" cy="195" r="4" fill="#e30613"/>
                <text x="673" y="199" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="12" fill="#000" textAnchor="start">
                  {t("Oman")}
                </text>
              </Link>

              {/* Palestine */}
              <Link href="/projects/gaza-vision" className={styles.cgMapLink}>
                <circle cx="595" cy="160" r="4" fill="#e30613"/>
                <text x="590" y="155" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="11" fill="#000" textAnchor="end">
                  {t("Palestine")}
                </text>
              </Link>
              
              {/* Iraq */}
              <Link href="/projects" className={styles.cgMapLink}>
                <circle cx="619" cy="158" r="4" fill="#e30613"/>
                <text x="625" y="153" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="11" fill="#000">
                  {t("Iraq")}
                </text>
              </Link>
              
              {/* Libya */}
              <Link href="/projects" className={styles.cgMapLink}>
                <circle cx="547" cy="177" r="4" fill="#e30613"/>
                <text x="540" y="180" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="11" fill="#000" textAnchor="end">
                  {t("Libya")}
                </text>
              </Link>
              
              {/* South Africa */}
              <Link href="/projects/erafrika-2" className={styles.cgMapLink}>
                <circle cx="566" cy="330" r="4" fill="#e30613"/>
                <text x="566" y="320" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="11" fill="#000" textAnchor="middle">
                  {t("South Africa")}
                </text>
              </Link>
              
              {/* Netherland */}
              <Link href="/projects" className={styles.cgMapLink}>
                <circle cx="513" cy="105" r="4" fill="#e30613"/>
                <text x="510" y="95" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="11" fill="#000" textAnchor="middle">
                  {t("Netherland")}
                </text>
              </Link>
              
              {/* Finland */}
              <Link href="/projects/helsinki-south-harbor-competition-2" className={styles.cgMapLink}>
                <circle cx="572" cy="77" r="4" fill="#e30613"/>
                <text x="580" y="80" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="11" fill="#000">
                  {t("Finland")}
                </text>
              </Link>
              
              {/* Russia */}
              <Link href="/projects/grozny-competition" className={styles.cgMapLink}>
                <circle cx="750" cy="83" r="4" fill="#e30613"/>
                <text x="750" y="73" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="11" fill="#000" textAnchor="middle">
                  {t("Russia")}
                </text>
              </Link>
              
              {/* South Korea */}
              <Link href="/projects/international-design-competition-for-library-songdo-international-city" className={styles.cgMapLink}>
                <circle cx="852" cy="150" r="4" fill="#e30613"/>
                <text x="852" y="165" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="11" fill="#000" textAnchor="middle">
                  {t("South Korea")}
                </text>
              </Link>
              
              {/* Vietnam */}
              <Link href="/projects/vingroup-cam-lam" className={styles.cgMapLink}>
                <circle cx="800" cy="211" r="4" fill="#e30613"/>
                <text x="808" y="215" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="11" fill="#000">
                  {t("Vietnam")}
                </text>
              </Link>
            </g>
          </svg>
        </div>

        {/* 3. THE CUBE EQUATION INTERACTIVE SIMULATOR */}
        <CubeEquation />

        {/* 4. SERVICES */}
        <div className={styles.cgSection}>
          <span className={styles.cgLabel}>{t("What We Do")}</span>
          <h2 className={styles.cgTitle}>{t("Our Divisions")}</h2>
          
          <div className={styles.cgServicesGrid}>
            <div className={styles.cgService}>
              <span className={styles.cgSNum}>01</span>
              <h3 className={styles.cgSTitle}>{t("City & Country Visions")}</h3>
            </div>
            <div className={styles.cgService}>
              <span className={styles.cgSNum}>02</span>
              <h3 className={styles.cgSTitle}>{t("Architecture & Urban Design")}</h3>
            </div>
            <div className={styles.cgService}>
              <span className={styles.cgSNum}>03</span>
              <h3 className={styles.cgSTitle}>{t("Technical Consultancy")}</h3>
            </div>
            <div className={styles.cgService}>
              <span className={styles.cgSNum}>04</span>
              <h3 className={styles.cgSTitle}>{t("Project Management")}</h3>
            </div>
            <div className={styles.cgService}>
              <span className={styles.cgSNum}>05</span>
              <h3 className={styles.cgSTitle}>{t("Development Advisory")}</h3>
            </div>
            <div className={styles.cgService}>
              <span className={styles.cgSNum}>06</span>
              <h3 className={styles.cgSTitle}>{t("Environment & Sustainability")}</h3>
            </div>
            <div className={styles.cgService}>
              <span className={styles.cgSNum}>07</span>
              <h3 className={styles.cgSTitle}>{t("Interior Design")}</h3>
            </div>
          </div>
        </div>

        {/* 5. PHILOSOPHY 2026 - SPIRIT CARE OBSIDIAN GRAPH SYSTEM */}
        <ObsidianSystem />

        {/* 6. PARTNERS CATALOG (DETAILED SECTION) */}
        <div className={styles.cgSection} style={{ marginTop: "100px", borderTop: "1px solid #eaeaea", paddingTop: "80px" }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <span className={styles.cgLabel}>{t("Strategic Relationships")}</span>
            <h2 className={styles.cgTitle} style={{ border: 'none', padding: 0, display: 'inline-block' }}>{t("Clients & Partners Network")}</h2>
          </div>
          
          <div className={styles.partnersCatalogCentered}>
            <div className={styles.partnersTabsCentered}>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'partners' ? styles.activeTabBtn : ''}`}
                onClick={() => setActiveTab('partners')}
              >
                {t("Partners")}
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'governmental' ? styles.activeTabBtn : ''}`}
                onClick={() => setActiveTab('governmental')}
              >
                {t("Governmental Partners")}
              </button>
            </div>

            {activeTab && (
              <div className={styles.partnerVisualGridFull}>
                {activeTab === 'partners' ? (
                  PARTNER_LOGOS_GENERAL.map((logo, idx) => (
                    <div key={`about-p-${idx}`} className={styles.aboutPartnerLogoCard}>
                      <img src={logo} alt={`Partner ${idx}`} className={styles.aboutPartnerLogoImg} />
                    </div>
                  ))
                ) : (
                  PARTNER_LOGOS_GOV.map((logo, idx) => (
                    <div key={`about-gov-${idx}`} className={styles.aboutPartnerLogoCard}>
                      <img src={logo} alt={`Gov Partner ${idx}`} className={styles.aboutPartnerLogoImg} />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
