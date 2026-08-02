"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const N = 12; // Number of horizontal sections

export default function KemetScrollAssembly() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Lock browser scrolling
      
      const step = 0.025; // Speed adjustment
      if (e.deltaY > 0) {
        currentProgress = Math.min(currentProgress + step, 1);
      } else {
        currentProgress = Math.max(currentProgress - step, 0);
      }
      setScrollProgress(currentProgress);
    };

    // Mobile Swipe Gesture Handlers
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const step = 0.04; // Swipe speed
      
      if (Math.abs(deltaY) > 8) {
        e.preventDefault(); // Disable mobile bounce scroll
        if (deltaY > 0) {
          currentProgress = Math.min(currentProgress + step, 1);
        } else {
          currentProgress = Math.max(currentProgress - step, 0);
        }
        setScrollProgress(currentProgress);
        touchStartY = touchY;
      }
    };

    // Bind non-passive listeners to allow e.preventDefault()
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const buildP = scrollProgress;
  const shown = buildP * N;
  const currentSection = Math.max(0, Math.min(N, Math.floor(shown + 1e-4)));
  const pctText = `${Math.round(buildP * 100)}%`;

  // Title morph calculations
  const titleOpacity = Math.min(Math.max((scrollProgress - 0.7) / 0.3, 0), 1);
  const titleTransform = `translateY(${(1 - titleOpacity) * 16}px)`;

  // Scroll cue opacity
  const cueOpacity = scrollProgress > 0.03 ? 0 : 1;

  // Generate ticks
  const ticks = Array.from({ length: N }, (_, i) => i);

  return (
    <div className={styles.sandboxPage}>
      <section className={styles.scene} aria-label="Scroll to assemble Kemet Tower">
        <div className={styles.pin}>
          
          {/* Main Visual Frame */}
          <div className={styles.frame}>
            {/* Generate 12 sliced layers dynamically using CSS clip-path */}
            {Array.from({ length: N }).map((_, i) => {
              const order = N - 1 - i; // bottom section first
              const localProgress = Math.min(Math.max(shown - order, 0), 1);
              const eased = 1 - Math.pow(1 - localProgress, 3); // cubic easeOut

              // clip-path inset percentage calculation
              const sliceTop = (i / N) * 100;
              const sliceBottom = ((N - 1 - i) / N) * 100;

              const style: React.CSSProperties = {
                opacity: eased,
                transform: `translateY(${(1 - eased) * 40}px) scale(${0.99 + 0.01 * eased})`,
                filter: eased < 1 ? `blur(${(1 - eased) * 5}px)` : "none",
                clipPath: `inset(${sliceTop}% 0% ${sliceBottom}% 0%)`,
                zIndex: eased < 1 ? 2 : 1
              };

              const flash = (shown - order > 0 && shown - order < 1) ? Math.sin((shown - order) * Math.PI) : 0;
              const shadowStyle = flash > 0.02 ? {
                boxShadow: `0 2px 22px -2px rgba(231,201,135,${0.6 * flash})`
              } : {};

              return (
                <div
                  key={i}
                  className={styles.sec}
                  style={{ ...style, ...shadowStyle }}
                >
                  <img
                    src="/assets/projects/kemet-business-tower/Kemet-Tower_1-scaled.jpg"
                    alt={i === 0 ? "Kemet Tower roofline" : i === N - 1 ? "Kemet Tower entrance" : ""}
                    className={styles.sliceImg}
                  />
                </div>
              );
            })}

            <div className={styles.baseline} />
            <div className={styles.glowpad} />
          </div>

          {/* Overlaid HUD metrics */}
          <div className={styles.hud}>
            <div className={styles.top}>
              <div className={styles.brand}>
                <svg viewBox="0 0 100 100" fill="none" stroke="#c9a45c" strokeWidth="5" strokeLinecap="round">
                  <path d="M18 78 V30 L50 58 L82 30 V78" />
                  <line x1="50" y1="58" x2="50" y2="90" />
                </svg>
                <span className={styles.nm}>
                  KEMET<small>New Capital</small>
                </span>
              </div>
              <div className={styles.meter}>
                <div className={styles.l}>Assembling</div>
                <b>
                  <span>{currentSection}</span> / <span>{N}</span>
                </b>
                <div className={styles.pct}>{pctText}</div>
              </div>
            </div>

            <div className={styles.title} style={{ opacity: titleOpacity, transform: titleTransform }}>
              <div className={styles.kick}>
                <i />
                <span>New Administrative Capital · Egypt</span>
                <i />
              </div>
              <h1>
                KEMET <span className={styles.g}>TOWER</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* FIXED CONTROLS */}
      <div className={styles.rail}>
        <i style={{ height: `${scrollProgress * 100}%` }} />
      </div>
      <div className={styles.ticks}>
        {ticks.map((_, i) => (
          <span key={i} className={i < shown ? styles.on : ""} />
        ))}
      </div>
      <div className={styles.cue} style={{ opacity: cueOpacity }}>
        <div className={styles.mouse} />
        <span>Scroll to build</span>
      </div>
    </div>
  );
}
