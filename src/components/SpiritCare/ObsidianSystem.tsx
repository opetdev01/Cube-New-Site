"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./ObsidianSystem.module.css";

interface NodeData {
  id: string;
  label: string;
  category: "spirit" | "principles" | "projects" | "skills" | "people" | "studios";
  color: string;
  size: number;
  x: number;
  y: number;
}

interface EdgeData {
  source: string;
  target: string;
}

// Pre-defined node network layout (matching Obsidian knowledge graph screenshot)
const NODES: NodeData[] = [
  // Spirit Care Core Nodes (Red)
  { id: "soul", label: "SOUL", category: "spirit", color: "#e30613", size: 18, x: 260, y: 160 },
  { id: "sun", label: "SUN", category: "spirit", color: "#e30613", size: 16, x: 360, y: 130 },
  { id: "air", label: "AIR", category: "spirit", color: "#e30613", size: 16, x: 220, y: 220 },
  { id: "water", label: "WATER", category: "spirit", color: "#e30613", size: 16, x: 440, y: 190 },
  { id: "earth", label: "EARTH", category: "spirit", color: "#e30613", size: 16, x: 300, y: 280 },

  // Principles (Green / Red)
  { id: "principles", label: "Principles", category: "principles", color: "#e30613", size: 20, x: 330, y: 190 },
  { id: "human_scale", label: "Human Scale", category: "principles", color: "#2eac66", size: 14, x: 410, y: 150 },
  { id: "shade_water", label: "Shade & Water", category: "principles", color: "#2eac66", size: 14, x: 250, y: 130 },
  { id: "local_materials", label: "Local Materials", category: "principles", color: "#2eac66", size: 14, x: 280, y: 250 },
  { id: "sustainability", label: "Sustainability", category: "principles", color: "#9ca3af", size: 12, x: 180, y: 270 },

  // Projects Cluster (White / Grey / Red)
  { id: "projects", label: "Projects", category: "projects", color: "#ffffff", size: 22, x: 420, y: 210 },
  { id: "smouha_gate", label: "Smouha Gate", category: "projects", color: "#dcdcdc", size: 12, x: 440, y: 240 },
  { id: "heliopolis_plaza", label: "Heliopolis Plaza", category: "projects", color: "#dcdcdc", size: 12, x: 470, y: 160 },
  { id: "zamalek_loft", label: "Zamalek Loft", category: "projects", color: "#ffffff", size: 15, x: 530, y: 180 },
  { id: "sahel_resort", label: "Sahel Resort", category: "projects", color: "#dcdcdc", size: 12, x: 290, y: 210 },
  { id: "metatut", label: "MetaTut Pavilion", category: "projects", color: "#dcdcdc", size: 14, x: 380, y: 370 },

  // Studios & OPET (Orange / Yellow)
  { id: "studios", label: "Studios", category: "studios", color: "#e6a13c", size: 15, x: 460, y: 320 },
  { id: "tech_studio", label: "Technical Studio", category: "studios", color: "#e6a13c", size: 13, x: 410, y: 310 },
  { id: "design_studio", label: "Design Studio", category: "studios", color: "#e30613", size: 24, x: 470, y: 260 },
  { id: "opet", label: "OPET", category: "studios", color: "#e6a13c", size: 16, x: 480, y: 440 },

  // People & Clients (Yellow / Purple / Red)
  { id: "clients", label: "Clients", category: "people", color: "#e30613", size: 18, x: 400, y: 90 },
  { id: "nuca", label: "NUCA", category: "people", color: "#b56bb5", size: 14, x: 505, y: 90 },
  { id: "palm_hills", label: "Palm Hills", category: "people", color: "#b56bb5", size: 14, x: 310, y: 100 },
  { id: "people", label: "People", category: "people", color: "#ffffff", size: 16, x: 530, y: 210 },
  { id: "abdelrahman", label: "Abdelrahman Soliman", category: "people", color: "#e6a13c", size: 15, x: 570, y: 240 },

  // Skills & Tech (Blue)
  { id: "skills", label: "Skills", category: "skills", color: "#e30613", size: 18, x: 570, y: 330 },
  { id: "grasshopper", label: "Grasshopper", category: "skills", color: "#3478c6", size: 12, x: 640, y: 230 },
  { id: "rhino", label: "Rhino", category: "skills", color: "#3478c6", size: 12, x: 670, y: 310 },
  { id: "parametric", label: "Parametric", category: "skills", color: "#3478c6", size: 13, x: 610, y: 320 },
  { id: "unreal", label: "Unreal", category: "skills", color: "#3478c6", size: 11, x: 530, y: 410 },
  { id: "slam", label: "SLAM", category: "skills", color: "#3478c6", size: 11, x: 590, y: 410 },
];

