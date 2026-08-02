"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ReactLenis } from "lenis/react";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./page.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const N = 12; // Number of horizontal sections for morphing

function MissionVisual({ id }: { id: string }) {
  if (id === "smart-city") {
    return (
      <svg viewBox="0 0 200 200" className={styles.visualSvg}>
        <defs>
          <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C00000" stopOpacity="0" />
            <stop offset="50%" stopColor="#FF3B3B" stopOpacity="1" />
            <stop offset="100%" stopColor="#C00000" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="180" height="180" fill="none" stroke="rgba(192, 0, 0, 0.15)" strokeWidth="1" />
        <path d="M 20,40 L 180,40 M 20,100 L 180,100 M 20,160 L 180,160 M 40,20 L 40,180 M 100,20 L 100,180 M 160,20 L 160,180" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
        <circle r="3.5" fill="#FF3B3B">
          <animateMotion dur="4s" repeatCount="indefinite" path="M 20,40 L 180,40" />
        </circle>
        <circle r="3.5" fill="#ffffff">
          <animateMotion dur="5.5s" repeatCount="indefinite" path="M 160,20 L 160,180" />
        </circle>
        <circle r="3.5" fill="#FF3B3B">
          <animateMotion dur="3s" repeatCount="indefinite" path="M 20,100 L 180,100" />
        </circle>
        <circle r="3.5" fill="#ffffff">
          <animateMotion dur="4.5s" repeatCount="indefinite" path="M 100,180 L 100,20" />
        </circle>
        <circle r="3.5" fill="#FF3B3B">
          <animateMotion dur="6s" repeatCount="indefinite" path="M 40,20 L 40,180" />
        </circle>
      </svg>
    );
  }
  if (id === "commercial-tower") {
    return (
      <svg viewBox="0 0 200 200" className={styles.visualSvg}>
        <g transform="translate(100, 100)">
          <g className={styles.rotateTower}>
            {[-60, -30, 0, 30, 60].map((y, idx) => (
              <ellipse 
                key={idx} 
                cx="0" 
                cy={y} 
                rx={45 - Math.abs(y)*0.35} 
                ry={12} 
                fill="none" 
                stroke={idx % 2 === 0 ? "#C00000" : "rgba(255,255,255,0.6)"} 
                strokeWidth="1.2" 
                strokeDasharray={idx % 2 === 0 ? "none" : "3,2"}
              />
            ))}
            <line x1="-42" y1="-60" x2="-24" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            <line x1="42" y1="-60" x2="24" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            <line x1="0" y1="-70" x2="0" y2="70" stroke="#C00000" strokeWidth="0.5" strokeDasharray="4,4" />
          </g>
        </g>
      </svg>
    );
  }
  if (id === "educational-campus") {
    return (
      <svg viewBox="0 0 200 200" className={styles.visualSvg}>
        <rect x="10" y="10" width="180" height="180" fill="none" stroke="rgba(192, 0, 0, 0.15)" strokeWidth="1" />
        <g transform="translate(100, 100)">
          {/* Concentric rings representing educational hubs */}
          <circle cx="0" cy="0" r="50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="30" fill="none" stroke="#C00000" strokeWidth="1.2" strokeDasharray="5,3" className={styles.pulseRadar} />
          
          {/* Main campus shield / center node */}
          <polygon points="0,-18 16,-6 10,14 -10,14 -16,-6" fill="none" stroke="#ffffff" strokeWidth="1.8" />
          
          {/* Dynamic star nodes orbiting */}
          <g className={styles.rotateTower}>
            <circle cx="0" cy="-50" r="4.5" fill="#FF3B3B" />
            <circle cx="-43" cy="25" r="4" fill="#ffffff" />
            <circle cx="43" cy="25" r="4" fill="#ffffff" />
          </g>
          
          {/* Radiating learning rays */}
          <line x1="0" y1="-18" x2="0" y2="-50" stroke="#C00000" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="-16" y1="-6" x2="-43" y2="25" stroke="#C00000" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="16" y1="-6" x2="43" y2="25" stroke="#C00000" strokeWidth="1" strokeDasharray="3,3" />
        </g>
      </svg>
    );
  }
  if (id === "hospitality") {
    return (
      <svg viewBox="0 0 200 200" className={styles.visualSvg}>
        <rect x="10" y="10" width="180" height="180" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <circle cx="100" cy="100" r="30" fill="none" stroke="#C00000" strokeWidth="1.5" strokeDasharray="5,3" className={styles.pulseRadar} />
        <path d="M 20,150 Q 50,110 90,140 T 180,125" fill="none" stroke="#ffffff" strokeWidth="1.2" />
        <path d="M 20,130 Q 60,95 100,120 T 180,105" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        <path d="M 20,110 Q 70,75 110,100 T 180,85" fill="none" stroke="#C00000" strokeWidth="1" />
        <line x1="100" y1="20" x2="100" y2="55" stroke="#FF3B3B" strokeWidth="1.8" className={styles.sunRay} />
        <line x1="100" y1="20" x2="65" y2="40" stroke="#FF3B3B" strokeWidth="1" className={styles.sunRay} />
        <line x1="100" y1="20" x2="135" y2="40" stroke="#FF3B3B" strokeWidth="1" className={styles.sunRay} />
      </svg>
    );
  }
  if (id === "industrial") {
    return (
      <svg viewBox="0 0 200 200" className={styles.visualSvg}>
        <g transform="translate(100, 80)" className={styles.rotateGear}>
          <circle cx="0" cy="0" r="28" fill="none" stroke="#C00000" strokeWidth="2.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => (
            <rect 
              key={idx} 
              x="-4" 
              y="-35" 
              width="8" 
              height="8" 
              fill="#C00000" 
              transform={`rotate(${deg})`} 
            />
          ))}
          <circle cx="0" cy="0" r="8" fill="none" stroke="#C00000" strokeWidth="1" />
        </g>
        <path d="M 25,145 L 175,145" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="6,8" className={styles.conveyorFlow} />
        <circle cx="25" cy="145" r="4" fill="#C00000" />
        <circle cx="175" cy="145" r="4" fill="#C00000" />
      </svg>
    );
  }
  if (id === "sustainable-community") {
    return (
      <svg viewBox="0 0 200 200" className={styles.visualSvg}>
        <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <circle cx="100" cy="100" r="35" fill="none" stroke="rgba(192, 0, 0, 0.15)" strokeWidth="1" />
        <g transform="translate(100, 100)">
          <line x1="0" y1="0" x2="0" y2="40" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <g className={styles.rotateTurbine}>
            <circle cx="0" cy="0" r="5" fill="#C00000" />
            <path d="M 0,0 L 0,-32" stroke="#C00000" strokeWidth="2" strokeLinecap="round" />
            <path d="M 0,0 L -27,15" stroke="#C00000" strokeWidth="2" strokeLinecap="round" />
            <path d="M 0,0 L 27,15" stroke="#C00000" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    );
  }
  if (id === "urban-development") {
    return (
      <svg viewBox="0 0 200 200" className={styles.visualSvg}>
        <rect x="10" y="10" width="180" height="180" fill="none" stroke="rgba(192, 0, 0, 0.15)" strokeWidth="1" />
        <g transform="translate(100, 100)">
          {/* Radial grid circles */}
          <circle cx="0" cy="0" r="60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <circle cx="0" cy="0" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,4" />
          <circle cx="0" cy="0" r="20" fill="none" stroke="#C00000" strokeWidth="1" />
          
          {/* Connecting regional lines */}
          <line x1="-60" y1="0" x2="60" y2="0" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
          <line x1="0" y1="-60" x2="0" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
          <line x1="-42" y1="-42" x2="42" y2="42" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="42" y1="-42" x2="-42" y2="42" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3" />
          
          {/* Nodes / Buildings */}
          <circle cx="-40" cy="-20" r="6" fill="#C00000" className={styles.pulseRadar} />
          <circle cx="40" cy="20" r="6" fill="#C00000" className={styles.pulseRadar} />
          <circle cx="-20" cy="40" r="5" fill="#ffffff" />
          <circle cx="20" cy="-40" r="5" fill="#ffffff" />
          
          {/* Urban blocks */}
          <rect x="-55" y="-55" width="12" height="12" fill="none" stroke="#C00000" strokeWidth="1" />
          <rect x="43" y="-55" width="12" height="12" fill="none" stroke="#C00000" strokeWidth="1" />
          <rect x="-55" y="43" width="12" height="12" fill="none" stroke="#C00000" strokeWidth="1" />
          <rect x="43" y="43" width="12" height="12" fill="none" stroke="#C00000" strokeWidth="1" />
        </g>
      </svg>
    );
  }
  return null;
}

