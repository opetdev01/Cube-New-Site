"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./AIBot.module.css";

const AIBot = () => {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleBotClick = () => {
    window.dispatchEvent(new CustomEvent("open-cube-search"));
  };

  return (
    <div 
      className={styles.botContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleBotClick}
      title={language === "en" ? "CUBE AI Concierge - Click to Search" : "مساعد كيو ب الذكي - اضغط للبحث"}
    >
      {/* Speech bubble indicator */}
      <div className={`${styles.tooltip} ${isHovered ? styles.tooltipVisible : ""}`}>
        <span>
          {language === "en" 
            ? "Need help? Ask CUBE AI" 
            : "هل تحتاج مساعدة؟ اسأل ذكاء كيو ب"}
        </span>
      </div>

      {/* Cybernetic Bot Outer Ring and Face */}
      <div className={styles.botCore}>
        <div className={styles.pulseRing} />
        <div className={styles.rotatingScanner} />
        
        {/* Robotic SVG face construct */}
        <svg viewBox="0 0 100 100" className={styles.botSvg}>
          <defs>
            <linearGradient id="botRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff3030" />
              <stop offset="100%" stopColor="#c00000" />
            </linearGradient>
          </defs>
          
          {/* Visor outline */}
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(227, 6, 19, 0.25)" strokeWidth="1.5" />
          
          {/* Inner core grid matrix */}
          <path d="M 50,15 L 50,85 M 15,50 L 85,50" stroke="rgba(0, 0, 0, 0.05)" strokeWidth="1" strokeDasharray="3,3" />
          
          {/* Visor shield */}
          <rect x="24" y="38" width="52" height="24" rx="12" fill="rgba(17, 17, 17, 0.85)" stroke="url(#botRedGrad)" strokeWidth="1.5" />
          
          {/* Glowing robotic scanner bar */}
          <line x1="32" y1="50" x2="68" y2="50" stroke="#ff3030" strokeWidth="2.5" strokeLinecap="round" className={styles.scannerLaser} />
          
          {/* Technical focal rings */}
          <circle cx="50" cy="50" r="4" fill="#ff3030" className={styles.centralEye} />
        </svg>
      </div>
    </div>
  );
};

export default AIBot;
