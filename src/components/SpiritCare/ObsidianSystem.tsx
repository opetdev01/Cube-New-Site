"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./ObsidianSystem.module.css";

interface SpiritItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  color: string;
  x: number;
  y: number;
}

interface EdgeData {
  source: string;
  target: string;
}

// Spirit Care Nodes Only
const SPIRIT_NODES: SpiritItem[] = [
  {
    id: "soul",
    num: "01.",
    title: "SOUL",
    desc: "Every space must feel alive through light, shadow, and proportion.",
    color: "#e30613",
    x: 250,
    y: 110,
  },
  {
    id: "sun",
    num: "02.",
    title: "SUN",
    desc: "Light is the primary generator of life, dictating solar orientation and shading.",
    color: "#e6a13c",
    x: 410,
    y: 140,
  },
  {
    id: "air",
    num: "03.",
    title: "AIR",
    desc: "Creating movement and comfort through natural cross-ventilation.",
    color: "#3478c6",
    x: 170,
    y: 250,
  },
  {
    id: "water",
    num: "04.",
    title: "WATER",
    desc: "A natural cooling agent that offers visual and spiritual reflection.",
    color: "#00b4d8",
    x: 430,
    y: 300,
  },
  {
    id: "earth",
    num: "05.",
    title: "EARTH",
    desc: "Sustainability rooted deeply in context and local, natural materials.",
    color: "#2eac66",
    x: 270,
    y: 370,
  },
];

// Base connecting edges between Spirit Care nodes
const SPIRIT_EDGES: EdgeData[] = [
  { source: "soul", target: "sun" },
  { source: "soul", target: "air" },
  { source: "soul", target: "water" },
  { source: "soul", target: "earth" },
  { source: "sun", target: "air" },
  { source: "sun", target: "water" },
  { source: "sun", target: "earth" },
  { source: "air", target: "water" },
  { source: "air", target: "earth" },
  { source: "water", target: "earth" },
];

// Architectural Synergistic Relationships between Spirit Care Pairs
const SPIRIT_RELATIONSHIPS: Record<string, string> = {
  "soul-sun":
    "Solar geometry and natural illumination evoke spiritual reverence, elevating human emotional wellbeing through a dynamic balance of light and shadow.",
  "soul-air":
    "Natural ventilation and fluid air currents create breathing architectural spaces that foster mental clarity, inner peace, and spiritual tranquility.",
  "soul-water":
    "Reflective water surfaces provide acoustic serenity and visual contemplation, harmonizing human emotion with built architectural form.",
  "soul-earth":
    "Authentic local materials establish a grounding energy, connecting the human soul directly to regional context and natural heritage.",
  "sun-air":
    "Passive solar chimney buoyancy drives natural cross-ventilation, lowering cooling energy demand while continuously maintaining fresh indoor airflow.",
  "sun-water":
    "Solar radiation powers evaporative microclimate cooling, generating refreshing micro-breezes and cooling surrounding plazas naturally.",
  "air-water":
    "Cross-ventilation air streams passing over water pools provide passive thermal cooling, reducing ambient temperatures without mechanical power.",
  "earth-water":
    "Permeable earth landscapes capture and filter rainwater runoff, creating self-sustaining urban hydrology loops and natural water features.",
  "earth-sun":
    "Thermal mass earthen walls absorb daylight solar heat and release warmth gradually during cooler night hours for passive climate control.",
  "air-earth":
    "Ground-coupled earth tubes pre-cool incoming fresh air streams using subterranean earth temperatures for year-round natural comfort.",
};