function getStepExplanation(missionId: string, step: string): string {
  const dataset: Record<string, Record<string, string>> = {
    "smart-city": {
      "City Data": "Ingesting real-time IoT feeds, municipal databases, and environmental sensors to construct a unified telemetry grid.",
      "GIS Analysis": "Mapping geography, contours, and physical features to build the baseline site boundary using ArcGIS AI datasets.",
      "Traffic Simulation": "Analyzing pedestrian and automotive velocities (PTV Vissim/SUMO) to detect bottle-necks and layout issues.",
      "Population Prediction": "Forecasting multi-decade community growth curves and demographic spatial densities using neural nets.",
      "Energy Analysis": "Evaluating neighborhood heating and cooling loads along with microgrid electricity distribution metrics.",
      "Environmental Impact": "Running local heat island, wind tunnel, and carbon footprint predictions over the conceptual layouts.",
      "Infrastructure Optimization": "Using genetic algorithms to optimize water routing, utility hubs, and waste management nodes.",
      "AI Recommendations": "Leveraging deep learning to propose design changes maximizing comfort, transit, and sustainability."
    },
    "commercial-tower": {
      "Site Analysis": "Evaluating zoning regulations, solar pathings, and surrounding tower heights to optimize mass potential.",
      "Building Massing": "Synthesizing early structural shapes to maximize rentable area and structural wind dynamics.",
      "Generative Design": "Iterating thousands of layout configurations based on parametric floorplans, heights, and orientations.",
      "Structural Analysis": "Testing load paths, seismic shear walls, and core placements through automated finite element checks.",
      "MEP Coordination": "AI clash detection modeling ventilation ducts, electrical cable trays, and plumbing networks inside Revit.",
      "Energy Optimization": "Simulating high-performance facades, solar shading angles, and thermal envelope requirements.",
      "Rendering": "Converting building wireframes into photorealistic immersive materials and lights using AI render pipelines.",
      "Construction Documents": "Extracting automated quantity take-offs, detail drawing sheets, and schedule sheets directly from BIM data."
    },
    "educational-campus": {
      "Educational Vision": "Defining academic programming, curriculum needs, enrollment goals, and spatial planning guidelines.",
      "Site Analysis": "Evaluating campus boundaries, zoning regulations, solar pathings, and surrounding terrain assets.",
      "Campus Master Planning": "Synthesizing building layouts, open plazas, landscape routes, and traffic interfaces.",
      "Academic Space Planning": "Optimizing lecture halls, classrooms, laboratories, and study zones for high utilization.",
      "Student Flow Simulation": "Simulating pedestrian patterns, class change traffic grids, and queue bottleneck zones.",
      "Sustainability": "Modeling passive energy systems, daylight optimization, solar panels, and LCA footprints.",
      "Safety Planning": "Simulating emergency fire evacuations, clear signage routing, and secure security boundaries.",
      "Digital Twin": "Linking actual campus IoT telemetry (room occupation, HVAC, lights) to a real-time virtual mesh.",
      "Smart Campus Operations": "Scheduling predictive building maintenance and class space schedules based on occupancy logs."
    },
    "hospitality": {
      "Site Analysis": "Mapping shoreline views, solar orientations, acoustic pathways, and natural topography assets.",
      "Concept Design": "Synthesizing local cultural motifs and organic geometry forms into premium resort layouts.",
      "Guest Experience": "Optimizing spatial transitions from lobby to villas, ensuring premium privacy and fluid circulations.",
      "Landscape": "Designing exterior pools, green hills, and pathways matching native ecosystem microclimates.",
      "Energy Optimization": "Coordinating natural cross-ventilations, solar water heaters, and smart room occupancy switches.",
      "Operations": "Optimizing backend service tunnels, laundry routing, and kitchen-to-guest circulation vectors.",
      "Marketing Visualization": "Generating cinematic luxury rendering materials and walk-throughs to showcase the guest experience."
    },
    "industrial": {
      "Factory Layout": "Optimizing production line machinery layout to minimize material transfer times.",
      "Production Simulation": "Simulating manufacturing cycles and bottleneck states under varying supply loads.",
      "Logistics": "Coordinating autonomous automated guided vehicles (AGVs) and warehouse storage layouts.",
      "Robot Optimization": "Programming robot arm paths to maximize mechanical safety and cycles per hour.",
      "Energy Monitoring": "Tracking massive assembly line motors, high-heat furnaces, and central HVAC load curves.",
      "Predictive Maintenance": "Detecting early mechanical vibration variations to schedule repairs before failure.",
      "Digital Twin": "Generating live unified factory floor wireframes syncing actual production velocities."
    },
    "sustainable-community": {
      "Climate Analysis": "Ingesting historical wind, humidity, and sun tracking profiles to define passive solar design angles.",
      "Solar Analysis": "Mapping photovoltaic potential, building shadows, and solar heat radiation values.",
      "Wind Simulation": "Evaluating pedestrian wind comfort and building airflow velocities using digital wind tunnels.",
      "Carbon Analysis": "Performing automated life cycle assessments (LCA) to compute total embodied carbon values.",
      "Water Management": "Sizing bioswales, rainwater harvesters, greywater recycling loops, and flood path basins.",
      "Energy Optimization": "Integrating geothermal heating, passive solar designs, and smart microgrids.",
      "Smart Community": "Establishing community-level sharing metrics for energy, electric transit, and urban farming."
    },
    "urban-development": {
      "Regional Analysis": "Evaluating regional economic data, environmental layouts, and spatial connections to contextualize development.",
      "Land Use Planning": "Optimizing zoning, land allocations, and density ratios to balance growth and community needs.",
      "Mobility & Transportation": "Simulating vehicular transit, public transit routing, and pedestrian safety pathways.",
      "Infrastructure Planning": "Designing utility networks, stormwater management routes, and energy grid models.",
      "Environmental Impact": "Assessing heat island patterns, storm hazards, carbon offsets, and solar radiation profiles.",
      "Urban Design": "Drafting detailed block dimensions, heights, and parametric mass arrangements.",
      "Public Realm": "Optimizing public squares, streetscapes, parks, and accessibility zones for community engagement.",
      "Smart Growth Strategy": "Deploying generative parameters to establish long-term economic, ecological, and transit milestones."
    }
  };
  return dataset[missionId]?.[step] || "Advanced cognitive pipeline optimization step.";
}

