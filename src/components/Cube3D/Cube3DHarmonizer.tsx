"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./Cube3DHarmonizer.module.css";

export default function Cube3DHarmonizer() {
  const { language, t } = useLanguage();
  const [rotX, setRotX] = useState(-20);
  const [rotY, setRotY] = useState(35);
  const [isExploded, setIsExploded] = useState(false);
  const [activeFace, setActiveFace] = useState<string>("spirit");
  const [isDragging, setIsDragging] = useState(false);

  const startPos = useRef({ x: 0, y: 0 });
  const animFrame = useRef<number | null>(null);

  // Gentle auto-rotation when idle
  useEffect(() => {
    if (isDragging) return;
    const autoRotate = () => {
      setRotY((prev) => (prev + 0.3) % 360);
      animFrame.current = requestAnimationFrame(autoRotate);
    };
    animFrame.current = requestAnimationFrame(autoRotate);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    setRotY((prev) => prev + deltaX * 0.5);
    setRotX((prev) => Math.max(-80, Math.min(80, prev - deltaY * 0.5)));
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.label}>{t("3D Interactive Matrix")}</span>
        <h2 className={styles.title}>{t("The Cube 3D Harmonizer")}</h2>
        <p className={styles.subTitle}>
          {language === "ar"
            ? "اسحب لتدوير التكعيب ثلاثي الأبعاد أو انقر على الأوجه لتفكيك الطبقات المعمارية"
            : "Drag to rotate the 3D cube or click faces to explode parametric layers"}
        </p>
      </div>

      {/* 3D Scene viewport */}
      <div
        className={styles.scene}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className={`${styles.cube} ${isExploded ? styles.exploded : ""}`}
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          }}
        >
          {/* Front Face: Spirit Care */}
          <div
            className={`${styles.face} ${styles.faceFront}`}
            onClick={() => setActiveFace("spirit")}
          >
            <span className={styles.faceTag}>PILLAR 01</span>
            <div className={styles.faceName}>SPIRIT CARE</div>
            <div className={styles.faceVal}>Human Healing & Peace</div>
          </div>

          {/* Back Face: Spirit Care Node 2 */}
          <div
            className={`${styles.face} ${styles.faceBack}`}
            onClick={() => setActiveFace("spirit")}
          >
            <span className={styles.faceTag}>PILLAR 01</span>
            <div className={styles.faceName}>SOUL & LIGHT</div>
            <div className={styles.faceVal}>Proportion & Shadow</div>
          </div>

          {/* Right Face: Science & Tech */}
          <div
            className={`${styles.face} ${styles.faceRight}`}
            onClick={() => setActiveFace("science")}
          >
            <span className={styles.faceTag} style={{ color: "#0099cc" }}>PILLAR 03</span>
            <div className={styles.faceName}>SCIENCE & TECH</div>
            <div className={styles.faceVal}>AI & Parametric BIM</div>
          </div>

          {/* Left Face: Science & Tech Node 2 */}
          <div
            className={`${styles.face} ${styles.faceLeft}`}
            onClick={() => setActiveFace("science")}
          >
            <span className={styles.faceTag} style={{ color: "#0099cc" }}>PILLAR 03</span>
            <div className={styles.faceName}>DIGITAL TWINS</div>
            <div className={styles.faceVal}>SLAM & Unreal Spatial</div>
          </div>

          {/* Top Face: Earth Care */}
          <div
            className={`${styles.face} ${styles.faceTop}`}
            onClick={() => setActiveFace("earth")}
          >
            <span className={styles.faceTag} style={{ color: "#2eac66" }}>PILLAR 02</span>
            <div className={styles.faceName}>EARTH CARE</div>
            <div className={styles.faceVal}>Passive Microclimate</div>
          </div>

          {/* Bottom Face: Earth Care Node 2 */}
          <div
            className={`${styles.face} ${styles.faceBottom}`}
            onClick={() => setActiveFace("earth")}
          >
            <span className={styles.faceTag} style={{ color: "#2eac66" }}>PILLAR 02</span>
            <div className={styles.faceName}>LOCAL MATERIALS</div>
            <div className={styles.faceVal}>Zero Carbon Footprint</div>
          </div>
        </div>
      </div>

      {/* Control Action Buttons */}
      <div className={styles.controlsBar}>
        <button
          className={`${styles.btn} ${isExploded ? styles.btnActive : ""}`}
          onClick={() => setIsExploded(!isExploded)}
        >
          {isExploded
            ? language === "ar"
              ? "تجميع المكعب"
              : "Collapse Matrix"
            : language === "ar"
              ? "تفكيك الطبقات الثلاثية"
              : "Explode Matrix"}
        </button>
        <button
          className={`${styles.btn} ${activeFace === "spirit" ? styles.btnActive : ""}`}
          onClick={() => setActiveFace("spirit")}
        >
          Spirit Care
        </button>
        <button
          className={`${styles.btn} ${activeFace === "earth" ? styles.btnActive : ""}`}
          onClick={() => setActiveFace("earth")}
        >
          Earth Care
        </button>
        <button
          className={`${styles.btn} ${activeFace === "science" ? styles.btnActive : ""}`}
          onClick={() => setActiveFace("science")}
        >
          Science & Tech
        </button>
      </div>

      {/* Telemetry Real-time Data Readout */}
      <div className={styles.telemetryBox}>
        <div className={styles.telemetryGrid}>
          {activeFace === "spirit" && (
            <>
              <div className={styles.telemetryItem}>
                <div className={styles.tVal}>98.4%</div>
                <div className={styles.tLabel}>{t("Human Spatial Comfort Index")}</div>
              </div>
              <div className={styles.telemetryItem}>
                <div className={styles.tVal}>100%</div>
                <div className={styles.tLabel}>{t("Daylight & Orientation Synergy")}</div>
              </div>
              <div className={styles.telemetryItem}>
                <div className={styles.tVal}>0.92</div>
                <div className={styles.tLabel}>{t("Acoustic Reflection Serenity")}</div>
              </div>
            </>
          )}

          {activeFace === "earth" && (
            <>
              <div className={styles.telemetryItem} style={{ borderColor: "#2eac66" }}>
                <div className={styles.tVal}>-42%</div>
                <div className={styles.tLabel}>{t("Embodied Carbon Reduction")}</div>
              </div>
              <div className={styles.telemetryItem} style={{ borderColor: "#2eac66" }}>
                <div className={styles.tVal}>85%</div>
                <div className={styles.tLabel}>{t("Local Material Sourcing")}</div>
              </div>
              <div className={styles.telemetryItem} style={{ borderColor: "#2eac66" }}>
                <div className={styles.tVal}>100%</div>
                <div className={styles.tLabel}>{t("Passive Cooling Cross-Ventilation")}</div>
              </div>
            </>
          )}

          {activeFace === "science" && (
            <>
              <div className={styles.telemetryItem} style={{ borderColor: "#0099cc" }}>
                <div className={styles.tVal}>96.8%</div>
                <div className={styles.tLabel}>{t("AI BIM Mesh Precision")}</div>
              </div>
              <div className={styles.telemetryItem} style={{ borderColor: "#0099cc" }}>
                <div className={styles.tVal}>60 FPS</div>
                <div className={styles.tLabel}>{t("Real-time Unreal Digital Twin")}</div>
              </div>
              <div className={styles.telemetryItem} style={{ borderColor: "#0099cc" }}>
                <div className={styles.tVal}>0 Clashes</div>
                <div className={styles.tLabel}>{t("Automated Structural Verification")}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