// Pre-configured background network edges
const EDGES: EdgeData[] = [
  { source: "soul", target: "principles" },
  { source: "sun", target: "soul" },
  { source: "air", target: "soul" },
  { source: "water", target: "shade_water" },
  { source: "earth", target: "local_materials" },
  { source: "principles", target: "human_scale" },
  { source: "principles", target: "projects" },
  { source: "projects", target: "design_studio" },
  { source: "projects", target: "smouha_gate" },
  { source: "projects", target: "heliopolis_plaza" },
  { source: "design_studio", target: "people" },
  { source: "design_studio", target: "abdelrahman" },
  { source: "design_studio", target: "tech_studio" },
  { source: "tech_studio", target: "studios" },
  { source: "studios", target: "opet" },
  { source: "opet", target: "unreal" },
  { source: "opet", target: "slam" },
  { source: "design_studio", target: "skills" },
  { source: "skills", target: "grasshopper" },
  { source: "skills", target: "rhino" },
  { source: "skills", target: "parametric" },
  { source: "clients", target: "nuca" },
  { source: "clients", target: "palm_hills" },
  { source: "clients", target: "principles" },
  { source: "sustainability", target: "local_materials" },
  { source: "sahel_resort", target: "shade_water" },
];

// Specific Architectural Relationship Database
const RELATIONSHIPS: Record<string, string> = {
  "soul-sun": "Solar geometry & natural illumination evoke spiritual reverence, elevating human emotional wellbeing through dynamic light and shadow balance.",
  "soul-air": "Natural ventilation and fluid air currents create breathing architectural spaces that foster mental clarity, inner peace, and spiritual tranquility.",
  "soul-water": "Reflective water surfaces provide acoustic serenity and visual contemplation, harmonizing human emotion with built space.",
  "soul-earth": "Authentic local materials establish a grounding energy, connecting the human soul to regional context and ancestral heritage.",
  "sun-air": "Passive solar chimney buoyancy drives natural cross-ventilation, lowering energy demand while maintaining indoor fresh air flows.",
  "sun-water": "Solar radiation powers evaporative microclimate cooling, refreshing outdoor plazas with tempered micro-breezes.",
  "air-water": "Cross-ventilation air streams passing over water pools provide passive cooling, significantly reducing HVAC power loads.",
  "earth-water": "Permeable earth landscapes capture and filter stormwater runoff, creating self-sustaining urban water recycling loops.",
  "earth-sun": "Thermal mass earthen walls absorb daylight solar heat, gradually releasing warmth during cooler night hours.",
  "soul-principles": "Human-centered values prioritizing emotional dignity, peace, and spiritual wellness in every architectural footprint.",
  "soul-projects": "Architectural masterpieces (Smouha Gate, Korba Tower) engineered around spiritual harmony and human spatial experience.",
  "sun-parametric": "Grasshopper solar algorithms calculate exact louver angles to maximize daylight while blocking direct heat gain.",
  "opet-skills": "Integrating AI spatial engines, SLAM scanning, and real-time Unreal rendering for immersive architectural digital twins.",
};