function getToolExplanation(tool: string): string {
  const toolsList: Record<string, string> = {
    "ArcGIS AI": "AI-driven GIS platform mapping municipal layouts and large-scale topography.",
    "QGIS AI plugins": "Open-source geospatial processing with machine learning terrain classification.",
    "Google Earth Engine": "Cloud computation for satellite imaging and regional environmental analysis.",
    "PTV Vissim": "Advanced traffic planning simulator modeling agent-based vehicle flows.",
    "SUMO": "Simulation of Urban MObility modeling microscopic traffic networks.",
    "Autodesk Forma": "Generative cloud BIM scoring solar, wind, noise, and microclimate variables.",
    "Finch3D": "Parametric layout generator optimization for floorplans and mass designs.",
    "ChatGPT": "Large language model analyzing regulatory scripts, briefs, and documentation.",
    "Claude": "Advanced reasoning model writing complex structural scripts and parameters.",
    "NotebookLM": "Localized database assistant matching project requirements to structural codes.",
    "Unreal Engine": "Cinematic visual telemetry rendering cities and buildings in real-time.",
    "Twinmotion": "Real-time immersive visualization syncing high-fidelity asset animations.",
    "Cesium": "3D geospatial rendering engine streaming planetary terrain tiles.",
    "Revit + Copilot": "Generative parametric drafting automating structural components.",
    "D5 Render AI": "AI-accelerated raytracing engine rendering photorealistic building scenes.",
    "Lumion AI": "Landscape and architecture rendering engine emphasizing foliage and atmosphere.",
    "Midjourney": "Image generator producing conceptual materials and aesthetic inspiration.",
    "Adobe Firefly": "Generative texture and graphic tool for building surfaces.",
    "Autodesk Construction Cloud": "Unified construction platform tracking MEP submittals and issues.",
    "AnyLogic": "Multimethod simulation modeling hospital workflows and logistics.",
    "Azure Digital Twins": "IoT integration platform linking physical buildings to database twins.",
    "YOLO": "Real-time computer vision identifying safety gear and tracking site footfalls.",
    "Rhino + Grasshopper": "Parametric modeling studio generating complex curvilinear shapes.",
    "Siemens Tecnomatix": "Industrial engineering platform simulation digital production.",
    "FlexSim": "3D simulation engine modeling warehouse layouts and logistics.",
    "NVIDIA Isaac": "Robot simulation platform training autonomous vehicles and arms.",
    "NVIDIA Omniverse": "Real-time virtual collaboration space syncing multiple 3D files.",
    "Cove.tool": "Building performance analysis tracking solar, daylight, and energy usage.",
    "One Click LCA": "Automated carbon calculator measuring total embodied building emissions.",
    "Ladybug Tools": "Rhino/Grasshopper plugins simulating environmental solar, wind, and radiation.",
    "ArcGIS": "AI-driven GIS platform mapping municipal layouts and large-scale topography.",
    "CityEngine": "Procedural modeling software generating large-scale interactive 3D urban environments.",
    "QGIS": "Open-source geographic information system software mapping and analyzing spatial data.",
    "Power BI": "Business intelligence dashboard analyzing municipal and demographic metrics.",
    "Bentley iTwin": "Geospatial digital twin framework mapping civil and building infrastructure.",
    "MassMotion": "Pedestrian simulation and crowd flow analysis modeling human behaviors.",
    "Autodesk Insight": "Building performance analysis integrating energy, heating, and cooling calculations."
  };
  return toolsList[tool] || "Cognitive tool integrated into CUBE's neural AI pipeline.";
}

