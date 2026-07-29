"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { news, awards, InsightItem } from "@/data/insights";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./slug.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const InsightDetailPage = ({ params }: PageProps) => {
  const { slug } = use(params);
  const { language, t } = useLanguage();

  // Find item in news or awards
  let item: InsightItem | undefined = news.find(n => n.slug === slug);
  let isAward = false;

  if (!item) {
    item = awards.find(a => a.slug === slug);
    isAward = true;
  }

  if (!item) {
    notFound();
  }

  const isArticle = item.type === "article";

  // Pre-translated structural fallbacks
  const translatedTitle = t(item.title);
  const translatedBadge = isAward ? t("AWARDS") : (isArticle ? t("ARTICLES") : t("NEWS"));
  const translatedBack = t("Back to Portfolio");

  const translatedExcerpt = language === "ar" ? 
    (isAward ? "تأسست هذه الجائزة تقديراً للتميز المعماري والابتكار العمراني والمجتمعي الفائز بالمراكز الأولى عالمياً." : 
     (isArticle ? item.excerpt : "توقيع اتفاقية استشارية وتصميمية جديدة لتعزيز الهوية المعمارية والارتقاء بالتخطيط العمراني المتقدم.")) 
    : item.excerpt;

  const galleryImages = (item.gallery && item.gallery.length > 0)
    ? item.gallery
    : (item.image ? [item.image] : []);

  return (
    <div className={styles.container}>
      {/* Back button & Header - Aligned to wide grid layout */}
      <div className={styles.headerWrapper}>
        <div className={styles.backContainer}>
          <Link href="/insights" className={styles.backLink}>
            <span className={styles.backArrow}>←</span> {translatedBack}
          </Link>
        </div>

        <header className={styles.header}>
          <span className={`${styles.badge} ${isAward ? styles.badgeAward : (isArticle ? styles.badgeArticle : styles.badgeNews)}`}>
            {translatedBadge}
          </span>
          <span className={styles.date}>{item.date}</span>
          <h1 className={styles.title}>{translatedTitle}</h1>
        </header>
      </div>

      {/* Featured Hero Banner - Edge-to-Edge with 100% viewport width */}
      {item.image && (
        <div className={styles.imageWrapper}>
          <Image 
            src={item.image}
            alt={translatedTitle}
            fill
            className={styles.image}
            priority
          />
        </div>
      )}

      {/* Article Grid Container - Wide two-column split layout */}
      <div className={styles.gridContainer}>
        {/* Left Column: Article Body Description */}
        <div className={styles.leftCol}>
          {isAward && (
            <div className={styles.awardShowcase}>
              <p className={styles.awardDescription}>{translatedExcerpt}</p>
            </div>
          )}

          <div 
            className={styles.articleBody}
            dangerouslySetInnerHTML={{ __html: item.content || `<p>${translatedExcerpt}</p>` }}
          />
        </div>

        {/* Right Column: Meta Information & Media Gallery */}
        <div className={styles.rightCol}>
          <div className={styles.infoBox}>
            <h3 className={styles.infoBoxTitle}>{t("Information")}</h3>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>{t("Category")}:</span>
              <span className={styles.infoValue}>{translatedBadge}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>{t("Date")}:</span>
              <span className={styles.infoValue}>{item.date}</span>
            </div>
            {isAward && item.projectSlug && (
              <div className={styles.ctaWrapper}>
                <Link href={`/projects/${item.projectSlug}`} className={styles.projectLinkBtn}>
                  {t("VIEW PROJECT")} <span className={styles.ctaArrow}>→</span>
                </Link>
              </div>
            )}
          </div>

          {/* Inline Media Gallery */}
          {galleryImages.length > 0 && (
            <div className={styles.gallerySection}>
              <h3 className={styles.galleryTitle}>{t("Media Gallery")}</h3>
              <div className={styles.galleryGrid}>
                {galleryImages.map((imgUrl, i) => (
                  <div key={i} className={styles.galleryImageWrapper}>
                    <Image 
                      src={imgUrl}
                      alt={`${translatedTitle} - Image ${i + 1}`}
                      fill
                      className={styles.galleryImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightDetailPage;
