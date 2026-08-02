"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ObsidianGraph.module.css";
import { useLanguage } from "@/components/LanguageContext";

interface Node {
  id: string;
  label: string;
  category: "hub" | "principle" | "project" | "skill" | "client" | "people" | "studio" | "tech";
  color: string;
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isDragging?: boolean;
}

interface Edge {
  source: string;
  target: string;
}

export default function ObsidianGraph() {
  const { language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Nodes dataset matching the Obsidian graph reference image
  const initialNodesData: Omit<Node, "x" | "y" | "vx" | "vy">[] = [
    // Core Hubs & Philosophy
    { id: "projects", label: "Projects", category: "hub", color: "#e30613", radius: 24 },
    { id: "design-studio", label: "Design Studio", category: "hub", color: "#ff4d4d", radius: 22 },
    { id: "principles", label: "Principles", category: "principle", color: "#e30613", radius: 20 },
    { id: "spirit-care", label: "Spirit Care", category: "principle", color: "#ffd700", radius: 18 },
    { id: "earth-care", label: "Earth Care", category: "principle", color: "#4caf50", radius: 18 },
    { id: "standards", label: "Standards", category: "principle", color: "#e30613", radius: 16 },
    { id: "skills", label: "Skills", category: "skill", color: "#e30613", radius: 18 },
    { id: "people", label: "People", category: "people", color: "#ffb300", radius: 18 },
    { id: "studios", label: "Studios", category: "studio", color: "#ffffff", radius: 16 },
    { id: "clients", label: "Clients", category: "client", color: "#e91e63", radius: 18 },
    { id: "opet", label: "OPET", category: "tech", color: "#ff7043", radius: 18 },
    { id: "tech-studio", label: "Technical Studio", category: "studio", color: "#ff9800", radius: 15 },

    // Sub-principles (Green & Grey)
    { id: "human-scale", label: "Human Scale", category: "principle", color: "#4caf50", radius: 12 },
    { id: "shade-water", label: "Shade & Water", category: "principle", color: "#4caf50", radius: 12 },
    { id: "local-materials", label: "Local Materials", category: "principle", color: "#4caf50", radius: 12 },
    { id: "sustainability", label: "Sustainability", category: "principle", color: "#90a4ae", radius: 12 },

    // Sub-projects (White)
    { id: "smouha-gate", label: "Smouha Gate", category: "project", color: "#ffffff", radius: 12 },
    { id: "heliopolis-plaza", label: "Heliopolis Plaza", category: "project", color: "#ffffff", radius: 12 },
    { id: "new-capital", label: "New Capital", category: "project", color: "#ffffff", radius: 12 },
    { id: "zamalek-loft", label: "Zamalek Loft", category: "project", color: "#ffffff", radius: 12 },
    { id: "sahel-resort", label: "Sahel Resort", category: "project", color: "#ffffff", radius: 12 },
    { id: "korba-tower", label: "Korba Tower", category: "project", color: "#ffffff", radius: 12 },
    { id: "metatut-pavilion", label: "MetaTut Pavilion", category: "project", color: "#ffffff", radius: 14 },

    // Skills & Tech (Blue)
    { id: "parametric", label: "Parametric", category: "skill", color: "#2196f3", radius: 12 },
    { id: "grasshopper", label: "Grasshopper", category: "skill", color: "#2196f3", radius: 11 },
    { id: "rhino", label: "Rhino", category: "skill", color: "#2196f3", radius: 11 },
    { id: "unreal", label: "Unreal Engine", category: "skill", color: "#2196f3", radius: 11 },
    { id: "slam", label: "SLAM AI", category: "skill", color: "#2196f3", radius: 11 },

    // Clients & People
    { id: "palm-hills", label: "Palm Hills", category: "client", color: "#ba68c8", radius: 14 },
    { id: "nuca", label: "NUCA", category: "client", color: "#ab47bc", radius: 13 },
    { id: "abdelrahman-soliman", label: "Abdelrahman Soliman", category: "people", color: "#ffa726", radius: 12 },
    { id: "adel-khaled", label: "Adel Khaled", category: "people", color: "#ffa726", radius: 12 },
    { id: "karim-abdelrehim", label: "Karim Abdelrehim", category: "people", color: "#ffa726", radius: 12 },
  ];

  // Edges connecting nodes
  const initialEdges: Edge[] = [
    { source: "projects", target: "design-studio" },
    { source: "projects", target: "principles" },
    { source: "projects", target: "spirit-care" },
    { source: "projects", target: "earth-care" },
    { source: "projects", target: "standards" },
    { source: "projects", target: "clients" },
    { source: "projects", target: "smouha-gate" },
    { source: "projects", target: "heliopolis-plaza" },
    { source: "projects", target: "new-capital" },
    { source: "projects", target: "zamalek-loft" },
    { source: "projects", target: "sahel-resort" },
    { source: "projects", target: "korba-tower" },

    { source: "design-studio", target: "tech-studio" },
    { source: "design-studio", target: "opet" },
    { source: "design-studio", target: "people" },
    { source: "design-studio", target: "metatut-pavilion" },
    { source: "design-studio", target: "abdelrahman-soliman" },
    { source: "design-studio", target: "adel-khaled" },
    { source: "design-studio", target: "karim-abdelrehim" },

    { source: "principles", target: "human-scale" },
    { source: "principles", target: "shade-water" },
    { source: "principles", target: "local-materials" },
    { source: "principles", target: "spirit-care" },
    { source: "principles", target: "earth-care" },

    { source: "standards", target: "sustainability" },
    { source: "standards", target: "local-materials" },
    { source: "standards", target: "korba-tower" },

    { source: "skills", target: "parametric" },
    { source: "skills", target: "grasshopper" },
    { source: "skills", target: "rhino" },
    { source: "skills", target: "unreal" },
    { source: "skills", target: "slam" },
    { source: "skills", target: "opet" },
    { source: "skills", target: "design-studio" },

    { source: "clients", target: "palm-hills" },
    { source: "clients", target: "nuca" },
    { source: "clients", target: "new-capital" },
    { source: "clients", target: "sahel-resort" },

    { source: "studios", target: "design-studio" },
    { source: "studios", target: "tech-studio" },
    { source: "studios", target: "opet" },

    { source: "opet", target: "unreal" },
    { source: "opet", target: "slam" },
    { source: "opet", target: "metatut-pavilion" },

    { source: "earth-care", target: "shade-water" },
    { source: "earth-care", target: "sustainability" },
    { source: "earth-care", target: "local-materials" },

    { source: "spirit-care", target: "human-scale" },
    { source: "spirit-care", target: "metatut-pavilion" },
    { source: "spirit-care", target: "design-studio" }
  ];

  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>(initialEdges);
  const activeDragNode = useRef<Node | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = containerRef.current?.offsetWidth || 900);
    let height = (canvas.height = 580);

    const centerX = width / 2;
    const centerY = height / 2;

    // Initialize nodes with circular distribution around center
    nodesRef.current = initialNodesData.map((data, index) => {
      const angle = (index / initialNodesData.length) * Math.PI * 2;
      const dist = 100 + Math.random() * 150;
      return {
        ...data,
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
      };
    });

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      width = canvas.width = containerRef.current.offsetWidth;
      height = canvas.height = 580;
    };
    window.addEventListener("resize", handleResize);

    // Physics Force Simulation Loop
    const runPhysics = () => {
      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // 1. Repulsion between all nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy) || 1;
          const minDist = n1.radius + n2.radius + 45;

          if (dist < minDist) {
            const force = ((minDist - dist) / dist) * 0.08;
            const fx = dx * force;
            const fy = dy * force;
            if (!n1.isDragging) {
              n1.x -= fx;
              n1.y -= fy;
            }
            if (!n2.isDragging) {
              n2.x += fx;
              n2.y += fy;
            }
          }
        }
      }

      // 2. Spring attraction along edges
      edges.forEach((edge) => {
        const source = nodes.find((n) => n.id === edge.source);
        const target = nodes.find((n) => n.id === edge.target);
        if (source && target) {
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const dist = Math.hypot(dx, dy) || 1;
          const desiredDist = 90;
          const force = (dist - desiredDist) * 0.003;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          if (!source.isDragging) {
            source.x += fx;
            source.y += fy;
          }
          if (!target.isDragging) {
            target.x -= fx;
            target.y -= fy;
          }
        }
      });

      // 3. Central gravity & Boundary damping
      nodes.forEach((n) => {
        if (!n.isDragging) {
          n.x += (centerX - n.x) * 0.0006;
          n.y += (centerY - n.y) * 0.0006;

          n.x += n.vx;
          n.y += n.vy;

          n.vx *= 0.98;
          n.vy *= 0.98;

          // Keep in bounds
          n.x = Math.max(n.radius + 10, Math.min(width - n.radius - 10, n.x));
          n.y = Math.max(n.radius + 10, Math.min(height - n.radius - 10, n.y));
        }
      });
    };

    // Main Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      runPhysics();

      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // Dark Obsidian radial background vignette
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, width / 1.2);
      bgGrad.addColorStop(0, "#1c1c24");
      bgGrad.addColorStop(1, "#0d0d12");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Faint central aura circle
      ctx.strokeStyle = "rgba(227, 6, 19, 0.08)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, width * 0.35, height * 0.38, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Render Edges
      edges.forEach((edge) => {
        const source = nodes.find((n) => n.id === edge.source);
        const target = nodes.find((n) => n.id === edge.target);
        if (!source || !target) return;

        const isHighlighted =
          hoveredNode === source.id || hoveredNode === target.id;

        ctx.strokeStyle = isHighlighted
          ? "rgba(227, 6, 19, 0.75)"
          : "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = isHighlighted ? 2 : 0.8;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      });

      // Render Nodes
      nodes.forEach((n) => {
        const isHovered = hoveredNode === n.id;
        const isConnected =
          hoveredNode &&
          edges.some(
            (e) =>
              (e.source === hoveredNode && e.target === n.id) ||
              (e.target === hoveredNode && e.source === n.id)
          );

        const currentRadius = isHovered ? n.radius + 3 : n.radius;
        const currentOpacity =
          !hoveredNode || isHovered || isConnected ? 1 : 0.35;

        ctx.save();
        ctx.globalAlpha = currentOpacity;

        // Outer Glow Ring for main hubs
        if (n.category === "hub" || n.category === "principle" || isHovered) {
          ctx.shadowColor = n.color;
          ctx.shadowBlur = isHovered ? 25 : 12;
        }

        // Fill Node Circle
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Node Border Line
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();

        ctx.restore();

        // Render Label Text
        ctx.save();
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.9)";
        ctx.font = isHovered
          ? `800 ${Math.max(12, n.radius * 0.75)}px 'Inter', sans-serif`
          : `600 ${Math.max(10, n.radius * 0.65)}px 'Inter', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Drop shadow for high contrast readable text
        ctx.shadowColor = "#000000";
        ctx.shadowBlur = 4;

        ctx.fillText(n.label, n.x, n.y + n.radius + 12);
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [hoveredNode]);

  // Pointer interactions for dragging and hovering
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const clicked = nodesRef.current.find((n) => {
      const dist = Math.hypot(n.x - px, n.y - py);
      return dist <= n.radius + 8;
    });

    if (clicked) {
      clicked.isDragging = true;
      activeDragNode.current = clicked;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    if (activeDragNode.current) {
      activeDragNode.current.x = px;
      activeDragNode.current.y = py;
    } else {
      const hovered = nodesRef.current.find((n) => {
        const dist = Math.hypot(n.x - px, n.y - py);
        return dist <= n.radius + 8;
      });
      setHoveredNode(hovered ? hovered.id : null);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activeDragNode.current) {
      activeDragNode.current.isDragging = false;
      activeDragNode.current = null;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  return (
    <div className={styles.graphWrapper} ref={containerRef}>
      <div className={styles.graphHeader}>
        <div className={styles.titleBadge}>
          <span className={styles.pulseDot} />
          <span>{language === "ar" ? "شجرة المعرفة التفاعلية" : "OBSIDIAN KNOWLEDGE GRAPH"}</span>
        </div>
        <h3 className={styles.graphSubheading}>
          {language === "ar"
            ? "شبكة العلاقات التفاعلية لرؤية كيو ب وفلسفة Spirit Care"
            : "Interactive Neural Map of CUBE's Philosophy & Ecosystem"}
        </h3>
      </div>

      <div className={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className={styles.graphCanvas}
        />
        
        {/* Interactive Controls Overlay Legend */}
        <div className={styles.graphLegend}>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "#e30613" }} />
            <span>{language === "ar" ? "المبادئ والمشاريع" : "Projects & Hubs"}</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "#ffd700" }} />
            <span>{language === "ar" ? "رعاية الروح (Spirit Care)" : "Spirit & People Care"}</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "#4caf50" }} />
            <span>{language === "ar" ? "رعاية الأرض (Earth Care)" : "Earth Care & Nature"}</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "#2196f3" }} />
            <span>{language === "ar" ? "التقنيات والمهارات" : "Tech & Skills"}</span>
          </div>
        </div>
        
        <div className={styles.hintBadge}>
          💡 {language === "ar" ? "انقر واسحب أي عقدة لتحريك الشبكة" : "Drag nodes to interact with the graph"}
        </div>
      </div>
    </div>
  );
}
