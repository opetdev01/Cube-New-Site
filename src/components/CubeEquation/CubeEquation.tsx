"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./CubeEquation.module.css";

export default function CubeEquation() {
  const { language, t } = useLanguage();
  const [activeCards, setActiveCards] = useState<number[]>([1, 2, 3]);

  const toggleCard = (cardNumber: number) => {
    if (activeCards.includes(cardNumber)) {
      if (activeCards.length > 1) {
        setActiveCards(activeCards.filter((c) => c !== cardNumber));
      }
    } else {
      setActiveCards([...activeCards, cardNumber]);
    }
  };

  const is1 = activeCards.includes(1);
  const is2 = activeCards.includes(2);
  const is3 = activeCards.includes(3);

  // Dynamic Equation Outcome Synthesis
  const getOutcomeTitle = () => {
    if (is1 && is2 && is3) return "THE CUBE EQUATION (COMPLETE SYNERGY)";
    if (is1 && is3) return "HEALING INTELLIGENCE (SPIRIT + SCIENCE)";
    if (is2 && is3) return "PARAMETRIC SUSTAINABILITY (EARTH + SCIENCE)";
    if (is1 && is2) return "ECOLOGICAL SANCTUARY (SPIRIT + EARTH)";
    if (is1) return "SPIRIT CARE FOCUS";
    if (is2) return "EARTH CARE FOCUS";
    if (is3) return "SCIENCE & TECH FOCUS";
    return "ARCHITECTURAL EQUATION";
  };

  const getOutcomeDesc = () => {
    if (is1 && is2 && is3)
      return "The ultimate architectural paradigm: merging emotional human soul experience with environmental sustainability and AI-driven parametric intelligence to create future-ready built environments.";
    if (is1 && is3)
      return "Combining spiritual human wellbeing with AI generative design algorithms to build intuitive, light-filled environments.";
    if (is2 && is3)
      return "Leveraging AI energy modeling and digital wind tunnels to achieve carbon-negative, self-sustaining masterplans.";
    if (is1 && is2)
      return "Grounding human emotional experience in contextually authentic, natural, and ecologically responsible materials.";
    if (is1)
      return "Prioritizing human peace, proportion, and emotional harmony across all spatial layouts.";
    if (is2)
      return "Maximizing natural resource preservation, passive cooling, and carbon reductions.";
    return "Pioneering AI spatial algorithms and automated structural optimization.";
  };

  return (
    <section className={styles.eqContainer}>
      {/* Header */}
      <div className={styles.eqHeader}>
        <span className={styles.cgLabel}>{t("Our Philosophy")}</span>
        <h2 className={styles.title}>{t("The Cube Equation")}</h2>
      </div>

      {/* 3 Cards */}
      <div className={styles.cardsGrid}>
        {/* Card 01: Spirit Care */}
        <div
          className={`${styles.card} ${is1 ? styles.cardActive : ""}`}
          onClick={() => toggleCard(1)}
        >
          <div>
            <span className={styles.cardNum}>01</span>
            <h3 className={styles.cardTitle}>{t("1. SPIRIT CARE")}</h3>
            <p className={styles.cardDesc}>
              {t("Design that nurtures the human soul by prioritizing emotional experience, peace, balance, and meaning.")}
            </p>
          </div>
          <div className={styles.outcomeBox}>
            <span className={styles.outcomeLabel}>{t("OUTCOME:")}</span>
            <span className={styles.outcomeText}>{t("SPACES THAT HEAL, INSPIRE, AND CONNECT")}</span>
          </div>
        </div>

        {/* Card 02: Earth Care */}
        <div
          className={`${styles.card} ${is2 ? styles.cardActive : ""}`}
          onClick={() => toggleCard(2)}
        >
          <div>
            <span className={styles.cardNum}>02</span>
            <h3 className={styles.cardTitle}>{t("2. EARTH CARE")}</h3>
            <p className={styles.cardDesc}>
              {t("Environmental responsibility as a core principle. True sustainability that coexists with nature rather than consuming it.")}
            </p>
          </div>
          <div className={styles.outcomeBox}>
            <span className={styles.outcomeLabel}>{t("OUTCOME:")}</span>
            <span className={styles.outcomeText}>{t("PROJECTS THAT COEXIST WITH NATURE RATHER THAN CONSUME IT")}</span>
          </div>
        </div>

        {/* Card 03: Science & Technology */}
        <div
          className={`${styles.card} ${is3 ? styles.cardActive : ""}`}
          onClick={() => toggleCard(3)}
        >
          <div>
            <span className={styles.cardNum}>03</span>
            <h3 className={styles.cardTitle}>{t("3. SCIENCE & TECHNOLOGY")}</h3>
            <p className={styles.cardDesc}>
              {t("Integrating AI and smart systems to enhance performance, efficiency, and user experience to drive continuous innovation.")}
            </p>
          </div>
          <div className={styles.outcomeBox}>
            <span className={styles.outcomeLabel}>{t("OUTCOME:")}</span>
            <span className={styles.outcomeText}>{t("INTELLIGENT, FUTURE-READY ENVIRONMENTS")}</span>
          </div>
        </div>
      </div>

      {/* Interactive 3-Rings SVG Equation Simulator */}
      <div className={styles.diagramArea}>
        <svg viewBox="100 80 500 360" className={styles.diagramSvg}>
          <defs>
            <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* OUTER RED RING */}
          <circle
            cx="320"
            cy="240"
            r="115"
            fill={is1 ? "#ff3b30" : "#e30613"}
            opacity={is1 ? "0.9" : "0.5"}
            className={styles.nodeGroup}
            onClick={() => toggleCard(1)}
          />

          {/* Outer Pulsing Aura if Spirit Care active */}
          {is1 && (
            <circle
              cx="320"
              cy="240"
              r="120"
              fill="none"
              stroke="#ff3b30"
              strokeWidth="2"
              className={styles.pulseRing}
            />
          )}

          {/* INNER WHITE CIRCLE (Spirit Care) */}
          <circle
            cx="275"
            cy="240"
            r="62"
            fill="#ffffff"
            stroke={is1 ? "#e30613" : "#cccccc"}
            strokeWidth={is1 ? "3" : "1"}
            className={styles.nodeGroup}
            onClick={() => toggleCard(1)}
            filter={is1 ? "url(#redGlow)" : "none"}
          />
          <text x="275" y="235" textAnchor="middle" fontWeight="900" fontSize="16" fill="#111111">
            Spirit
          </text>
          <text x="275" y="255" textAnchor="middle" fontWeight="700" fontSize="15" fill="#666666">
            Care
          </text>

          {/* TOP-RIGHT CYAN CIRCLE (Science, Technology) */}
          <g className={styles.nodeGroup} onClick={() => toggleCard(3)}>
            <circle
              cx="415"
              cy="165"
              r="46"
              fill={is3 ? "#00c2ff" : "#0099cc"}
              stroke="#ffffff"
              strokeWidth="2"
              filter={is3 ? "url(#cyanGlow)" : "none"}
            />
            <text x="415" y="158" textAnchor="middle" fontWeight="900" fontSize="12" fill="#ffffff">
              Science,
            </text>
            <text x="415" y="172" textAnchor="middle" fontWeight="900" fontSize="12" fill="#ffffff">
              Technology
            </text>

            {/* PLUS SIGN */}
            <text x="415" y="196" textAnchor="middle" fontWeight="900" fontSize="22" fill="#ffffff">
              +
            </text>
          </g>

          {/* BOTTOM DARK CIRCLE (Earth Care) */}
          <g className={styles.nodeGroup} onClick={() => toggleCard(2)}>
            <circle
              cx="375"
              cy="335"
              r="42"
              fill={is2 ? "#1c1c1e" : "#3a3a3c"}
              stroke={is2 ? "#e30613" : "#555555"}
              strokeWidth="2"
            />
            <text x="375" y="330" textAnchor="middle" fontWeight="900" fontSize="13" fill="#ffffff">
              Earth
            </text>
            <text x="375" y="345" textAnchor="middle" fontWeight="700" fontSize="12" fill="#aaaaaa">
              Care
            </text>

            {/* EQUALS SIGN */}
            <text x="315" y="305" textAnchor="middle" fontWeight="900" fontSize="26" fill="#111111">
              =
            </text>
          </g>

          {/* CONNECTING LINES */}
          <line x1="330" y1="230" x2="380" y2="185" stroke="#111111" strokeWidth="1.5" />
          <line x1="330" y1="250" x2="350" y2="305" stroke="#111111" strokeWidth="1.5" />

          {/* Text annotations matching screenshot */}
          <text x="275" y="325" textAnchor="middle" fontWeight="700" fontSize="11" fill="#333333">
            Spaces that heal,
          </text>
          <text x="275" y="338" textAnchor="middle" fontWeight="700" fontSize="11" fill="#333333">
            inspire, and connect
          </text>

          <text x="430" y="240" textAnchor="middle" fontWeight="800" fontSize="11" fill="#880000">
            Intelligent, future-ready
          </text>
          <text x="430" y="253" textAnchor="middle" fontWeight="800" fontSize="11" fill="#880000">
            environments
          </text>
        </svg>

        {/* Outcome Synthesizer Terminal Box */}
        <div className={styles.synthesizerTerminal}>
          <div className={styles.terminalHeader}>
            <div className={styles.synthTag}>
              <span className={styles.synthDot} />
              <span>{language === "ar" ? "معادلة كيو ب التفاعلية" : "ACTIVE ARCHITECTURAL EQUATION"}</span>
            </div>
          </div>
          <div className={styles.synthTitle}>{getOutcomeTitle()}</div>
          <p className={styles.synthDesc}>{t(getOutcomeDesc())}</p>
        </div>
      </div>
    </section>
  );
}
