"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { projects } from "@/data/projects";
import { news, awards } from "@/data/insights";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./page.module.css";

const PARTNER_LOGOS = Array.from({ length: 66 }, (_, i) => `/assets/partners_v5/general_${i}.png`);

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const { language, t } = useLanguage();

  // Intro Splash State
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasShown = localStorage.getItem("cube_intro_shown");
      if (hasShown === "true") {
        setIsIntroActive(false);
        setVideoEnded(true);
      }
    }
  }, []);

  useEffect(() => {
    const video = introVideoRef.current;
    if (!video || !isIntroActive || videoEnded) return;

    const attemptPlay = async () => {
      try {
        video.muted = false;
        setIsMuted(false);
        await video.play();
      } catch (err) {
        // Unmuted playback blocked, retry muted
        video.muted = true;
        setIsMuted(true);
        try {
          await video.play();
        } catch (innerErr) {
          console.warn("Muted playback also blocked:", innerErr);
        }
      }
    };

    attemptPlay();
  }, [isIntroActive, videoEnded]);

  const handleDismissIntro = () => {
    setIsIntroActive(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("cube_intro_shown", "true");
      window.dispatchEvent(new Event("cube_intro_dismissed"));
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isIntroActive) {
        document.body.classList.add("intro-active");
      } else {
        document.body.classList.remove("intro-active");
      }
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.classList.remove("intro-active");
      }
    };
  }, [isIntroActive]);


  
  // Hero Carousel State
  const [heroIndex, setHeroIndex] = useState(0);
  const heroSlides = [
    {
      title: t("Kemet Tower"),
      subtitle: t("Towers & Offices"),
      description: t("An iconic modern commercial development integrating advanced building systems and structural mastery."),
      video: "/assets/Hero sec/Kemet tower.mp4",
      link: "/projects/kemet-business-tower"
    },
    {
      title: t("The Green River"),
      subtitle: t("Commercial & Retail"),
      description: t("The Green River showcases CUBE Consultants' commitment to state-of-the-art architecture, combining local heritage with contemporary principles."),
      video: "/assets/Hero sec/Green River.mp4",
      link: "/projects/the-green-river-the-capital-cairo-2"
    },
    {
      title: t("NEBU Commercial Mall"),
      subtitle: t("Commercial & Retail"),
      description: t("A premium gold-themed boutique commercial destination in the New Capital, inspired by the hieroglyphic symbol of eternity."),
      video: "/assets/Hero sec/Nebu.mp4",
      link: "/projects/nebu-new-capital"
    },
    {
      title: t("The New Administrative Capital Cairo"),
      subtitle: t("Urban Planning"),
      description: t("A futuristic national scale administrative vision establishing Cairo’s new masterplan and global administrative core."),
      video: "/assets/Hero sec/New Capital.mp4",
      link: "/projects/thecapitalcairo"
    }
  ];

  // Static services list matching services page
  const servicesList = [
    {
      num: "01",
      title: t("Architecture & Urban Design"),
      desc: t("Identity-driven and buildable masterplanning, commercial, and residential projects."),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
          <path d="M9 22V12h6v10" />
        </svg>
      )
    },
    {
      num: "02",
      title: t("Engineering & Consultancy"),
      desc: t("Precision coordination, value engineering, and structural design optimization."),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      )
    },
    {
      num: "03",
      title: t("Project Management"),
      desc: t("Rigorous construction scheduling, budget management, and site quality control."),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="15" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      )
    },
    {
      num: "04",
      title: t("City & Country Visions"),
      desc: t("Macro-level identity frameworks and development masterplans for cities and nations."),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
          <path d="M12 6v6l4 2" />
        </svg>
      )
    },
    {
      num: "05",
      title: t("Development Advisory"),
      desc: t("Feasibility studies, market analysis, and land use optimization assessments."),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 3v18h18" />
          <path d="m18.7 8-5.1 5.2-2.8-2.7L7 14.3" />
        </svg>
      )
    },
    {
      num: "06",
      title: t("Sustainability"),
      desc: t("Carbon-conscious passive architecture, smart water systems, and solar orientation."),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 22c1.25-1.67 3.33-3 6-3 3.5 0 5 2.5 8 2.5 2.5 0 4.5-1.25 6-3" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
        </svg>
      )
    },
    {
      num: "07",
      title: t("Interior Design"),
      desc: t("Human-centered indoor spaces optimizing lighting, acoustic flow, and premium materiality."),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M9 9h6v6H9z" />
        </svg>
      )
    }
  ];

  // Selected Projects (first 4)
  const homeProjects = projects.slice(0, 4);

  // Latest Insights (mix of 2 news and 2 awards)
  const homeInsights = [
    ...news.slice(0, 2),
    ...awards.slice(0, 2)
  ];

  // Auto-play timer for hero
  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(heroTimer);
  }, [heroSlides.length]);

  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.08 }}>
      {/* Intro Splash Overlay */}
      <div suppressHydrationWarning className={`${styles.introOverlay} ${!isIntroActive ? styles.introOverlayFadeOut : ""} ${videoEnded ? styles.introOverlayTransparent : ""}`}>
        {!videoEnded ? (
          <>
            <video
              ref={introVideoRef}
              src="/assets/Intro.mp4"
              muted={isMuted}
              playsInline
              onEnded={() => setVideoEnded(true)}
              className={styles.introVideoFullscreen}
            />
            <div className={styles.introControls}>
              <button 
                className={styles.soundToggleBtn} 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setIsMuted(!isMuted); 
                }}
                title={isMuted ? "Unmute Sound" : "Mute Sound"}
              >
                {isMuted ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM19 12c0 2.94-1.65 5.51-4 6.75v1.85c3.36-1.39 6-4.7 6-8.6s-2.64-7.21-6-8.6v1.85c2.35 1.24 4 3.81 4 6.75zM3 9v6h4l5 5V4L7 9H3z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 4L9.91 6.09 12 8.18V4zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.05-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-3.9-2.64-7.2-6-8.58v1.86c2.35 1.24 4 3.8 4 6.72zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v1.85c1.33-.31 2.53-.95 3.53-1.84L19.73 21 21 19.73 4.27 3zM12 11.82v6.27l-3.91-3.91H5v-4.09h3.91l3.09-3.09z" />
                  </svg>
                )}
              </button>
              <button className={styles.skipBtn} onClick={() => setVideoEnded(true)}>
                {t("Skip")}
              </button>
            </div>
          </>
        ) : (
          <button className={styles.introLogoBadge} onClick={handleDismissIntro} title={t("Enter Site")}>
            <Image
              src="/logo-v4.png"
              alt="CUBE Logo"
              width={130}
              height={130}
              className={styles.introLogoImage}
              priority
            />
          </button>
        )}
      </div>

      <div className={`${styles.homeContainer} ${isIntroActive ? styles.homeContainerHidden : ""}`} ref={containerRef}>
        
        {/* SECTION 1: FULLSCREEN HERO WITH SLIDING PROJECTS */}
        <section className={styles.heroSection}>
          {/* Fullscreen Slider Background */}
          <div className={styles.heroSlider}>
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`${styles.heroSlide} ${idx === heroIndex ? styles.activeSlide : ""}`}
              >
                <div className={styles.heroImageWrapper}>
                  <video
                    src={slide.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.heroVideo}
                  />
                  <div className={styles.heroOverlay} />
                </div>
              </div>
            ))}
          </div>

          {/* Overlaid Content Grid */}
          <div className={styles.heroContentGrid}>
            {/* Left Column: Branding, scroll info & stats */}
            <div className={styles.heroLeft}>
              <div className={styles.heroLeftContent}>
                <span className={styles.heroTagline}>
                  {t("Designs and Engineers")}
                </span>
                
                <h1 className={styles.heroBrandingTitle}>
                  {language === "ar" ? <>كيو ب<br /><span>للاستشارات</span></> : <>CUBE<br /><span>CONSULTANTS</span></>}
                </h1>
                
                <div className={styles.heroTitleAccent} />
                
                <div className={styles.heroSubtitleBlock}>
                  <p style={{ fontWeight: 800, letterSpacing: "0.08em", color: "var(--c-red)", textTransform: "uppercase" }}>
                    {t("Shaping, Peaceful, Living")}
                  </p>
                  <p>{t("Full Engineering Services")} • {t("Founded in 1990")}</p>
                </div>
              </div>

              {/* Bottom Stats Grid */}
              <div className={styles.heroStatsGrid}>
                <div className={styles.heroStatItem}>
                  <span className={styles.statNumberText}>1200+</span>
                  <span className={styles.statLabelText}>{t("PROJECTS_STAT")}</span>
                </div>
                <div className={styles.heroStatItem}>
                  <span className={styles.statNumberText}>35</span>
                  <span className={styles.statLabelText}>{t("YEARS")}</span>
                </div>
                <div className={styles.heroStatItem}>
                  <span className={styles.statNumberText}>14</span>
                  <span className={styles.statLabelText}>{t("COUNTRIES")}</span>
                </div>
                <div className={styles.heroStatItem}>
                  <span className={styles.statNumberText}>250+</span>
                  <span className={styles.statLabelText}>{t("EXPERTS")}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Slide Text Content & Page Indicator */}
            <div className={styles.heroRight}>
              {/* Dynamic Project Details Overlay */}
              <div className={styles.slideTextContainer}>
                <span className={styles.slideProjectLabel}>
                  {heroSlides[heroIndex]?.subtitle}
                </span>
                <h2 className={styles.slideProjectTitle}>
                  {heroSlides[heroIndex]?.title}
                </h2>
                <p className={styles.slideProjectDesc}>
                  {heroSlides[heroIndex]?.description}
                </p>
                <Link href={heroSlides[heroIndex]?.link || "/"} className={styles.slideCta}>
                  {t("VIEW PROJECT")}
                  <span className={styles.slideCtaLine} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CEO & FOUNDER SECTION */}
        <section className={styles.ceoFounderSection}>
          <div className={styles.ceoFounderContainer}>
            <div className={styles.ceoFounderImageWrapper}>
              <Image 
                src="/assets/magnific_1lxtSqfr4r.png" 
                alt="Dr. Ashraf Abdel Mohsen" 
                width={500} 
                height={750}
                className={styles.ceoFounderImg}
                priority
              />
            </div>
            <div className={styles.ceoFounderContent}>
              <span className={styles.ceoFounderTag}>{t("FOUNDER & CEO")}</span>
              <h2 className={styles.ceoFounderName}>{t("Dr. Ashraf Abdel Mohsen")}</h2>
              <h3 className={styles.ceoFounderTitle}>
                {language === "ar" 
                  ? "أستاذ العمارة ورائد التنمية العمرانية المستدامة" 
                  : "Professor of Architecture & Pioneer of Sustainable Urban Development"}
              </h3>
              <p className={styles.ceoFounderBio}>
                {language === "ar"
                  ? "في عام 1990، أسس الأستاذ الدكتور أشرف عبد المحسن شركة مكعب (CUBE) برؤية تهدف إلى تعزيز التوسع الحضري المستدام والارتقاء بالتصميم المعماري. قاد المخطط الوطني الرؤيوي 'القاهرة 2050' لترسيخ الهوية الإقليمية لمصر في الساحة العالمية."
                  : "In 1990, Professor Dr. Ashraf Abdel Mohsen founded CUBE with a vision to champion sustainable urban expansion and architectural mastery. He pioneered the national 'Cairo 2050' visionary masterplan to elevate Egypt's regional identity on the global stage."}
              </p>
              <Link href="/about" className={styles.ceoFounderCta}>
                {t("READ FULL BIOGRAPHY")} <span className={styles.arrowIcon}>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ABOUT US SECTION */}
        <section className={styles.aboutSection}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutLeft}>
              <div className={styles.sectionHeaderLine}>
                <span className={styles.sectionTagLine}>{t("ABOUT US")}</span>
              </div>
              <h2 className={styles.aboutMainTitle}>
                {language === "ar" ? "تصميم مساحات تلهم الحياة." : <>Designing spaces <br />that inspire life.</>}
              </h2>
              <div className={styles.aboutBodyText}>
                <p>
                  {t("CUBE CONSULTANTS is a multidisciplinary architecture and design practice established in 1990.")}
                </p>
                <p>
                  {t("For over 35 years, we have delivered innovative solutions that connect people, places and ideas.")}
                </p>
              </div>
              <Link href="/contact" className={styles.aboutLearnMore}>
                {t("LEARN MORE")} <span className={styles.arrowIcon}>→</span>
              </Link>
            </div>
            
            <div className={styles.aboutRight}>
              <Image
                src="/assets/about_tree.png"
                alt="Minimalist skylight interior with tree"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={styles.aboutImage}
              />
            </div>
          </div>
        </section>

        {/* OUR SERVICES SECTION */}
        <section className={styles.servicesGridSection}>
          <div className={styles.servicesHeaderRow}>
            <div className={styles.sectionHeaderLine}>
              <span className={styles.sectionTagLine}>{t("OUR SERVICES")}</span>
            </div>
          </div>
          
          <div className={styles.servicesCardGrid}>
            {servicesList.map((svc) => (
              <Link href="/contact" key={svc.num} className={styles.serviceCardItem}>
                <div className={styles.serviceIconContainer}>
                  {svc.icon}
                </div>
                <h3 className={styles.serviceCardTitle}>{svc.title}</h3>
                <p className={styles.serviceCardDesc}>{svc.desc}</p>
                <span className={styles.serviceCardLink}>
                  <span className={styles.arrowIcon}>→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* SELECTED PROJECTS SECTION */}
        <section className={styles.selectedProjectsSection}>
          <div className={styles.projectsHeaderRow}>
            <div className={styles.sectionHeaderLine}>
              <span className={styles.sectionTagLine}>{t("SELECTED PROJECTS")}</span>
            </div>
            <Link href="/projects" className={styles.viewAllLink}>
              {t("VIEW ALL PROJECTS")} <span className={styles.arrowIcon}>→</span>
            </Link>
          </div>

          <div className={styles.projectsCardGrid}>
            {homeProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.projectCardItem}>
                <div className={styles.projectCardImageWrapper}>
                  <Image
                    src={project.featuredImage}
                    alt={t(project.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className={styles.projectCardImage}
                  />
                </div>
                <div className={styles.projectCardDetails}>
                  <h3 className={styles.projectCardTitle}>{t(project.title)}</h3>
                  <span className={styles.projectCardSector}>{t(project.sector)}</span>
                  <span className={styles.cardArrow}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* OPET STUDIO SECTION */}
        <section className={styles.opetSection}>
          <div className={styles.opetGrid}>
            <div className={styles.opetLeft}>
              <div className={styles.sectionHeaderLine}>
                <span className={styles.sectionTagLine}>{t("OPET STUDIO")}</span>
              </div>
              <h2 className={styles.opetMainTitle}>
                {language === "ar" ? "الذراع التقني لمجموعة كيو ب" : "CUBE'S DIGITAL & TECHNOLOGY ARM"}
              </h2>
              <div className={styles.opetBodyText}>
                <p>
                  {language === "ar"
                    ? "تعمل استوديوهات أوبيت (OPET) عند تقاطع التوجيه الإبداعي، والتكنولوجيا الغامرة، والأنظمة الرقمية. وهي تلبي تطلعات صناع القرار الذين يثمنون الوضوح، والتحكم، والجاهزية للمستقبل."
                    : "OPET Studios operates at the intersection of creative direction, immersive technology, and digital systems. The brand addresses decision-makers who value clarity, control, and future readiness."}
                </p>
                <p>
                  {language === "ar"
                    ? "تتموضع أوبيت كشريك استراتيجي - وليست استوديو إبداعي تقليدي أو مجرد مورد تقني."
                    : "OPET is positioned as a strategic partner — not a generic creative studio and not a purely technical vendor."}
                </p>
              </div>
              <a href="https://www.opetstudios.com" target="_blank" rel="noopener noreferrer" className={styles.opetLearnMore}>
                {t("VISIT OPET WEBSITE")} <span className={styles.arrowIcon}>→</span>
              </a>
            </div>
            
            <div className={styles.opetRight}>
              <a href="https://www.opetstudios.com" target="_blank" rel="noopener noreferrer" className={styles.opetLogoLink}>
                <div className={styles.opetLogoWrapper}>
                  <Image
                    src="/assets/opet_02-02-removebg-preview.png"
                    alt="OPET Studio Logo"
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className={styles.opetLogoImage}
                  />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* PARTNERS & CLIENTS SECTION */}
        <section className={styles.partnersHomeSection}>
          <div className={styles.partnersHeader}>
            <span className={styles.partnersTag}>{t("OUR NETWORK")}</span>
            <h2 className={styles.partnersTitle}>{t("CLIENTS & PARTNERS")}</h2>
          </div>
          <div className={styles.partnersTickerContainer}>
            <div className={styles.partnersTickerTrack}>
              {PARTNER_LOGOS.map((logo, idx) => (
                <div key={`logo-1-${idx}`} className={styles.tickerItem}>
                  <img src={logo} alt={`Partner logo ${idx}`} className={styles.partnerLogoIndividual} />
                </div>
              ))}
              {/* Duplicate track for infinite loop */}
              {PARTNER_LOGOS.map((logo, idx) => (
                <div key={`logo-2-${idx}`} className={styles.tickerItem}>
                  <img src={logo} alt={`Partner logo duplicate ${idx}`} className={styles.partnerLogoIndividual} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LATEST INSIGHTS SECTION */}
        <section className={styles.latestInsightsSection}>
          <div className={styles.insightsHeaderRow}>
            <div className={styles.sectionHeaderLine}>
              <span className={styles.sectionTagLine}>{t("LATEST INSIGHTS")}</span>
            </div>
            <Link href="/insights" className={styles.viewAllLink}>
              {t("VIEW ALL INSIGHTS")} <span className={styles.arrowIcon}>→</span>
            </Link>
          </div>

          <div className={styles.insightsCardGrid}>
            {homeInsights.map((insight) => (
              <Link key={insight.slug} href={`/insights/${insight.slug}`} className={styles.insightCardItem}>
                <div className={styles.insightImagePart}>
                  <Image
                    src={insight.image}
                    alt={t(insight.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className={styles.insightImage}
                  />
                </div>
                <div className={styles.insightTextPart}>
                  <span className={styles.insightDate}>{t(insight.date)}</span>
                  <h3 className={styles.insightTitle}>{t(insight.title)}</h3>
                  <span className={styles.insightArrow}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </ReactLenis>
  );
}