export default function ObsidianSystem() {
  const { language, t } = useLanguage();
  const [selectedNodes, setSelectedNodes] = useState<string[]>(["soul", "sun"]);

  const handleNodeSelect = (nodeId: string) => {
    if (selectedNodes.includes(nodeId)) {
      // Toggle off if already selected
      setSelectedNodes(selectedNodes.filter((id) => id !== nodeId));
    } else {
      if (selectedNodes.length < 2) {
        setSelectedNodes([...selectedNodes, nodeId]);
      } else {
        // Shift selection to hold last selected + new selected
        setSelectedNodes([selectedNodes[1], nodeId]);
      }
    }
  };

  const node1 = SPIRIT_NODES.find((n) => n.id === selectedNodes[0]);
  const node2 = SPIRIT_NODES.find((n) => n.id === selectedNodes[1]);

  const getSynthesisText = (n1: SpiritItem, n2: SpiritItem): string => {
    const key1 = `${n1.id}-${n2.id}`;
    const key2 = `${n2.id}-${n1.id}`;

    if (SPIRIT_RELATIONSHIPS[key1]) return SPIRIT_RELATIONSHIPS[key1];
    if (SPIRIT_RELATIONSHIPS[key2]) return SPIRIT_RELATIONSHIPS[key2];

    return `The interaction between ${n1.title} and ${n2.title} establishes a direct architectural synergy within CUBE's Spirit Care philosophy, connecting human experience with natural elements.`;
  };

  return (
    <section className={styles.obsidianContainer}>
      {/* Header */}
      <div className={styles.obsidianHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.redBar} />
          <h2 className={styles.title}>{t("SPIRIT CARE OBSIDIAN GRAPH")}</h2>
        </div>
        <div className={styles.instructionBadge}>
          {language === "ar"
            ? "انقر على أي عنصرين لإطلاق شعاع الليزر واستكشاف العلاقة بينهما"
            : "Select any 2 Spirit Care nodes to fire the red laser beam & explain relationship"}
        </div>
      </div>

      <div className={styles.spiritGrid}>
        {/* Left Side: 5 Spirit Care Items List */}
        <div className={styles.spiritList}>
          {SPIRIT_NODES.map((item) => {
            const isSelected = selectedNodes.includes(item.id);
            return (
              <div
                key={item.id}
                className={`${styles.spiritRow} ${isSelected ? styles.rowActive : ""}`}
                onClick={() => handleNodeSelect(item.id)}
              >
                <span className={styles.itemNum}>{item.num}</span>
                <span className={styles.itemTitle}>{item.title}</span>
                <p className={styles.itemDesc}>{t(item.desc)}</p>
              </div>
            );
          })}
        </div>

        {/* Right Side: Obsidian Knowledge Graph (5 Spirit Care Nodes Only) */}
        <div className={styles.graphCanvasArea}>
          <svg viewBox="100 50 400 380" className={styles.graphSvg}>
            {/* Base Lines between Spirit Care Nodes */}
            {SPIRIT_EDGES.map((edge, idx) => {
              const sourceNode = SPIRIT_NODES.find((n) => n.id === edge.source);
              const targetNode = SPIRIT_NODES.find((n) => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;

              const isEdgeActive =
                selectedNodes.includes(edge.source) && selectedNodes.includes(edge.target);

              return (
                <line
                  key={`edge-${idx}`}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  className={`${styles.baseLine} ${isEdgeActive ? styles.baseLineActive : ""}`}
                />
              );
            })}

            {/* STRONG RED LASER BEAM BETWEEN SELECTED NODE 1 AND NODE 2 */}
            {node1 && node2 && (
              <g key="active-spirit-laser-beam">
                {/* Outer Glowing Red Laser Flare */}
                <line
                  x1={node1.x}
                  y1={node1.y}
                  x2={node2.x}
                  y2={node2.y}
                  className={styles.laserLineGlow}
                />
                {/* Inner Animated White Energy Core */}
                <line
                  x1={node1.x}
                  y1={node1.y}
                  x2={node2.x}
                  y2={node2.y}
                  className={styles.laserLineCore}
                />
              </g>
            )}

            {/* Render 5 Spirit Care Nodes */}
            {SPIRIT_NODES.map((node) => {
              const isSelected = selectedNodes.includes(node.id);
              return (
                <g
                  key={node.id}
                  className={styles.nodeGroup}
                  onClick={() => handleNodeSelect(node.id)}
                  transform={`translate(${node.x}, ${node.y})`}
                >
                  {/* Outer Pulsing Glow */}
                  {isSelected && (
                    <circle cx="0" cy="0" r="26" fill="rgba(227, 6, 19, 0.4)" className={styles.selectionRing} />
                  )}

                  {/* Main Node Circle */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isSelected ? 16 : 12}
                    fill={node.color}
                    stroke={isSelected ? "#ffffff" : "rgba(0,0,0,0.5)"}
                    strokeWidth={isSelected ? 3.5 : 1.5}
                    className={`${styles.nodeCircle} ${isSelected ? styles.nodeSelected : ""}`}
                  />

                  {/* Node Label Text */}
                  <text
                    x="0"
                    y="32"
                    textAnchor="middle"
                    className={`${styles.nodeLabel} ${isSelected ? styles.nodeLabelSelected : ""}`}
                  >
                    {node.title}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Relationship Explanation Panel */}
      {node1 && node2 ? (
        <div className={styles.terminalBox}>
          <div className={styles.terminalHeader}>
            <div className={styles.laserTag}>
              <span className={styles.laserIcon} />
              <span>{language === "ar" ? "شعاع ليزر العناية بالروح" : "SPIRIT CARE LASER CONNECTION"}</span>
            </div>
            <button className={styles.resetBtn} onClick={() => setSelectedNodes([])}>
              {language === "ar" ? "إلغاء التحديد" : "Clear Selection"}
            </button>
          </div>

          <div className={styles.nodesPairTitle}>
            {node1.title} <span style={{ color: "var(--c-red)", margin: "0 10px" }}>⚡</span> {node2.title}
          </div>
          <p className={styles.relationshipText}>{t(getSynthesisText(node1, node2))}</p>
        </div>
      ) : node1 ? (
        <div className={styles.terminalBox} style={{ borderColor: "rgba(255,255,255,0.15)" }}>
          <div className={styles.terminalHeader}>
            <div className={styles.laserTag} style={{ color: "rgba(255,255,255,0.7)" }}>
              <span>{language === "ar" ? "حدد عنصراً ثانياً" : "SELECT A SECOND ELEMENT"}</span>
            </div>
            <button className={styles.resetBtn} onClick={() => setSelectedNodes([])}>
              {language === "ar" ? "إلغاء" : "Clear"}
            </button>
          </div>
          <div className={styles.nodesPairTitle}>{node1.title}</div>
          <p className={styles.relationshipText}>
            {language === "ar"
              ? "انقر على عنصر ثانٍ لإطلاق شعاع الليزر الأحمر وشرح العلاقة بينهما."
              : "Click a 2nd Spirit Care element (SOUL, SUN, AIR, WATER, EARTH) to fire the red laser beam and reveal their relationship."}
          </p>
        </div>
      ) : (
        <div className={styles.terminalBox} style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <p className={styles.relationshipText} style={{ textAlign: "center", color: "rgba(255,255,255,0.6)" }}>
            {language === "ar"
              ? "انقر على أي عنصرين من القائمة أو المخطط لإطلاق شعاع الليزر وتوليد التحليل بينهما."
              : "Click any 2 elements from the list or graph above to fire the red laser beam and reveal their relationship."}
          </p>
        </div>
      )}
    </section>
  );
}
