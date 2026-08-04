"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { news, awards, InsightItem } from "@/data/insights";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./insights.module.css";

const InsightsPage = () => {
  const [activeTab, setActiveTab] = useState<"all" | "news" | "award" | "article">("all");
  const { language, t } = useLanguage();

  // Merge and sort all insights by date
  // Since awards have a simple "year" (e.g. "2021", "2022"), we can construct a comparable date.
  // For sorting: rawDate is used for news/articles, and year is used for awards.
  const getSortTime = (item: InsightItem) => {
    if (item.type === "news" || item.type === "article") {
      const newsItem = news.find(n => n.id === item.id);
      return newsItem && newsItem.rawDate ? new Date(newsItem.rawDate).getTime() : 0;
    } else {
      // Award: e.g. "2021" -> Jan 1, 2021
      return new Date(`${item.date}-01-01`).getTime();
    }
  };

  // Combine items
  const allItems: InsightItem[] = [
    ...news.map(n => ({ ...n, type: n.type || ("news" as const) })),
    ...awards.map(a => ({ ...a, type: "award" as const }))
  ];

  // Sort: most recent first
  allItems.sort((a, b) => getSortTime(b) - getSortTime(a));

  // Filter items
  const filteredItems = allItems.filter(item => {
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <section className={styles.headerSection}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>{t("Insights")}</h1>
            <p className={styles.subtitle}>{t("Latest press releases, corporate updates, and architectural accolades")}</p>
          </div>
          <div className={styles.headerImageWrapper}>
            <video
              src="/assets/magnific_i-want-the-robot-to-read-_s7SZZqVl8e.mp4"
              autoPlay
              loop
              muted
              playsInline
              className={styles.headerImage}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
            />
          </div>
        </section>
      </header>

      {/* Elegant tab toggles */}
      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tabBtn} ${activeTab === "all" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("all")}
        >
          {t("ALL")}
        </button>
        <span className={styles.divider}>/</span>
        <button 
          className={`${styles.tabBtn} ${activeTab === "news" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("news")}
        >
          {t("NEWS")}
        </button>
        <span className={styles.divider}>/</span>
        <button 
          className={`${styles.tabBtn} ${activeTab === "article" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("article")}
        >
          {t("ARTICLES")}
        </button>
        <span className={styles.divider}>/</span>
        <button 
          className={`${styles.tabBtn} ${activeTab === "award" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("award")}
        >
          {t("AWARDS")}
        </button>
      </div>

      {/* Insights Grid */}
      <div className={styles.grid}>
        {filteredItems.map(item => {
          const translatedTitle = t(item.title);
          const translatedBadge = item.type === "award" ? t("AWARDS") : (item.type === "article" ? t("ARTICLES") : t("NEWS"));
          const translatedExcerpt = language === "ar" ? 
            (item.type === "award" ? "تأسست هذه الجائزة تقديراً للتميز المعماري والابتكار العمراني." : 
             (item.type === "article" ? item.excerpt : "توقيع اتفاقية استشارية وتصميمية جديدة لتعزيز الهوية المعمارية للمشاريع.")) 
            : item.excerpt;

          return (
            <article key={item.slug + '-' + item.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={item.image || "/assets/projects/cover.jpg"}
                  alt={translatedTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.image}
                  priority={false}
                />
                <span className={`${styles.badge} ${item.type === 'award' ? styles.badgeAward : (item.type === 'article' ? styles.badgeArticle : styles.badgeNews)}`}>
                  {translatedBadge}
                </span>
              </div>
              
              <div className={styles.content}>
                <span className={styles.date}>{item.date}</span>
                <h2 className={styles.cardTitle}>
                  <Link href={`/insights/${item.slug}`} className={styles.cardLink}>
                    {translatedTitle}
                  </Link>
                </h2>
                <p className={styles.excerpt}>{translatedExcerpt}</p>
                
                <Link href={`/insights/${item.slug}`} className={styles.readMore}>
                  {t("READ MORE")} <span className={styles.arrow}>→</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsPage;