export default function ObsidianSystem() {
  const { language, t } = useLanguage();
  const [selectedNodes, setSelectedNodes] = useState<string[]>(["soul", "sun"]);

  const handleNodeClick = (nodeId: string) => {
    if (selectedNodes.includes(nodeId)) {
      // Toggle off if already selected
      setSelectedNodes(selectedNodes.filter((id) => id !== nodeId));
    } else {
      if (selectedNodes.length < 2) {
        setSelectedNodes([...selectedNodes, nodeId]);
      } else {
        // Replace first node with new node
        setSelectedNodes([selectedNodes[1], nodeId]);
      }
    }
  };

  const node1 = NODES.find((n) => n.id === selectedNodes[0]);
  const node2 = NODES.find((n) => n.id === selectedNodes[1]);

  const getRelationshipSynthesis = (n1: NodeData, n2: NodeData): string => {
    const key1 = `${n1.id}-${n2.id}`;
    const key2 = `${n2.id}-${n1.id}`;

    if (RELATIONSHIPS[key1]) return RELATIONSHIPS[key1];
    if (RELATIONSHIPS[key2]) return RELATIONSHIPS[key2];

    return `The interaction between ${n1.label} and ${n2.label} establishes an integrated architectural loop within CUBE's Spirit Care framework, balancing human experience with technical precision.`;
  };

  return (
    <section className={styles.obsidianContainer}>
      {/* Header */}
      <div className={styles.obsidianHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.redBar} />
          <h2 className={styles.title}>{t("SPIRIT CARE OBSIDIAN SYSTEM")}</h2>
        </div>
        <div className={styles.instructionBadge}>
          {language === "ar"
            ? "انقر على أي عنصرين لإطلاق شعاع الليزر واستكشاف العلاقة بينهما"
            : "Click any 2 nodes to emit red laser & reveal relationship"}
        </div>
      </div>

      {/* Interactive Graph Area */}
      <div className={styles.graphCanvasArea}>
        <svg viewBox="100 50 620 420" className={styles.graphSvg}>
          {/* Base Static Connections */}
          {EDGES.map((edge, idx) => {
            const sourceNode = NODES.find((n) => n.id === edge.source);
            const targetNode = NODES.find((n) => n.id === edge.target);
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

          {/* ACTIVE RED LASER BEAM BETWEEN SELECTED NODE 1 AND NODE 2 */}
          {node1 && node2 && (
            <g key="active-laser-beam">
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

          {/* Nodes Rendering */}
          {NODES.map((node) => {
            const isSelected = selectedNodes.includes(node.id);
            return (
              <g
                key={node.id}
                className={styles.nodeGroup}
                onClick={() => handleNodeClick(node.id)}
                transform={`translate(${node.x}, ${node.y})`}
              >
                {/* Outer Selection Pulse Ring */}
                {isSelected && (
                  <circle cx="0" cy="0" r={node.size + 12} fill="none" stroke="#e30613" strokeWidth="2" className={styles.selectionRing} />
                )}

                {/* Main Node Circle */}
                <circle
                  cx="0"
                  cy="0"
                  r={node.size}
                  fill={node.color}
                  stroke={isSelected ? "#ffffff" : "rgba(0,0,0,0.4)"}
                  strokeWidth={isSelected ? 3.5 : 1}
                  className={`${styles.nodeCircle} ${isSelected ? styles.nodeSelected : ""}`}
                />

                {/* Node Label Text */}
                <text
                  x="0"
                  y={node.size + 16}
                  textAnchor="middle"
                  className={`${styles.nodeLabel} ${isSelected ? styles.nodeLabelSelected : ""}`}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Relationship Terminal Banner */}
      {node1 && node2 ? (
        <div className={styles.terminalBox}>
          <div className={styles.terminalHeader}>
            <div className={styles.laserTag}>
              <span className={styles.laserIcon} />
              <span>{language === "ar" ? "اتصال ليزر نشط" : "ACTIVE RED LASER CONNECTION"}</span>
            </div>
            <button className={styles.resetBtn} onClick={() => setSelectedNodes([])}>
              {language === "ar" ? "إلغاء التحديد" : "Reset Nodes"}
            </button>
          </div>

          <div className={styles.nodesPairTitle}>
            {node1.label} <span style={{ color: "var(--c-red)", margin: "0 8px" }}>⚡</span> {node2.label}
          </div>
          <p className={styles.relationshipText}>
            {t(getRelationshipSynthesis(node1, node2))}
          </p>
        </div>
      ) : node1 ? (
        <div className={styles.terminalBox} style={{ borderColor: "rgba(255,255,255,0.2)" }}>
          <div className={styles.terminalHeader}>
            <div className={styles.laserTag} style={{ color: "rgba(255,255,255,0.7)" }}>
              <span>{language === "ar" ? "تحديد عقدة واحدة" : "SINGLE NODE SELECTED"}</span>
            </div>
            <button className={styles.resetBtn} onClick={() => setSelectedNodes([])}>
              {language === "ar" ? "إلغاء" : "Clear"}
            </button>
          </div>
          <div className={styles.nodesPairTitle}>{node1.label}</div>
          <p className={styles.relationshipText}>
            {language === "ar"
              ? "انقر على عقدة ثانية لإطلاق شعاع الليزر وتوليد التحليل الفلسفي بينهما."
              : "Click a 2nd node to fire the red laser beam and reveal their architectural synergy."}
          </p>
        </div>
      ) : null}
    </section>
  );
}
