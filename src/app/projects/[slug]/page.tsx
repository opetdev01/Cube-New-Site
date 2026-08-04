"use client";

import { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { projects } from "@/data/projects";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./slug.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetail({ params }: PageProps) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  const { language, t } = useLanguage();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!project) {
    notFound();
  }

  const nextSlide = () => {
    if (project.gallery && project.gallery.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % project.gallery.length);
    }
  };

  const prevSlide = () => {
    if (project.gallery && project.gallery.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
    }
  };

  const lightboxPrev = () => {
    if (lightboxIndex !== null && project.gallery) {
      setLightboxIndex((lightboxIndex - 1 + project.gallery.length) % project.gallery.length);
    }
  };

  const lightboxNext = () => {
    if (lightboxIndex !== null && project.gallery) {
      setLightboxIndex((lightboxIndex + 1) % project.gallery.length);
    }
  };

  const galleryRef = useRef<HTMLDivElement>(null);
  const bannerImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Parallax effect on banner image
    if (bannerImageRef.current) {
      gsap.to(bannerImageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: `.${styles.heroBanner}`,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Fade-in scroll animations for gallery images
    const gallery = galleryRef.current;
    if (gallery) {
      const images = gallery.querySelectorAll(`.${styles.galleryItem}`);
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    // Refresh ScrollTrigger when project loads to adjust trigger offsets
    ScrollTrigger.refresh();
  }, [project]);

  // Kemet Tower Assembly State
  const assemblySceneRef = useRef<HTMLDivElement>(null);
  const [assemblyProgress, setAssemblyProgress] = useState(0);
  const [hasAssembled, setHasAssembled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window === "undefined" || !assemblySceneRef.current || slug !== "kemet-business-tower") return;

    const pinTrigger = ScrollTrigger.create({
      trigger: assemblySceneRef.current,
      start: "top top",
      pin: `.${styles.assemblyPin}`,
      pinSpacing: true,
      onEnter: () => {
        if (!hasAssembled) {
          // Lock scroll
          if (lenis) lenis.stop();
          document.documentElement.style.overflow = "hidden";
          document.body.style.overflow = "hidden";

          // Auto animate Kemet assembly
          const animObj = { progress: 0 };
          gsap.to(animObj, {
            progress: 1,
            duration: 3.5,
            ease: "power2.out",
            onUpdate: () => {
              setAssemblyProgress(animObj.progress);
            },
            onComplete: () => {
              setAssemblyProgress(1);
              setHasAssembled(true);
              // Unlock scroll
              if (lenis) lenis.start();
              document.documentElement.style.overflow = "";
              document.body.style.overflow = "";
            }
          });
        }
      }
    });

    return () => {
      pinTrigger.kill();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [lenis, hasAssembled, slug]);

  // Keyboard navigation inside Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  // AI Reviewer Presentation State Machine
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewStep, setReviewStep] = useState(0);
  const [reviewMuted, setReviewMuted] = useState(false); // Unmuted by default for live speaking presentation

  const speakText = (text: string, langCode: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Stop current speech
      if (reviewMuted) return;

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Select Arabic or English voice
      utterance.lang = langCode === "ar" ? "ar-EG" : "en-US";
      
      // Futuristic robot-like voice profile settings
      utterance.pitch = 0.96;
      utterance.rate = 0.94;

      window.speechSynthesis.speak(utterance);
    }
  };

  const reviewSteps = [
    {
      video: "/assets/92f7fa6d91fd44619dd71dc790ea4165.webm",
      subEn: "Welcome to Zomra East Compound, New Cairo. Let's analyze the architectural blueprint and master planning.",
      subAr: "مرحباً بكم في كمبوند زمرة إيست بالقاهرة الجديدة. دعونا نحلل المخطط العام والكتل المعمارية للمشروع.",
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    {
      video: "/assets/92f7fa6d91fd44619dd71dc790ea4165.webm",
      subEn: "Scanning specifications. Zomra East spans 378 acres, prioritizing nature, tranquil green spaces, and private villa frontages.",
      subAr: "جارٍ فحص المواصفات. يمتد مشروع زمرة إيست على مساحة ٣٧٨ فداناً، مع إعطاء الأولوية للبيئة الطبيعية والمساحات الخضراء الهادئة.",
      action: () => {
        const section = document.querySelector(`.${styles.pageBody}`);
        if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    {
      video: "/assets/92f7fa6d91fd44619dd71dc790ea4165.webm",
      subEn: "Examining architectural typologies. Standalone villas, townhouses, and twin houses are designed with contemporary European aesthetics.",
      subAr: "فحص الأنماط المعمارية. تم تصميم الفيلات المستقلة والتاون هاوس والتوين هاوس بجماليات أوروبية معاصرة.",
      action: () => {
        const gallery = document.querySelector(`.${styles.gallerySection}`);
        if (gallery) {
          gallery.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    },
    {
      video: "/assets/92f7fa6d91fd44619dd71dc790ea4165.webm",
      subEn: "Review complete. CUBE Consultants ensured structural compliance, quality concrete supervision, and landscape coordination.",
      subAr: "تمت المراجعة بنجاح. أدارت كيو ب للاستشارات الإشراف الفني لضمان مطابقة الهياكل الخرسانية والموقع العام.",
      action: () => {
        const sidebar = document.querySelector(`.${styles.sidebar}`);
        if (sidebar) sidebar.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  ];

  useEffect(() => {
    if (isReviewOpen && reviewSteps[reviewStep]) {
      reviewSteps[reviewStep].action();

      // Trigger Web Speech synthesis voice readout
      const txt = language === "ar" ? reviewSteps[reviewStep].subAr : reviewSteps[reviewStep].subEn;
      speakText(txt, language);

      // Automatically advance image slides when looking at architectural gallery typology (step index 2)
      if (reviewStep === 2 && project.gallery && project.gallery.length > 0) {
        let count = 0;
        const interval = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % project.gallery.length);
          count++;
          if (count >= 4) clearInterval(interval);
        }, 1500);
        return () => clearInterval(interval);
      }
    } else {
      // Cancel speech when closed
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
  }, [reviewStep, isReviewOpen, reviewMuted, language]);

  const handleNextReviewStep = () => {
    if (reviewStep < reviewSteps.length - 1) {
      setReviewStep((prev) => prev + 1);
    } else {
      setIsReviewOpen(false);
      setReviewStep(0);
    }
  };

  const handlePrevReviewStep = () => {
    if (reviewStep > 0) {
      setReviewStep((prev) => prev - 1);
    }
  };

  const handleCloseReview = () => {
    setIsReviewOpen(false);
    setReviewStep(0);
  };

  // Translate project fields if Arabic
  const translatedTitle = t(project.title);
  const translatedSector = t(project.sector);
  const translatedLocation = t(project.location);
  const translatedClient = language === "ar" ? (project.client.includes("Ministry") ? "وزارة الإسكان" : project.client) : project.client;
  const translatedStatus = t(project.status);
  
  const translatedDescription = project.technicalDescription 
    ? t(project.technicalDescription)
    : (language === "ar" ? 
       `تأسس هذا المشروع الإنشائي المتميز لتقديم تجربة معمارية فريدة. يهدف التصميم إلى توفير أقصى درجات الراحة والمرونة، مع تحقيق معايير الاستدامة المتقدمة. تم التنسيق الكامل بين الهندسة والبيئة المحلية لضمان الجودة والجمالية للموقع.` 
       : project.description);

  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.08 }}>
      <main className={styles.detailPage}>
        {/* Banner header with parallax image */}
        <section className={styles.heroBanner}>
          <Link href="/projects" className={styles.backLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {t("Back to Portfolio")}
          </Link>
          <Image
            ref={bannerImageRef}
            src={project.featuredImage}
            alt={translatedTitle}
            fill
            priority
            className={styles.bannerImage}
          />
          <div className={styles.bannerOverlay} />
          <div className={styles.bannerContent}>
            <div className={styles.bannerSector}>{translatedSector}</div>
            <h1 className={styles.bannerTitle}>{translatedTitle}</h1>
          </div>
        </section>

        {/* Page body content and details */}
        <section className={styles.pageBody}>
          {/* Main detailed text and gallery */}
          <div className={styles.mainContent}>
            <div className={styles.descriptionSection}>
              {project.technicalSummary && (
                <div className={styles.technicalScopeCallout}>
                  <strong>{t("Project Management Scope")}:</strong>
                  <p>{t(project.technicalSummary)}</p>
                </div>
              )}
              {translatedDescription.split("\n\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <div className={styles.gallerySection}>
                <div className={styles.galleryHeader}>
                  <h2 className={styles.galleryTitle}>{t("Visual Presentation")}</h2>
                  <div className={styles.slideCounter}>
                    <span>{String(currentSlide + 1).padStart(2, "0")}</span>
                    <span className={styles.counterDivider}>/</span>
                    <span>{String(project.gallery.length).padStart(2, "0")}</span>
                  </div>
                </div>
                
                <div className={styles.sliderWrapper}>
                  <div className={styles.sliderViewport}>
                    <div 
                       className={styles.sliderTrack}
                       style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {project.gallery.map((imgUrl, idx) => (
                        <div 
                          key={idx} 
                          className={styles.slide}
                          onClick={() => setLightboxIndex(idx)}
                          style={{ cursor: "zoom-in" }}
                          title="Click to zoom image"
                        >
                          <Image
                            src={imgUrl}
                            alt={`${translatedTitle} - Visual ${idx + 1}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 800px"
                            className={styles.sliderImage}
                            priority={idx === 0}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <button 
                    onClick={prevSlide} 
                    className={`${styles.navArrow} ${styles.prevArrow}`}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button 
                    onClick={nextSlide} 
                    className={`${styles.navArrow} ${styles.nextArrow}`}
                    aria-label="Next image"
                  >
                    ›
                  </button>

                  {/* Dot Indicators */}
                  <div className={styles.sliderIndicators}>
                    {project.gallery.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`${styles.indicatorDot} ${idx === currentSlide ? styles.activeDot : ""}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Meta details sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.stickyBox}>
              {slug === "zomra-east" && (
                <button
                  className={styles.aiReviewTriggerBtn}
                  onClick={() => {
                    setIsReviewOpen(true);
                    setReviewStep(0);
                  }}
                >
                  <span className={styles.aiPulseIcon}>🤖</span>
                  <span>{language === "ar" ? "بدء المراجعة الذكية للروبوت" : "START AI ROBOT REVIEW"}</span>
                </button>
              )}
              <h3 className={styles.sidebarTitle}>{t("Project Details")}</h3>
              <div className={styles.metaList}>
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>{t("Client")}</div>
                  <div className={styles.metaValue}>{translatedClient}</div>
                </div>
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>{t("Location")}</div>
                  <div className={styles.metaValue}>{translatedLocation}</div>
                </div>
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>{t("Year")}</div>
                  <div className={styles.metaValue}>{project.year}</div>
                </div>
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>{t("Sector")}</div>
                  <div className={styles.metaValue}>{translatedSector}</div>
                </div>
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>{t("Status")}</div>
                  <div className={styles.metaValue}>{translatedStatus}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: KEMET TOWER SCROLL ASSEMBLY */}
        {slug === "kemet-business-tower" && (
          <section className={styles.assemblyScene} ref={assemblySceneRef} aria-label="Scroll to assemble Kemet Tower">
            <div className={styles.assemblyPin}>
              <div className={styles.assemblyFrame}>
                {Array.from({ length: 12 }).map((_, i) => {
                  const order = 12 - 1 - i;
                  const buildP = assemblyProgress;
                  const shown = buildP * 12;
                  const localProgress = Math.min(Math.max(shown - order, 0), 1);
                  const eased = 1 - Math.pow(1 - localProgress, 3);

                  const sliceTop = (i / 12) * 100;
                  const sliceBottom = ((12 - 1 - i) / 12) * 100;

                  const style: React.CSSProperties = {
                    opacity: eased,
                    transform: `translateY(${(1 - eased) * 40}px) scale(${0.99 + 0.01 * eased})`,
                    filter: eased < 1 ? `blur(${(1 - eased) * 5}px)` : "none",
                    clipPath: `inset(${sliceTop}% 0% ${sliceBottom}% 0%)`,
                    zIndex: eased < 1 ? 2 : 1
                  };

                  const flash = (shown - order > 0 && shown - order < 1) ? Math.sin((shown - order) * Math.PI) : 0;
                  const shadowStyle = flash > 0.02 ? {
                    boxShadow: `0 2px 22px -2px rgba(227, 6, 19, ${0.4 * flash})`
                  } : {};

                  return (
                    <div key={i} className={styles.assemblySec} style={{ ...style, ...shadowStyle }}>
                      <img
                        src="/assets/projects/kemet-business-tower/Kemet-Tower_1-scaled.jpg"
                        alt={i === 0 ? "Kemet Tower roofline" : i === 11 ? "Kemet Tower entrance" : ""}
                        className={styles.assemblySliceImg}
                      />
                    </div>
                  );
                })}
                <div className={styles.assemblyBaseline} />
                <div className={styles.assemblyGlowpad} />
              </div>

              {/* Overlaid HUD Metrics */}
              <div className={styles.assemblyHud}>
                {/* Left Sidebar Info */}
                <div className={styles.assemblySidebarLeft}>
                  <span className={styles.sidebarVerticalText}>CUBE CONSULTANTS // ARCHITECTURAL MASSING</span>
                  <span className={styles.sidebarSubText}>COORD: 30°01&apos;39&quot;N 31°45&apos;00&quot;E</span>
                </div>

                {/* Right Sidebar Info */}
                <div className={styles.assemblySidebarRight}>
                  <span className={styles.sidebarVerticalText}>KEMET TOWER // HEIGHT 210M // G+40 FLOORS</span>
                  <span className={styles.sidebarSubText}>SCALE: 1:500 | MODEL ASSY</span>
                </div>

                <div className={styles.assemblyTop}>
                  <div className={styles.assemblyBrand}>
                    <svg viewBox="0 0 100 100" fill="none" stroke="#e30613" strokeWidth="5" strokeLinecap="round">
                      <path d="M18 78 V30 L50 58 L82 30 V78" />
                      <line x1="50" y1="58" x2="50" y2="90" />
                    </svg>
                    <span className={styles.assemblyNm}>
                      KEMET<small>{t("New Capital")}</small>
                    </span>
                  </div>
                  <div className={styles.assemblyMeter}>
                    <div className={styles.assemblyL}>{t("Assembling")}</div>
                    <b>
                      <span>{Math.max(0, Math.min(12, Math.floor(assemblyProgress * 12 + 1e-4)))}</span> / <span>12</span>
                    </b>
                    <div className={styles.assemblyPct}>{Math.round(assemblyProgress * 100)}%</div>
                  </div>
                </div>

                <div className={styles.assemblyTitle} style={{ opacity: Math.min(Math.max((assemblyProgress - 0.7) / 0.3, 0), 1), transform: `translateY(${(1 - Math.min(Math.max((assemblyProgress - 0.7) / 0.3, 0), 1)) * 16}px)` }}>
                  <div className={styles.assemblyKick}>
                    <i />
                    <span>{t("New Administrative Capital · Egypt")}</span>
                    <i />
                  </div>
                  <h1>
                    KEMET <span className={styles.assemblyRedText}>TOWER</span>
                  </h1>
                </div>
              </div>
            </div>
          </section>
        )}
      {lightboxIndex !== null && project.gallery && project.gallery.length > 0 && (
        <div className={styles.lightboxOverlay} onClick={() => setLightboxIndex(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.lightboxClose} 
              onClick={() => setLightboxIndex(null)}
              aria-label="Close image"
            >
              &times;
            </button>

            {/* Lightbox Navigation Buttons */}
            <button 
              className={`${styles.lightboxArrow} ${styles.lightboxPrevArrow}`} 
              onClick={lightboxPrev}
              aria-label="Previous image"
            >
              ‹
            </button>

            <div className={styles.lightboxImageWrapper}>
              <Image
                src={project.gallery[lightboxIndex]}
                alt="Visual Presentation Detail"
                fill
                className={styles.lightboxImage}
                unoptimized
              />
            </div>

            <button 
              className={`${styles.lightboxArrow} ${styles.lightboxNextArrow}`} 
              onClick={lightboxNext}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* Transparent Hologram AI Robot Reviewer (No backdrop, stands directly on the page content) */}
      {isReviewOpen && (
        <div className={styles.hologramRobotContainer}>
          {/* Subtitle Card situated above the robot */}
          <div className={styles.hologramSubtitleCard}>
            <button className={styles.hologramCloseBtn} style={{ position: "absolute", top: "12px", right: "12px" }} onClick={handleCloseReview} aria-label="Close review">
              &times;
            </button>

            <div className={styles.hologramSubtitleTitle}>
              <span>🤖</span>
              <span>{language === "ar" ? "مراجعة كيو ب الذكية للمشروع" : "CUBE AI PROJECT REVIEW"}</span>
              <span>·</span>
              <span>{language === "ar" ? `${reviewStep + 1} / ${reviewSteps.length}` : `${reviewStep + 1} / ${reviewSteps.length}`}</span>
            </div>

            <div className={styles.hologramSubtitleText}>
              {language === "ar" ? reviewSteps[reviewStep].subAr : reviewSteps[reviewStep].subEn}
            </div>

            <div className={styles.hologramActions}>
              <div className={styles.hologramActionsLeft}>
                <button className={styles.hologramBtn} onClick={() => setReviewMuted(!reviewMuted)}>
                  {reviewMuted ? (language === "ar" ? "🔊 تشغيل" : "🔊 UNMUTE") : (language === "ar" ? "🔇 كتم" : "🔇 MUTE")}
                </button>

                {reviewStep > 0 && (
                  <button className={styles.hologramBtn} onClick={handlePrevReviewStep}>
                    {language === "ar" ? "السابق" : "PREV"}
                  </button>
                )}
              </div>

              <button className={styles.hologramPrimaryBtn} onClick={handleNextReviewStep}>
                {reviewStep === reviewSteps.length - 1 ? (language === "ar" ? "إنهاء" : "FINISH") : (language === "ar" ? "التالي ➔" : "NEXT ➔")}
              </button>
            </div>

            {/* Progress Dots */}
            <div className={styles.hologramProgressDots}>
              {reviewSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={`${styles.hologramDot} ${idx === reviewStep ? styles.hologramDotActive : ""}`}
                />
              ))}
            </div>
          </div>

          {/* Transparent Standing Robot Video playing dynamically */}
          <video
            key={reviewSteps[reviewStep].video}
            src={reviewSteps[reviewStep].video}
            autoPlay
            loop
            muted
            playsInline
            className={styles.hologramRobotVideo}
          />
        </div>
      )}
      </main>
    </ReactLenis>
  );
}
