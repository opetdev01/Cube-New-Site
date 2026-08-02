'use client';

import React, { useEffect, useRef } from 'react';
import styles from './IdentityManifesto.module.css';
import { IdentityData } from './IdentityData';
import { GlobalMap } from './GlobalMap';
import { SpiritStar } from './SpiritStar';
import { useLanguage } from '@/components/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IdentityManifesto = () => {
  const containerRef = useRef(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations for all labels and titles
      gsap.utils.toArray<Element>(`.${styles.section}`).forEach((section) => {
        gsap.from(section.querySelectorAll('.reveal'), {
          opacity: 0,
          y: 60,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          }
        });
      });

      // Special rotation for the Spirit Star
      gsap.to('.star-svg', {
        rotation: 360,
        duration: 100,
        repeat: -1,
        ease: "none",
        scrollTrigger: {
            trigger: `.${styles.starSection}`,
            start: "top bottom",
            toggleActions: "play pause resume pause"
        }
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.wrapper}>
      
      {/* 1. KEY FIGURES SECTION */}
      <section className={styles.section}>
        <span className={`${styles.label} reveal`}>{t("Global Metrics")}</span>
        <h2 className={`${styles.title} reveal`}>
          {language === "ar" ? <>كيو ب <br /> <span style={{color: '#e30613'}}>للاستشارات</span> <br /> بالأرقام</> : <>Cube <br /> <span style={{color: '#e30613'}}>Consultants</span> <br /> In Numbers</>}
        </h2>
        
        <div className={styles.metricGrid}>
          {IdentityData.metrics.filter(m => !m.highlight).map((m, i) => (
            <div key={i} className={`${styles.metricItem} reveal`}>
              <span className={styles.metricNum}>{m.value}</span>
              <span className={styles.metricLabel}>{t(m.label)}</span>
            </div>
          ))}
        </div>

        <div className={`${styles.yearsBadge} reveal`}>
           <div className={styles.yearsNum}>35+</div>
           <div className={styles.metricLabel}>
             {language === "ar" ? <>سنوات من <br /> التميز والخبرة <br /> الهندسية</> : <>Years of <br /> Engineering <br /> Mastery</>}
           </div>
        </div>
      </section>

      {/* 2. GLOBAL FOOTPRINT SECTION */}
      <section className={`${styles.section} ${styles.mapSection}`}>
        <span className={`${styles.label} reveal`}>{t("Worldwide Network")}</span>
        <h2 className={`${styles.title} reveal`}>
          {language === "ar" ? <>كيو ب <br /> عالمياً</> : <>Cube <br /> Globally</>}
        </h2>
        <div className={`${styles.mapWrapper} reveal`}>
          <GlobalMap className="map-trigger" />
        </div>
      </section>

      {/* 3. MORAL PRINCIPLES SECTION */}
      <section className={styles.section} style={{ paddingBottom: 0 }}>
        <span className={`${styles.label} reveal`}>{t("The Moral Principles")}</span>
        <div className={styles.principlesGrid}>
          {IdentityData.principles.map((p, i) => (
            <div key={i} className={`${styles.principleItem} reveal`}>
              <span className={styles.pHeader}>{p.id}. {t(p.title)}</span>
              <h3 className={styles.pTitle}>{t(p.core)}</h3>
              <ul className={styles.pList}>
                {p.details.map((d, di) => <li key={di}>{t(d)}</li>)}
              </ul>
              <div className={styles.pCommitment}>{t("Commitment")}: {t(p.commitment)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SPIRIT CARE / PHILOSOPHY SECTION */}
      <section className={`${styles.section} ${styles.starSection}`}>
        <span className={`${styles.label} reveal`}>{t("2026 Design Philosophy")}</span>
        <div className={`${styles.starDisplay} reveal`}>
          <SpiritStar className="star-svg" />
        </div>
        <h2 className="reveal" style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase' }}>
            {t("Spaces that heal, inspire, and connect")}
        </h2>
      </section>

      {/* 5. CORE DEPARTMENTS SECTION */}
      <section className={styles.section}>
        <span className={`${styles.label} reveal`}>{t("Divisional Excellence")}</span>
        <div className={styles.servicesGrid}>
          {IdentityData.services.map((s, i) => (
            <div key={i} className={`${styles.serviceItem} reveal`}>
              <span className={styles.label} style={{ marginBottom: '20px' }}>{t("Part")} {s.id}</span>
              <h3 className={styles.sTitle}>{t(s.name)}</h3>
              <ul className={styles.pList} style={{ marginTop: '30px' }}>
                {s.bullets.map((b, bi) => <li key={bi}>{t(b)}</li>)}
              </ul>
              <div className={styles.sValue}>{t("Value")}: {t(s.value)}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default IdentityManifesto;
