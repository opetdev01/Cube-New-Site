"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./SpiritCare.module.css";

interface SpiritItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  angle: number;
}

export default function SpiritCare() {
  const { t } = useLanguage();
  const [activeNode, setActiveNode] = useState<string>("soul");

  const items: SpiritItem[] = [
    {
      id: "soul",
      num: "01.",
      title: "SOUL",
      desc: "Every space must feel alive through light, shadow, and proportion.",
      angle: -90, // Top
    },
    {
      id: "sun",
      num: "02.",
      title: "SUN",
      desc: "Light is the primary generator of life, dictating solar orientation and shading.",
      angle: -18, // Top Right
    },
    {
      id: "water",
      num: "04.",
      title: "WATER",
      desc: "A natural cooling agent that offers visual and spiritual reflection.",
      angle: 54, // Bottom Right
    },
    {
      id: "earth",
      num: "05.",
      title: "EARTH",
      desc: "Sustainability rooted deeply in context and local, natural materials.",
      angle: 126, // Bottom Left
    },
    {
      id: "air",
      num: "03.",
      title: "AIR",
      desc: "Creating movement and comfort through natural cross-ventilation.",
      angle: 198, // Top Left
    },
  ];

  // Display items in exact order: 01. SOUL, 02. SUN, 03. AIR, 04. WATER, 05. EARTH
  const displayItems = [
    items.find((i) => i.id === "soul")!,
    items.find((i) => i.id === "sun")!,
    items.find((i) => i.id === "air")!,
    items.find((i) => i.id === "water")!,
    items.find((i) => i.id === "earth")!,
  ];

  return (
    <section className={styles.spiritSection}>
      <div className={styles.spiritHeader}>
        <span className={styles.redBar} />
        <h2 className={styles.spiritTitle}>{t("SPIRIT CARE")}</h2>
      </div>

      <div className={styles.spiritGrid}>
        {/* Left Side: Numbered Items List */}
        <div className={styles.spiritList}>
          {displayItems.map((item) => {
            const isActive = activeNode === item.id;
            return (
              <div
                key={item.id}
                className={`${styles.spiritRow} ${isActive ? styles.rowActive : ""}`}
                onMouseEnter={() => setActiveNode(item.id)}
                onClick={() => setActiveNode(item.id)}
              >
                <span className={styles.itemNum}>{item.num}</span>
                <span className={styles.itemTitle}>{item.title}</span>
                <p className={styles.itemDesc}>{t(item.desc)}</p>
              </div>
            );
          })}
        </div>

        {/* Right Side: Interactive Obsidian 5-Point Node Graph */}
        <div className={styles.graphWrapper}>
          <svg viewBox="0 0 360 360" className={styles.graphSvg}>
            <defs>
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff2a3b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#e30613" stopOpacity="0.25" />
              </radialGradient>
            </defs>

            {/* Background Rings */}
            <circle cx="180" cy="180" r="110" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <circle cx="180" cy="180" r="70" fill="rgba(227, 6, 19, 0.1)" stroke="rgba(227, 6, 19, 0.3)" strokeWidth="1" />

            {/* Connecting Star Arms */}
            {items.map((item) => {
              const rad = (item.angle * Math.PI) / 180;
              const x2 = 180 + 95 * Math.cos(rad);
              const y2 = 180 + 95 * Math.sin(rad);
              const isActive = activeNode === item.id;

              return (
                <line
                  key={`line-${item.id}`}
                  x1="180"
                  y1="180"
                  x2={x2}
                  y2={y2}
                  stroke={isActive ? "#e30613" : "rgba(255,255,255,0.25)"}
                  strokeWidth={isActive ? "3.5" : "1.8"}
                  className={styles.starArm}
                />
              );
            })}

            {/* Central Node Hub */}
            <circle cx="180" cy="180" r="45" fill="url(#hubGlow)" stroke="#e30613" strokeWidth="2" />
            <circle cx="180" cy="180" r="8" fill="#ffffff" />

            {/* 5 Outer Star Nodes */}
            {items.map((item) => {
              const rad = (item.angle * Math.PI) / 180;
              const cx = 180 + 95 * Math.cos(rad);
              const cy = 180 + 95 * Math.sin(rad);

              const labelRadius = 135;
              const lx = 180 + labelRadius * Math.cos(rad);
              const ly = 180 + labelRadius * Math.sin(rad);
              const isActive = activeNode === item.id;

              return (
                <g
                  key={`node-${item.id}`}
                  className={`${styles.nodeGroup} ${isActive ? styles.nodeActive : ""}`}
                  onMouseEnter={() => setActiveNode(item.id)}
                  onClick={() => setActiveNode(item.id)}
                >
                  {/* Outer Pulsing Glow */}
                  {isActive && (
                    <circle cx={cx} cy={cy} r="18" fill="rgba(227, 6, 19, 0.45)" className={styles.pulseGlow} />
                  )}

                  {/* Node Circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isActive ? "10" : "7"}
                    fill={isActive ? "#ffffff" : "rgba(255,255,255,0.85)"}
                    stroke="#e30613"
                    strokeWidth={isActive ? "3" : "1.5"}
                  />

                  {/* Text Label */}
                  <text
                    x={lx}
                    y={ly + 4}
                    textAnchor="middle"
                    className={`${styles.nodeText} ${isActive ? styles.nodeTextActive : ""}`}
                  >
                    {item.title}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
