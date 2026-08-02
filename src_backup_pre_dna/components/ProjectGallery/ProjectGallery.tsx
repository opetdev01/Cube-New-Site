"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectGallery.module.css";

const projects = [
  {
    id: "zomra",
    title: "ZOMRA EAST",
    year: "2025",
    category: "Residential",
    location: "New Cairo, Egypt",
    image: "/assets/zomra.png",
  },
  {
    id: "redhills",
    title: "RED HILLS",
    year: "2024",
    category: "Coastal Resort",
    location: "Red Sea",
    image: "/assets/redhills.png",
  },
  {
    id: "majarra",
    title: "MAJARRA",
    year: "2026",
    category: "Urban Vision",
    location: "UAE",
    image: "/assets/majarra.png",
  },
];

const ProjectGallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0); // Default first item open on desktop

  return (
    <section className={styles.gallerySection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>FEATURED PROJECTS</h2>
        <Link href="/projects" className={styles.viewAll}>VIEW ALL PROJECTS</Link>
      </div>

      <div className={styles.accordionContainer}>
        {projects.map((project, index) => {
          const isActive = hoveredIndex === index;
          
          return (
            <div 
              key={project.id} 
              className={`${styles.accordionSliver} ${isActive ? styles.active : ""}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Image */}
              <div className={styles.imageWrapper}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={styles.image}
                />
                <div className={styles.overlay}></div>
              </div>

              {/* Vertical Title (Visible when closed) */}
              <div className={styles.verticalTitle}>
                <span className={styles.year}>{project.year}</span>
                <h3>{project.title}</h3>
              </div>

              {/* Expanded Content (Visible when active) */}
              <div className={styles.expandedContent}>
                <div className={styles.projectMeta}>
                  <span>{project.category}</span>
                  <span className={styles.divider}>/</span>
                  <span>{project.location}</span>
                </div>
                <h3 className={styles.expandedTitle}>{project.title}</h3>
                <button className={styles.exploreBtn}>EXPLORE PROJECT</button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectGallery;