export default function AiLabPage() {
  const { t } = useLanguage();
  const [showIntro, setShowIntro] = useState(true);
  const [isEntering, setIsEntering] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showIntro) return;

    const attemptPlay = async () => {
      try {
        video.muted = false;
        setIsMuted(false);
        await video.play();
      } catch (err) {
        // Unmuted playback blocked, retry muted
        video.muted = true;
        setIsMuted(true);
        try {
          await video.play();
        } catch (innerErr) {
          console.warn("AI Lab muted playback blocked:", innerErr);
        }
      }
    };

    attemptPlay();
  }, [showIntro]);

  // AI OS Phases: 'welcome' | 'mission' | 'thinking' | 'workspace'
  const [osPhase, setOsPhase] = useState<"welcome" | "mission" | "thinking" | "workspace">("welcome");
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [briefingMission, setBriefingMission] = useState<any | null>(null);

  // Typewriter states
  const [typewriterLines, setTypewriterLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTypewriterDone, setIsTypewriterDone] = useState(false);

  // Storytelling scroll progress
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const [aboutScrollProgress, setAboutScrollProgress] = useState(0);

  // Interactive Skyscraper state
  const [twinTab, setTwinTab] = useState("Structure");
  const [rotationAngle, setRotationAngle] = useState(0);

  // AI Lab click environment details
  const [activeLabRoom, setActiveLabRoom] = useState<string | null>(null);

  // City mesh rotation angle
  const [cityRotation, setCityRotation] = useState(0);
  const [isDay, setIsDay] = useState(true);

  // Dashboard counter states
  const [dbStats, setDbStats] = useState({
    optimized: 1420,
    simulated: 3840,
    accuracy: 99.2,
    carbon: 41.5,
    energy: 52,
    traffic: 78
  });

  // Timeline scroll container ref
  const timelineRef = useRef<HTMLDivElement>(null);

  // Canvas background simulation
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Thinking state progress line logs
  const [thinkingLogIdx, setThinkingLogIdx] = useState(0);
  const thinkingLogs = [
    "Analyzing Site Topology...",
    "Understanding Context Grid...",
    "Optimizing Structural Layout...",
    "Generating Conceptual Options...",
    "Running Carbon & HVAC Simulations..."
  ];

  const handleDismissIntro = () => {
    setIsEntering(true);
    setTimeout(() => {
      setShowIntro(false);
      setIsEntering(false);
    }, 850);
  };

  // Canvas backdrop loop
  useEffect(() => {
    if (showIntro || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 75; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.45 + 0.15
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render futuristic digital grid lines (grid background)
      ctx.strokeStyle = "rgba(192, 0, 0, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 70;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render connected neural network particles
      ctx.fillStyle = "rgba(192, 0, 0, 0.4)";
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Boundary checks
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = `rgba(192, 0, 0, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.15;
            ctx.strokeStyle = `rgba(192, 0, 0, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showIntro]);

  // Section 1: Typewriter script effect
  useEffect(() => {
    if (showIntro || osPhase !== "welcome") return;

    const lines = [
      "Welcome.",
      "Initializing CUBE Intelligence...",
      "Identity Confirmed.",
      "What would you like to build today?"
    ];

    const typingAudio = new Audio("/assets/mixkit-electronic-typing-1397.wav");
    typingAudio.loop = true;
    typingAudio.volume = 0.35;

    let currentText = "";
    let charIdx = 0;
    let timer: NodeJS.Timeout;

    const typeChar = () => {
      if (charIdx < lines[currentLineIndex].length) {
        if (charIdx === 0) {
          typingAudio.currentTime = 0;
          typingAudio.play().catch((e) => console.warn("Audio autoplay policy check:", e));
        }

        currentText += lines[currentLineIndex][charIdx];
        setTypedText(currentText);
        charIdx++;
        timer = setTimeout(typeChar, 45); // Typing speed
      } else {
        // Line fully typed
        typingAudio.pause();
        setTimeout(() => {
          if (currentLineIndex < lines.length - 1) {
            setTypewriterLines((prev) => [...prev, currentText]);
            setTypedText("");
            currentText = "";
            charIdx = 0;
            setCurrentLineIndex((prev) => prev + 1);
          } else {
            setIsTypewriterDone(true);
          }
        }, 800); // Delay between lines
      }
    };

    timer = setTimeout(typeChar, 300);

    return () => {
      clearTimeout(timer);
      typingAudio.pause();
    };
  }, [showIntro, osPhase, currentLineIndex]);

  // Transition from Mission selection to Thinking loop
  const handleMissionSelect = (mission: string) => {
    setSelectedMission(mission);
    setOsPhase("thinking");

    // Cycle thinking text status logs
    let currentLog = 0;
    const interval = setInterval(() => {
      currentLog++;
      if (currentLog < thinkingLogs.length) {
        setThinkingLogIdx(currentLog);
      } else {
        clearInterval(interval);
        setOsPhase("workspace");
      }
    }, 800);
  };

  // Scroll triggers setup inside Phase 4: Command Center workspace
  useEffect(() => {
    if (osPhase !== "workspace") return;

    // Section 4: Blueprint morphing trigger
    if (aboutSectionRef.current) {
      ScrollTrigger.create({
        trigger: aboutSectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          setAboutScrollProgress(self.progress);
        }
      });
    }

    // Section 8: Horizontal timeline slider
    if (timelineRef.current) {
      const pinTimeline = ScrollTrigger.create({
        trigger: `.${styles.timelineSection}`,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
        animation: gsap.to(timelineRef.current, {
          x: () => -(timelineRef.current!.scrollWidth - window.innerWidth + 100),
          ease: "none"
        })
      });

      return () => {
        pinTimeline.kill();
      };
    }
  }, [osPhase]);

  // Dynamic values updating for Dashboard logs and city rotation angles
  useEffect(() => {
    if (osPhase !== "workspace") return;

    const interval = setInterval(() => {
      setDbStats((prev) => ({
        optimized: prev.optimized + (Math.random() > 0.7 ? 1 : 0),
        simulated: prev.simulated + (Math.random() > 0.6 ? 2 : 0),
        accuracy: +(99.2 + Math.sin(Date.now() / 10000) * 0.1).toFixed(1),
        carbon: +(41.5 + Math.cos(Date.now() / 8000) * 0.3).toFixed(1),
        energy: prev.energy,
        traffic: +(78 + Math.sin(Date.now() / 5000) * 5).toFixed(0)
      }));
      setRotationAngle((prev) => (prev + 1.2) % 360);
      setCityRotation((prev) => (prev + 0.8) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, [osPhase]);

  // City Day/Night cycle
  useEffect(() => {
    if (osPhase !== "workspace") return;
    const interval = setInterval(() => {
      setIsDay((prev) => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, [osPhase]);

  const missions = [
    { 
      id: "smart-city",
      name: "Smart City", 
      icon: "🏙",
      workflow: [
        "City Data", "GIS Analysis", "Traffic Simulation", "Population Prediction", 
        "Energy Analysis", "Environmental Impact", "Infrastructure Optimization", "AI Recommendations"
      ],
      tools: [
        "ArcGIS AI", "QGIS AI plugins", "Google Earth Engine", "PTV Vissim", "SUMO", 
        "Autodesk Forma", "Finch3D", "ChatGPT", "Claude", "NotebookLM", "Unreal Engine", 
        "Twinmotion", "Cesium"
      ],
      advice: "Learn GIS, urban planning, traffic simulation, sustainability, then apply AI."
    },
    { 
      id: "commercial-tower",
      name: "Commercial Tower", 
      icon: "🏢",
      workflow: [
        "Site Analysis", "Building Massing", "Generative Design", "Structural Analysis", 
        "MEP Coordination", "Energy Optimization", "Rendering", "Construction Documents"
      ],
      tools: [
        "Autodesk Forma", "Finch3D", "Revit + Copilot", "D5 Render AI", "Twinmotion", 
        "Lumion AI", "Midjourney", "Adobe Firefly", "Autodesk Construction Cloud"
      ],
      advice: "Master architecture fundamentals, BIM, structural systems and MEP before relying on AI."
    },
    { 
      id: "educational-campus",
      name: "Educational Campus", 
      icon: "🏫",
      workflow: [
        "Educational Vision", "Site Analysis", "Campus Master Planning", "Academic Space Planning", 
        "Student Flow Simulation", "Sustainability", "Safety Planning", "Digital Twin", "Smart Campus Operations"
      ],
      tools: [
        "Autodesk Forma", "ArcGIS", "Finch3D", "Revit", "Rhino + Grasshopper", "Cove.tool", "Ladybug Tools", 
        "Autodesk Insight", "AnyLogic", "MassMotion", "Bentley iTwin", "Azure Digital Twins", "NVIDIA Omniverse", "ChatGPT", "Claude", "Power BI"
      ],
      advice: "Learn educational design, campus planning, BIM, sustainability and simulation before AI."
    },
    { 
      id: "hospitality",
      name: "Hospitality", 
      icon: "🏨",
      workflow: [
        "Site Analysis", "Concept Design", "Guest Experience", "Landscape", 
        "Energy Optimization", "Operations", "Marketing Visualization"
      ],
      tools: [
        "Midjourney", "Adobe Firefly", "Autodesk Forma", "Rhino + Grasshopper", "D5 Render", "Unreal Engine"
      ],
      advice: "Learn architecture, landscape, interiors and guest experience before using AI tools."
    },
    { 
      id: "industrial",
      name: "Industrial", 
      icon: "⛓",
      workflow: [
        "Factory Layout", "Production Simulation", "Logistics", "Robot Optimization", 
        "Energy Monitoring", "Predictive Maintenance", "Digital Twin"
      ],
      tools: [
        "Siemens Tecnomatix", "FlexSim", "NVIDIA Isaac", "YOLO", "NVIDIA Omniverse"
      ],
      advice: "Learn industrial engineering, lean manufacturing, automation and robotics before AI."
    },
    { 
      id: "sustainable-community",
      name: "Sustainable Community", 
      icon: "🌿",
      workflow: [
        "Climate Analysis", "Solar Analysis", "Wind Simulation", "Carbon Analysis", 
        "Water Management", "Energy Optimization", "Smart Community"
      ],
      tools: [
        "Autodesk Forma", "Cove.tool", "One Click LCA", "Ladybug Tools", "ArcGIS"
      ],
      advice: "Understand climate, passive design, energy, water and carbon analysis before AI optimization."
    },
    { 
      id: "urban-development",
      name: "Urban Development", 
      icon: "🏙",
      workflow: [
        "Regional Analysis", "Land Use Planning", "Mobility & Transportation", "Infrastructure Planning", 
        "Environmental Impact", "Urban Design", "Public Realm", "Smart Growth Strategy"
      ],
      tools: [
        "ArcGIS", "Autodesk Forma", "CityEngine", "QGIS", "Google Earth Engine", "Rhino + Grasshopper", "Cesium", "Power BI", "ChatGPT", "Claude"
      ],
      advice: "Start with urban planning principles, zoning, GIS and mobility planning before using AI for city-scale decision making."
    }
  ];

  const labRooms = [
    { id: "01", name: "Generative Design", desc: "Instantly iterates optimal architectural structural forms." },
    { id: "02", name: "Digital Twins", desc: "Volumetric real-time telemetry syncing sensor data feeds." },
    { id: "03", name: "BIM Intelligence", desc: "Automates clash resolutions, details, and site scheduling." },
    { id: "04", name: "Computer Vision", desc: "Tracks site safety audits and construction progress streams." },
    { id: "05", name: "Predictive Analytics", desc: "Simulates environmental solar loads and layout scores." },
    { id: "06", name: "Sustainability Intelligence", desc: "Embodies life cycle emissions profiles and passive ventilation." }
  ];

  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.08 }}>
      <div className={styles.sandboxPage}>
        {showIntro ? (
          <div className={`${styles.introVideoContainer} ${isEntering ? styles.enter : ""}`}>
            <video
              ref={videoRef}
              src="/assets/magnific_there-is-text-in-the-imag_mCXxySShJQ.mp4"
              muted={isMuted}
              playsInline
              onEnded={handleDismissIntro}
              onClick={handleDismissIntro}
              className={styles.introVideo}
              preload="auto"
            />
            {/* Invisible hotspot mapping to the visual button in the video */}
            <div 
              className={styles.invisibleHotspot} 
              onClick={handleDismissIntro} 
              title="Click to Enter AI Lab"
            />
            <div className={styles.introControls}>
              <button 
                className={styles.soundToggleBtn} 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setIsMuted(!isMuted); 
                }}
                title={isMuted ? "Unmute Sound" : "Mute Sound"}
              >
                {isMuted ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM19 12c0 2.94-1.65 5.51-4 6.75v1.85c3.36-1.39 6-4.7 6-8.6s-2.64-7.21-6-8.6v1.85c2.35 1.24 4 3.81 4 6.75zM3 9v6h4l5 5V4L7 9H3z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 4L9.91 6.09 12 8.18V4zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.05-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-3.9-2.64-7.2-6-8.58v1.86c2.35 1.24 4 3.8 4 6.72zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v1.85c1.33-.31 2.53-.95 3.53-1.84L19.73 21 21 19.73 4.27 3zM12 11.82v6.27l-3.91-3.91H5v-4.09h3.91l3.09-3.09z" />
                  </svg>
                )}
              </button>
              <button className={styles.skipBtn} onClick={handleDismissIntro}>
                {t("Skip")}
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.operatingSystemLayout}>
            {/* Canvas grid background */}
            <canvas ref={canvasRef} className={styles.canvasBackground} />

            {/* PHASE 1: THE AI WELCOMES YOU */}
            {osPhase === "welcome" && (
              <div className={styles.welcomeContainer}>
                <div className={styles.welcomeBox}>
                  {typewriterLines.map((line, idx) => (
                    <div key={idx} className={styles.typewrittenLine}>
                      <span>{line}</span>
                    </div>
                  ))}
                  <div className={styles.typewrittenLine}>
                    <span>{typedText}</span>
                    <span className={styles.blinkingCursor}>_</span>
                  </div>

                  {isTypewriterDone && (
                    <button 
                      className={styles.welcomeEnterBtn} 
                      onClick={() => setOsPhase("mission")}
                    >
                      {t("ACCESS SYSTEM")}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* PHASE 2: CHOOSE YOUR MISSION */}
            {osPhase === "mission" && (
              <div className={styles.missionContainer}>
                <div className={styles.missionHeader}>
                  <span className={styles.hudPretitle}>// SYSTEM SELECTOR</span>
                  <h1>{t("CHOOSE YOUR MISSION")}</h1>
                  <p>{t("Select a dynamic target node to initialize layout concepts.")}</p>
                </div>

                <div className={styles.missionSplitLayout}>
                  {/* Left Column: GIF visual */}
                  <div className={styles.missionLeftVisual}>
                    <img 
                      src="/assets/2222-ezgif.com-crop.gif" 
                      alt="Neural Core HUD Interface" 
                      className={styles.neuralCoreGif}
                    />
                  </div>

                  {/* Right Column: Grid */}
                  <div className={styles.missionGrid}>
                    {missions.map((m) => (
                      <div 
                        key={m.name} 
                        className={styles.missionCard}
                        onClick={() => setBriefingMission(m)}
                      >
                        <span className={styles.missionIcon}>{m.icon}</span>
                        <h3>{t(m.name)}</h3>
                        <div className={styles.cardHoverDetails}>{t("VIEW BRIEFING ➔")}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {briefingMission && (
                  <div className={styles.dossierOverlay}>
                    <div className={styles.dossierPanel}>
                      <button className={styles.dossierCloseBtn} onClick={() => setBriefingMission(null)}>×</button>
                      
                      <div className={styles.dossierGrid}>
                        {/* Left: Animation and basic info */}
                        <div className={styles.dossierLeft}>
                          <div className={styles.visualAnimationContainer}>
                            <MissionVisual id={briefingMission.id} />
                            <div className={styles.visualScanner} />
                          </div>
                          <div className={styles.dossierMeta}>
                            <span className={styles.hudTag}>NODE: {briefingMission.id.toUpperCase()}</span>
                            <span className={styles.hudStatus}>PROTOCOL ACTIVE</span>
                          </div>
                        </div>

                        {/* Right: Detailed Workflow, tools, advice */}
                        <div className={styles.dossierRight}>
                          <span className={styles.dossierSectorLabel}>// MISSION SPECS</span>
                          <h2 className={styles.dossierTitle}>
                            <span className={styles.dossierIcon}>{briefingMission.icon}</span> {t(briefingMission.name)}
                          </h2>
                          
                          <div className={styles.dossierSection}>
                            <h4>{t("WORKFLOW PIPELINE")}</h4>
                            <div className={styles.workflowSteps}>
                              {briefingMission.workflow.map((step: string, sIdx: number) => (
                                <div key={sIdx} className={styles.workflowStepItem}>
                                  <span className={styles.stepNum}>{String(sIdx + 1).padStart(2, '0')}</span>
                                  <span className={styles.stepName}>{t(step)}</span>
                                  {sIdx < briefingMission.workflow.length - 1 && <span className={styles.stepArrow}>➔</span>}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className={styles.dossierSection}>
                            <h4>{t("COGNITIVE AI TOOLS")}</h4>
                            <div className={styles.toolsGrid}>
                              {briefingMission.tools.map((tool: string, tIdx: number) => (
                                <span key={tIdx} className={styles.toolBadge}>{tool}</span>
                              ))}
                            </div>
                          </div>

                          <div className={styles.dossierSection}>
                            <h4>{t("BEGINNER ADVISORY")}</h4>
                            <p className={styles.adviceText}>{t(briefingMission.advice)}</p>
                          </div>

                          <button 
                            className={styles.dossierLaunchBtn}
                            onClick={() => {
                              handleMissionSelect(briefingMission.name);
                              setBriefingMission(null);
                            }}
                          >
                            {t("INITIALIZE PATHWAY")} ➔
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PHASE 3: AI THINKING */}
            {osPhase === "thinking" && (
              <div className={styles.thinkingContainer}>
                <div className={styles.neuralThinkingCore}>
                  <div className={styles.centralThinkingPulse}>
                    <div className={styles.introLogoBadge} style={{ cursor: 'default', animationDuration: '1.5s', padding: '16px' }}>
                      <Image
                        src="/logo-v4.png"
                        alt="CUBE Logo"
                        width={90}
                        height={90}
                        className={styles.introLogoImage}
                        priority
                      />
                    </div>
                  </div>
                  <div className={styles.thinkingProgressLog}>
                    <div className={styles.glowingLogText}>
                      {thinkingLogs[thinkingLogIdx]}
                    </div>
                    <div className={styles.sysProgressBar}>
                      <i style={{ width: `${(thinkingLogIdx + 1) * 20}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PHASE 4: COMMAND CENTER WORKSPACE */}
            {osPhase === "workspace" && (
              <div className={styles.osWorkspaceWrapper}>
                {/* Futuristic Dashboard Header */}
                <header className={styles.osHeader}>
                  <div className={styles.headerBrand}>
                    <div className={styles.brandLabels}>
                      <span className={styles.brandTitle}>CUBE AI OS</span>
                      <span className={styles.systemTag}>MISSION: {selectedMission?.toUpperCase()} // READY</span>
                    </div>
                  </div>
                  <div className={styles.statusDisplay}>
                    <span className={styles.pulseDot} />
                    <span className={styles.statusText}>CORE SYSTEM STATUS: ONLINE</span>
                  </div>
                  <button 
                    className={styles.osBackLink}
                    onClick={() => {
                      setOsPhase("welcome");
                      setTypewriterLines([]);
                      setCurrentLineIndex(0);
                      setTypedText("");
                      setIsTypewriterDone(false);
                    }}
                  >
                    {t("TERMINATE SESSION")}
                  </button>
                </header>

                {/* MISSION SPECIFICATION DETAILS Dossier Section */}
                <section className={styles.workspaceDossierSection}>
                  <div className={styles.workspaceDossierHeader}>
                    <span className={styles.hudPretitle}>// SYSTEM ARCHIVE // DOSSIER DECRYPTED</span>
                    <h2>{selectedMission?.toUpperCase()} // SPECIFICATION MATRIX</h2>
                  </div>

                  {(() => {
                    const currentMission = missions.find(m => m.name.toLowerCase() === selectedMission?.toLowerCase());
                    if (!currentMission) return null;
                    return (
                      <div className={styles.workspaceDossierGrid}>
                        {/* Column 1: Deep Workflow breakdown */}
                        <div className={styles.workspaceDossierCol}>
                          <h3 className={styles.colTitle}>{t("DETAILED WORKFLOW PROTOCOLS")}</h3>
                          <div className={styles.detailedWorkflowList}>
                            {currentMission.workflow.map((step, idx) => {
                              const explanation = getStepExplanation(currentMission.id, step);
                              return (
                                <div key={idx} className={styles.detailedWorkflowCard}>
                                  <div className={styles.stepHeader}>
                                    <span className={styles.detailedStepNum}>{String(idx+1).padStart(2, '0')}</span>
                                    <h4>{t(step)}</h4>
                                  </div>
                                  <p>{t(explanation)}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Column 2: Tool Integrations & Roadmaps */}
                        <div className={styles.workspaceDossierCol}>
                          {/* Sub-section: Tools Matrix */}
                          <div className={styles.workspaceDossierSubSec} style={{ marginBottom: '35px' }}>
                            <h3 className={styles.colTitle}>{t("AI TOOLSETS & COGNITIVE STACK")}</h3>
                            <div className={styles.detailedToolsGrid}>
                              {currentMission.tools.map((tool, idx) => {
                                const toolDesc = getToolExplanation(tool);
                                return (
                                  <div key={idx} className={styles.detailedToolCard}>
                                    <span className={styles.toolCardBadge}>{tool}</span>
                                    <p className={styles.toolCardDesc}>{t(toolDesc)}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Sub-section: Beginner Learning Roadmap */}
                          <div className={styles.workspaceDossierSubSec}>
                            <h3 className={styles.colTitle}>{t("LEARNING ROADMAP & ACADEMIC PROTOCOL")}</h3>
                            <div className={styles.detailedRoadmapCard}>
                              <div className={styles.roadmapHeader}>
                                <span className={styles.roadmapWarningIcon}>⚠️</span>
                                <h4>{t("BEGINNER DIRECTIVE")}</h4>
                              </div>
                              <p className={styles.roadmapWarningText}>{t(currentMission.advice)}</p>
                              
                              <div className={styles.roadmapSteps}>
                                <div className={styles.roadmapStep}>
                                  <h5>{t("PHASE 01: PRINCIPLES")}</h5>
                                  <p>{t("Establish core domain knowledge (structural limits, healthcare standards, urban data models) manually without digital assists.")}</p>
                                </div>
                                <div className={styles.roadmapStep}>
                                  <h5>{t("PHASE 02: BIM INTEGRATION")}</h5>
                                  <p>{t("Learn to translate manual concepts into coordinated BIM environments and database records.")}</p>
                                </div>
                                <div className={styles.roadmapStep}>
                                  <h5>{t("PHASE 03: COGNITIVE SYSTEM SYNCS")}</h5>
                                  <p>{t("Connect parametric algorithms, ML models and generative models to optimize performance, carbon profiles, and aesthetics.")}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </section>

                {/* System Footer */}
                <footer className={styles.systemFooter}>
                  <span>© {new Date().getFullYear()} CUBE OS // COGNITIVE LABS</span>
                  <span>SYSTEM ONLINE // LEVEL 04 PRIVILEGED ACCESS</span>
                </footer>
              </div>
            )}
          </div>
        )}
      </div>
    </ReactLenis>
  );
}
