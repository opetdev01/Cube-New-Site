"use client";

import React, { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { news, awards, InsightItem } from "@/data/insights";
import { getInsightArabicContent } from "@/data/insightsTranslations";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./slug.module.css";

const allInsights: InsightItem[] = [...news, ...awards];

interface PageProps {
  params: Promise<{ slug: string }>;
}

const InsightDetailPage = ({ params }: PageProps) => {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { language, t } = useLanguage();

  const item = allInsights.find((i) => i.slug === slug);

  if (!item) {
    return (
      <div className={styles.container} style={{ padding: "160px 6vw", textAlign: "center" }}>
        <h1>{t("Insight Not Found")}</h1>
        <p>{t("The requested insight or award does not exist.")}</p>
        <Link href="/insights" className={styles.backLink} style={{ marginTop: "20px" }}>
          ← {t("Back to Portfolio")}
        </Link>
      </div>
    );
  }

  const isAward = item.type === "award";
  const isArticle = item.type === "article";

  // Pre-translated structural & content fallbacks
  const arData = getInsightArabicContent(item);
  const translatedTitle = language === "ar" ? arData.titleAr : t(item.title);
  const translatedBadge = isAward ? t("AWARDS") : (isArticle ? t("ARTICLES") : t("NEWS"));
  const translatedBack = t("Back to Portfolio");
  const translatedExcerpt = language === "ar" ? arData.excerptAr : item.excerpt;
  const translatedContent = language === "ar" ? arData.contentAr : (item.content || `<p>${item.excerpt}</p>`);

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
            dangerouslySetInnerHTML={{ __html: translatedContent }}
          />
        </div>

        {/* Right Column: Meta Information */}
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
        </div>
      </div>

      {/* Full-width Media Gallery placed under text */}
      {galleryImages.length > 0 && (
        <div className={styles.fullWidthGallerySection}>
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
  );
};

export default InsightDetailPage;
