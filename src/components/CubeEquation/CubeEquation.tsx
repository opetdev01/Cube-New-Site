"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./CubeEquation.module.css";

export default function CubeEquation() {
  const { language, t } = useLanguage();
  const [activeStreams, setActiveStreams] = useState<string[]>(["spirit", "earth", "science"]);

  const toggleStream = (streamId: string) => {
    if (activeStreams.includes(streamId)) {
      if (activeStreams.length > 1) {
        setActiveStreams(activeStreams.filter((id) => id !== streamId));
      }
    } else {
      setActiveStreams([...activeStreams, streamId]);
    }
  };

  const isSpirit = activeStreams.includes("spirit");
  const isEarth = activeStreams.includes("earth");
  const isScience = activeStreams.includes("science");

  // Live Energy Synthesis Titles & Descriptions
  const getSynthesisTitle = () => {
    if (isSpirit && isEarth && isScience)
      return "HOLOGRAPHIC ARCHITECTURAL EQUILIBRIUM (COMPLETE REALTOR CORE)";
    if (isSpirit && isScience) return "HEALING INTELLIGENCE CORE (SPIRIT + SCIENCE)";
    if (isEarth && isScience) return "PARAMETRIC SUSTAINABILITY REACTION (EARTH + SCIENCE)";
    if (isSpirit && isEarth) return "ECOLOGICAL SANCTUARY HARMONY (SPIRIT + EARTH)";
    if (isSpirit) return "SPIRIT CARE ENERGY STREAM";
    if (isEarth) return "EARTH CARE ECOLOGY STREAM";
    return "SCIENCE & TECH PARAMETRIC STREAM";
  };

  const getSynthesisDesc = () => {
    if (isSpirit && isEarth && isScience)
      return "All 3 energy streams active: Refracting human emotional wellbeing, zero-carbon environmental resilience, and AI computational intelligence into a unified, future-ready architectural environment.";
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
    return "Executing advanced AI spatial optimization, automated quantity takeoffs, and structural FEM checks.";
  };

  return (
    <section className={styles.reactorContainer}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.label}>{t("Our Philosophy")}</span>
        <h2 className={styles.title}>{t("THE CUBE EQUATION ENERGY REACTOR")}</h2>
        <div className={styles.instructionBadge}>
          {language === "ar"
            ? "انقر على أي شعاع طاقة لشحن المفاعل وتوليد التحليل المعماري"
            : "Click any energy stream card or node to charge reactor & project blueprints"}
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
                <stop offset="100%" stopColor="#e30613" stopOpacity="0.3" />
              </radialGradient>
            </defs>

            {/* BASE STREAM CONNECTOR LINES */}
            <line x1="180" y1="120" x2="300" y2="240" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
            <line x1="420" y1="120" x2="300" y2="240" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
            <line x1="300" y1="360" x2="300" y2="240" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />

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
            {/* Spirit Daylight Arc Rays */}
            {isSpirit && (
              <g key="holo-spirit" opacity="0.6">
                <circle cx="300" cy="240" r="75" fill="none" stroke="#e30613" strokeWidth="1" strokeDasharray="6 4" />
                <path d="M 230 240 A 70 70 0 0 1 370 240" fill="none" stroke="#ff3b30" strokeWidth="2" />
              </g>
            )}

            {/* Earth Thermal Mesh Lines */}
            {isEarth && (
              <g key="holo-earth" opacity="0.5">
                <ellipse cx="300" cy="240" rx="90" ry="45" fill="none" stroke="#2eac66" strokeWidth="1.5" strokeDasharray="8 4" />
              </g>
            )}

            {/* Science AI Louver Vectors */}
            {isScience && (
              <g key="holo-science" opacity="0.6">
                <rect x="235" y="175" width="130" height="130" fill="none" stroke="#00c2ff" strokeWidth="1" strokeDasharray="10 5" rx="10" />
                <line x1="245" y1="190" x2="355" y2="190" stroke="#00c2ff" strokeWidth="1.5" />
                <line x1="245" y1="210" x2="355" y2="210" stroke="#00c2ff" strokeWidth="1.5" />
                <line x1="245" y1="270" x2="355" y2="270" stroke="#00c2ff" strokeWidth="1.5" />
              </g>
            )}

            {/* CENTRAL HOLOGRAPHIC GLASS PRISM CORE */}
            <g className={styles.coreGroup} onClick={() => setActiveStreams(["spirit", "earth", "science"])}>
              <circle cx="300" cy="240" r="52" fill="url(#coreGlass)" stroke="#ffffff" strokeWidth="3" className={styles.corePrism} />
              <polygon points="300,202 335,222 335,258 300,278 265,258 265,222" fill="none" stroke="#e30613" strokeWidth="2" className={styles.corePulse} />
              <circle cx="300" cy="240" r="10" fill="#ffffff" filter="drop-shadow(0 0 8px #e30613)" />

              <text x="300" y="244" textAnchor="middle" fontWeight="900" fontSize="10" fill="#111111">
                CUBE CORE
              </text>
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
            <span>{language === "ar" ? "شحن مفاعل الطاقة التفاعلي" : "ACTIVE REACTION CORE OUTPUT"}</span>
          </div>
        </div>
        <div className={styles.synthTitle}>{getSynthesisTitle()}</div>
        <p className={styles.synthDesc}>{t(getSynthesisDesc())}</p>
      </div>
    </section>
  );
}
