"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./services.module.css";

interface ServiceItem {
  num: string;
  title: string;
  bgImage: string;
  checklist: string[];
  tagline: string;
}

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const { language, t } = useLanguage();

  const servicesData: ServiceItem[] = [
    {
      num: "01",
      title: t("Architecture & Urban Design"),
      bgImage: "/assets/projects/zomra-east/Townhouse-6-e1750868748108.webp",
      checklist: [
        language === "ar" ? "التصميم المفهومي" : "Concept Design",
        language === "ar" ? "التصميم التفصيلي والتخطيطي" : "Schematic & Detailed Design",
        language === "ar" ? "التخطيط العمراني والمخططات الرئيسية" : "Urban Planning & Masterplanning",
        language === "ar" ? "التصميم الداخلي" : "Interior Design"
      ],
      tagline: language === "ar" ? "تصميم موجه بالهوية وقابل للبناء" : "IDENTITY-DRIVEN, BUILDABLE DESIGN"
    },
    {
      num: "02",
      title: t("Engineering & Consultancy"),
      bgImage: "/assets/projects/kemet-business-tower/kemet_cube_11-2020-16-scaled.jpg",
      checklist: [
        language === "ar" ? "التنسيق متعدد التخصصات" : "Multidisciplinary Coordination",
        language === "ar" ? "وثائق العطاءات الفنية" : "Technical Tender Documents",
        language === "ar" ? "قيمة الهندسة" : "Value Engineering",
        language === "ar" ? "تحسين التصميم" : "Design Optimization"
      ],
      tagline: language === "ar" ? "الدقة والكفاءة" : "PRECISION AND EFFICIENCY"
    },
    {
      num: "03",
      title: t("Project Management"),
      bgImage: "/assets/projects/bashteel-train-station/bashteel-train-station.jpg",
      checklist: [
        language === "ar" ? "التخطيط والجدولة" : "Planning & Scheduling",
        language === "ar" ? "مراقبة الميزانية" : "Budget Control",
        language === "ar" ? "الإشراف على الموقع" : "Site Supervision",
        language === "ar" ? "ضمان الجودة" : "Quality Assurance"
      ],
      tagline: language === "ar" ? "التسليم في الوقت المحدد" : "ON-TIME DELIVERY"
    },
    {
      num: "04",
      title: t("City & Country Visions"),
      bgImage: "/assets/projects/thecapitalcairo/Capital-Cairo.jpg",
      checklist: [
        language === "ar" ? "الرؤى الوطنية" : "National Visions",
        language === "ar" ? "هوية المدينة" : "City Identity",
        language === "ar" ? "المفاهيم الكبرى" : "Mega Concepts"
      ],
      tagline: language === "ar" ? "تحويل المدن" : "TRANSFORMING CITIES"
    },
    {
      num: "05",
      title: t("Development Advisory"),
      bgImage: "/assets/projects/business-tower/02-1-1-scaled.jpg",
      checklist: [
        language === "ar" ? "الاستخدام الأفضل والأعلى" : "Highest & Best Use",
        language === "ar" ? "دراسات الجدوى" : "Feasibility Studies",
        language === "ar" ? "تحليل السوق" : "Market Analysis"
      ],
      tagline: language === "ar" ? "استثمارات أكثر ذكاءً" : "SMARTER INVESTMENTS"
    },
    {
      num: "06",
      title: t("Sustainability"),
      bgImage: "/assets/projects/tutera-city/TUTERA_CUBE_CONSULTANTS_20208.jpg",
      checklist: [
        language === "ar" ? "التصميم السلبي" : "Passive Design",
        language === "ar" ? "أنظمة الطاقة" : "Energy Systems",
        language === "ar" ? "حلول المياه" : "Water Solutions"
      ],
      tagline: language === "ar" ? "مشاريع جاهزة للمستقبل" : "FUTURE-READY PROJECTS"
    },
    {
      num: "07",
      title: t("Interior Design"),
      bgImage: "/assets/projects/pura-residence/pura-interior.png",
      checklist: [
        language === "ar" ? "تخطيط المساحات" : "Space Planning",
        language === "ar" ? "اختيار المواد" : "Material Selection",
        language === "ar" ? "تصميم الإضاءة" : "Lighting Design"
      ],
      tagline: language === "ar" ? "مساحات تتمحور حول الإنسان" : "HUMAN-CENTERED SPACES"
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <p className={styles.subtitle}>
          {language === "ar" ? "تشكيل مستقبل العمارة والتخطيط العمراني" : "SHAPING THE FUTURE OF ARCHITECTURE & URBANISM"}
        </p>
        <p className={styles.description}>
          {language === "ar" 
            ? "نصنع بيئات عمرانية ملهمة من خلال خدمات التصميم والاستشارات وإدارة المشاريع القائمة على الابتكار وتأصيل الهوية." 
            : "We craft inspiring built environments through design, consultancy, and project management services driven by identity and innovation."}
        </p>
        <div className={styles.titleDivider} />
      </div>

      <div className={styles.gridContainer}>
        {servicesData.map((svc) => (
          <div 
            key={svc.num} 
            className={styles.serviceCard}
            onClick={() => setSelectedService(svc)}
          >
            <div className={styles.cardBg}>
              <Image 
                src={svc.bgImage} 
                alt={svc.title} 
                fill 
                className={styles.cardBgImage}
              />
              <div className={styles.cardOverlay} />
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{svc.title}</h2>
              <span className={styles.learnMore}>LEARN MORE</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sliding Detailed Modal/Overlay matching 2nd Image Layout */}
      {selectedService && (
        <div className={styles.modalOverlay} onClick={() => setSelectedService(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeButton} 
              onClick={() => setSelectedService(null)}
              aria-label="Close details"
            >
              ×
            </button>
            <div className={styles.modalHeader}>
              <span className={styles.modalNum}>{selectedService.num}.</span>
              <h2 className={styles.modalTitle}>{selectedService.title}</h2>
            </div>
            
            <div className={styles.modalDivider} />

            <ul className={styles.checklistGrid}>
              {selectedService.checklist.map((item, idx) => (
                <li key={idx} className={styles.checklistItem}>
                  <span className={styles.checkBullet}>•</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className={styles.modalBottomTag}>
              {selectedService.tagline}
            </div>

            <div className={styles.modalAction}>
              <button 
                className={styles.bookBtn}
                onClick={() => {
                  window.location.href = "/contact?subject=" + encodeURIComponent(`Booking: ${selectedService.title}`);
                }}
              >
                {t("BOOK_APPOINTMENT")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
