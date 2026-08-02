"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./CubeEquation.module.css";

export default function CubeEquation() {
  const { language, t } = useLanguage();
  // Default is empty so user must click all 3 pillars from the beginning
  const [activeStreams, setActiveStreams] = useState<string[]>([]);
  const [isMasterSynthesized, setIsMasterSynthesized] = useState<boolean>(false);

  const toggleStream = (streamId: string) => {
    if (activeStreams.includes(streamId)) {
      setActiveStreams(activeStreams.filter((id) => id !== streamId));
      setIsMasterSynthesized(false);
    } else {
      const nextStreams = [...activeStreams, streamId];
      setActiveStreams(nextStreams);
      if (nextStreams.length === 3) {
        setIsMasterSynthesized(true);
      }
    }
  };

  const isSpirit = activeStreams.includes("spirit");
  const isEarth = activeStreams.includes("earth");
  const isScience = activeStreams.includes("science");
  const isFullyCharged = activeStreams.length === 3;

  const handleCoreClick = () => {
    if (!isFullyCharged) {
      // Charge all 3 pillars automatically if core is clicked before charging
      setActiveStreams(["spirit", "earth", "science"]);
      setIsMasterSynthesized(true);
    } else {
      setIsMasterSynthesized(!isMasterSynthesized);
    }
  };

  const resetStreams = () => {
    setActiveStreams([]);
    setIsMasterSynthesized(false);
  };

  // Instruction Badge Text
  const getBadgeText = () => {
    if (isFullyCharged && isMasterSynthesized)
      return language === "ar"
        ? "تم انصهار معادلة كيو ب بالكامل! انقر على مكعب كيو ب المتوهج"
        : "REACTOR FULLY CHARGED! CLICK THE GLOWING RED CUBE CORE";
    if (isFullyCharged)
      return language === "ar"
        ? "المفاعل مشحون بالكامل (3/3)! انقر على شعار كيو ب المتوهج"
        : "CORE READY (3/3 CHARGED)! CLICK THE GLOWING RED CUBE LOGO";
    if (activeStreams.length === 2)
      return language === "ar"
        ? "تم شحن ركنين (2/3)! انقر على الركن الأخير لشحن المكعب"
        : "2 OF 3 PILLARS CHARGED! CLICK THE LAST PILLAR TO UNLOCK CUBE CORE";
    if (activeStreams.length === 1)
      return language === "ar"
        ? "تم شحن ركن واحد (1/3)! انقر على باقي الأركان الثلاثة"
        : "1 OF 3 PILLARS CHARGED! CLICK REMAINING PILLARS";
    return language === "ar"
      ? "انقر على الأركان الثلاثة (الروح، الأرض، العلوم) لشحن مفاعل المكعب!"
      : "CLICK ALL 3 PILLARS (SPIRIT, EARTH, SCIENCE) TO CHARGE THE CUBE CORE!";
  };

  // Live Synthesis Output Text
  const getSynthesisTitle = () => {
    if (isFullyCharged && isMasterSynthesized)
      return "THE CUBE EQUATION: MASTER ARCHITECTURAL REACTION";
    if (isSpirit && isScience) return "HEALING INTELLIGENCE CORE (SPIRIT + SCIENCE)";
    if (isEarth && isScience) return "PARAMETRIC SUSTAINABILITY REACTION (EARTH + SCIENCE)";
    if (isSpirit && isEarth) return "ECOLOGICAL SANCTUARY HARMONY (SPIRIT + EARTH)";
    if (isSpirit) return "SPIRIT CARE ENERGY STREAM (1/3)";
    if (isEarth) return "EARTH CARE ECOLOGY STREAM (1/3)";
    if (isScience) return "SCIENCE & TECH PARAMETRIC STREAM (1/3)";
    return "STANDBY STATE: REACTION CORE UNCHARGED";
  };

  const getSynthesisDesc = () => {
    if (isFullyCharged && isMasterSynthesized)
      return "Complete architectural synergy unlocked: The glowing CUBE Core refracts human emotional dignity, zero-carbon environmental resilience, and AI computational intelligence into a single, future-ready architectural environment.";
    if (isSpirit && isScience)
      return "Merging human emotional experience with AI generative spatial algorithms to construct light-filled, intuitive environments.";
    if (isEarth && isScience)
      return "Powering AI energy simulations, rainwater filtration loops, and automated building shading for carbon-negative performance.";
    if (isSpirit && isEarth)
      return "Connecting human soul experience with authentic local materials and regional microclimate harmony.";
    if (isSpirit)
      return "Pioneering emotional dignity, peace, and proportion across all spatial layouts.";
    if (isEarth)
      return "Maximizing natural resource conservation, passive thermal cooling, and local material usage.";
    if (isScience)
      return "Executing advanced AI spatial optimization, automated quantity takeoffs, and structural FEM checks.";
    return "Click the 3 pillars (Spirit Care, Earth Care, Science & Tech) to ignite the laser streams and transform the core into the glowing red CUBE logo!";
  };

  return (
    <section className={styles.reactorContainer}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.label}>{t("Our Philosophy")}</span>
        <h2 className={styles.title}>{t("THE CUBE EQUATION ENERGY REACTOR")}</h2>
        <div
          className={`${styles.instructionBadge} ${
            isFullyCharged ? styles.instructionBadgeUnlocked : ""
          }`}
        >
          {getBadgeText()}
        </div>
      </div>

      <div className={styles.reactorGrid}>
        {/* Left Side: 3 Energy Stream Cards */}
        <div className={styles.streamsList}>
          {/* Stream 1: Spirit Care */}
          <div
            className={`${styles.streamCard} ${styles.streamSpirit} ${
              isSpirit ? styles.cardActive : ""
            }`}
            onClick={() => toggleStream("spirit")}
          >
            <div className={styles.cardHeader}>
              <span className={styles.streamNum}>01.</span>
              <h3 className={styles.streamTitle}>{t("1. SPIRIT CARE")}</h3>
            </div>
            <p className={styles.streamDesc}>
              {t("Design that nurtures the human soul by prioritizing emotional experience, peace, balance, and meaning.")}
            </p>
            <span className={styles.outcomeBadge}>
              {t("OUTCOME:")} {t("SPACES THAT HEAL, INSPIRE, AND CONNECT")}
            </span>
          </div>

          {/* Stream 2: Earth Care */}
          <div
            className={`${styles.streamCard} ${styles.streamEarth} ${
              isEarth ? styles.cardActive : ""
            }`}
            onClick={() => toggleStream("earth")}
          >
            <div className={styles.cardHeader}>
              <span className={styles.streamNum}>02.</span>
              <h3 className={styles.streamTitle}>{t("2. EARTH CARE")}</h3>
            </div>
            <p className={styles.streamDesc}>
              {t("Environmental responsibility as a core principle. True sustainability that coexists with nature rather than consuming it.")}
            </p>
            <span className={styles.outcomeBadge}>
              {t("OUTCOME:")} {t("PROJECTS THAT COEXIST WITH NATURE RATHER THAN CONSUME IT")}
            </span>
          </div>

          {/* Stream 3: Science & Technology */}
          <div
            className={`${styles.streamCard} ${styles.streamScience} ${
              isScience ? styles.cardActive : ""
            }`}
            onClick={() => toggleStream("science")}
          >
            <div className={styles.cardHeader}>
              <span className={styles.streamNum}>03.</span>
              <h3 className={styles.streamTitle}>{t("3. SCIENCE & TECHNOLOGY")}</h3>
            </div>
            <p className={styles.streamDesc}>
              {t("Integrating AI and smart systems to enhance performance, efficiency, and user experience to drive continuous innovation.")}
            </p>
            <span className={styles.outcomeBadge}>
              {t("OUTCOME:")} {t("INTELLIGENT, FUTURE-READY ENVIRONMENTS")}
            </span>
          </div>
        </div>

        {/* Right Side: Interactive SVG Holographic Energy Reactor */}
        <div className={styles.reactorCanvasArea}>
          <svg viewBox="100 50 400 380" className={styles.reactorSvg}>
            <defs>
              <linearGradient id="spiritGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff2a3b" />
                <stop offset="100%" stopColor="#e30613" />
              </linearGradient>
              <linearGradient id="earthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2eac66" />
                <stop offset="100%" stopColor="#1b7a43" />
              </linearGradient>
              <linearGradient id="scienceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00c2ff" />
                <stop offset="100%" stopColor="#0088cc" />
              </linearGradient>

              <radialGradient id="coreGlass" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#f4f5f8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#e30613" stopOpacity="0.4" />
              </radialGradient>
            </defs>

            {/* BASE CONNECTOR LINES */}
            <line x1="180" y1="120" x2="300" y2="240" stroke="rgba(0,0,0,0.12)" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="420" y1="120" x2="300" y2="240" stroke="rgba(0,0,0,0.12)" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="300" y1="360" x2="300" y2="240" stroke="rgba(0,0,0,0.12)" strokeWidth="2" strokeDasharray="4 4" />

            {/* LASER ENERGY BEAM 1: SPIRIT CARE (CRIMSON) */}
            {isSpirit && (
              <g key="laser-spirit">
                <line x1="180" y1="120" x2="300" y2="240" className={styles.beamGlowCrimson} />
                <line x1="180" y1="120" x2="300" y2="240" className={styles.beamCore} />
              </g>
            )}

            {/* LASER ENERGY BEAM 2: EARTH CARE (EMERALD) */}
            {isEarth && (
              <g key="laser-earth">
                <line x1="300" y1="360" x2="300" y2="240" className={styles.beamGlowEmerald} />
                <line x1="300" y1="360" x2="300" y2="240" className={styles.beamCore} />
              </g>
            )}

            {/* LASER ENERGY BEAM 3: SCIENCE & TECH (CYAN) */}
            {isScience && (
              <g key="laser-science">
                <line x1="420" y1="120" x2="300" y2="240" className={styles.beamGlowCyan} />
                <line x1="420" y1="120" x2="300" y2="240" className={styles.beamCore} />
              </g>
            )}

            {/* HOLOGRAPHIC BLUEPRINT OVERLAYS */}
            {isSpirit && (
              <g key="holo-spirit" opacity="0.6">
                <circle cx="300" cy="240" r="75" fill="none" stroke="#e30613" strokeWidth="1" strokeDasharray="6 4" />
                <path d="M 230 240 A 70 70 0 0 1 370 240" fill="none" stroke="#ff3b30" strokeWidth="2" />
              </g>
            )}
            {isEarth && (
              <g key="holo-earth" opacity="0.5">
                <ellipse cx="300" cy="240" rx="90" ry="45" fill="none" stroke="#2eac66" strokeWidth="1.5" strokeDasharray="8 4" />
              </g>
            )}
            {isScience && (
              <g key="holo-science" opacity="0.6">
                <rect x="235" y="175" width="130" height="130" fill="none" stroke="#00c2ff" strokeWidth="1" strokeDasharray="10 5" rx="10" />
                <line x1="245" y1="190" x2="355" y2="190" stroke="#00c2ff" strokeWidth="1.5" />
                <line x1="245" y1="210" x2="355" y2="210" stroke="#00c2ff" strokeWidth="1.5" />
              </g>
            )}

            {/* EXPANDING UNLOCKED PULSE RINGS WHEN ALL 3 PILLARS ACTIVE */}
            {isFullyCharged && (
              <g key="unlocked-pulse-rings">
                <circle cx="300" cy="240" r="65" fill="none" stroke="#e30613" strokeWidth="2" className={styles.unlockedPulse} />
              </g>
            )}

            {/* CENTRAL CORE NODE / GLOWING CUBE LOGO */}
            <g
              className={`${styles.coreGroup} ${
                isFullyCharged ? styles.glowingRedCubeBox : ""
              }`}
              onClick={handleCoreClick}
            >
              {/* Outer Hexagon / Circle Core Container */}
              <circle
                cx="300"
                cy="240"
                r={isFullyCharged ? "56" : "50"}
                fill={isFullyCharged ? "#ffffff" : "url(#coreGlass)"}
                stroke={isFullyCharged ? "#e30613" : "rgba(0,0,0,0.2)"}
                strokeWidth={isFullyCharged ? "4" : "2"}
              />

              <polygon
                points="300,198 338,220 338,260 300,282 262,260 262,220"
                fill="none"
                stroke={isFullyCharged ? "#e30613" : "rgba(0,0,0,0.15)"}
                strokeWidth={isFullyCharged ? "2.5" : "1"}
              />

              {/* WHEN FULLY CHARGED: RENDER THE OFFICIAL CUBE LOGO */}
              {isFullyCharged ? (
                <g key="cube-logo-transformed">
                  <image
                    href="/logo-v4.png"
                    x="268"
                    y="208"
                    width="64"
                    height="64"
                    preserveAspectRatio="xMidYMid meet"
                  />
                </g>
              ) : (
                /* STANDBY CORE TEXT */
                <g key="standby-core-text">
                  <circle cx="300" cy="240" r="8" fill="#e30613" />
                  <text x="300" y="244" textAnchor="middle" fontWeight="900" fontSize="10" fill="#ffffff">
                    CUBE CORE
                  </text>
                </g>
              )}
            </g>

            {/* ENERGY STREAM NODE 1: SPIRIT CARE (CRIMSON) */}
            <g className={styles.nodeGroup} onClick={() => toggleStream("spirit")} transform="translate(180, 120)">
              {isSpirit && <circle cx="0" cy="0" r="24" fill="rgba(227, 6, 19, 0.35)" className={styles.pulseRing} />}
              <circle cx="0" cy="0" r="16" fill="url(#spiritGrad)" stroke="#ffffff" strokeWidth="2.5" />
              <text x="0" y="32" textAnchor="middle" fontWeight="900" fontSize="12" fill="#111111">
                SPIRIT
              </text>
            </g>

            {/* ENERGY STREAM NODE 2: SCIENCE & TECH (CYAN) */}
            <g className={styles.nodeGroup} onClick={() => toggleStream("science")} transform="translate(420, 120)">
              {isScience && <circle cx="0" cy="0" r="24" fill="rgba(0, 194, 255, 0.35)" className={styles.pulseRing} />}
              <circle cx="0" cy="0" r="16" fill="url(#scienceGrad)" stroke="#ffffff" strokeWidth="2.5" />
              <text x="0" y="32" textAnchor="middle" fontWeight="900" fontSize="12" fill="#111111">
                SCIENCE
              </text>
            </g>

            {/* ENERGY STREAM NODE 3: EARTH CARE (EMERALD) */}
            <g className={styles.nodeGroup} onClick={() => toggleStream("earth")} transform="translate(300, 360)">
              {isEarth && <circle cx="0" cy="0" r="24" fill="rgba(46, 172, 102, 0.35)" className={styles.pulseRing} />}
              <circle cx="0" cy="0" r="16" fill="url(#earthGrad)" stroke="#ffffff" strokeWidth="2.5" />
              <text x="0" y="-24" textAnchor="middle" fontWeight="900" fontSize="12" fill="#111111">
                EARTH
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Holographic Synthesizer Terminal Box */}
      <div className={styles.terminalBox}>
        <div className={styles.terminalHeader}>
          <div className={styles.synthTag}>
            <span className={styles.synthDot} />
            <span>
              {isFullyCharged
                ? language === "ar"
                  ? "مفاعل كيو ب مشحون بالكامل"
                  : "CUBE CORE FULLY CHARGED"
                : language === "ar"
                ? "حالة الانتظار: اشحن الأركان الثلاثة"
                : `CHARGING PROGRESS (${activeStreams.length}/3 PILLARS)`}
            </span>
          </div>
          {activeStreams.length > 0 && (
            <button className={styles.resetBtn} onClick={resetStreams}>
              {language === "ar" ? "إعادة ضبط" : "Reset Core"}
            </button>
          )}
        </div>
        <div className={styles.synthTitle}>{getSynthesisTitle()}</div>
        <p className={styles.synthDesc}>{t(getSynthesisDesc())}</p>
      </div>
    </section>
  );
}
