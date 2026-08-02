"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import { projects } from "@/data/projects";
import { MOVIES, MOVIE_TIMESTAMPS, MOVIE_ALIASES } from "@/data/movies";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./page.module.css";

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const sectors = [
  "All",
  "Residential & Resorts",
  "Industrial & Infrastructure",
  "Towers & Offices",
  "Commercial & Retail",
  "Tourism & Mixed-Use",
  "Mixed-Use & Visions",
  "Culture & Education",
  "Public Buildings & Retail",
  "Urban Planning",
  "Egyptian Identity"
];

const regions = ["All", "Egypt", "KSA", "UAE", "Oman"];

const TECHNICAL_SLUGS = [
  "damietta-governorate",
  "sahara-international-school",
  "kemet-business-tower",
  "madar",
  "zomra-east",
  "boardwalk-2",
  "mada-residence",
  "skiv"
];

const TECHNICAL_SECTOR_MAP: Record<string, string> = {
  "damietta-governorate": "Governmental",
  "sahara-international-school": "Educational",
  "kemet-business-tower": "Commercial",
  "madar": "Commercial",
  "zomra-east": "Residential",
  "boardwalk-2": "Residential",
  "mada-residence": "Residential",
  "skiv": "Industrial"
};

const technicalSectors = [
  "All",
  "Governmental",
  "Educational",
  "Commercial",
  "Residential",
  "Industrial"
];

const years = ["All", ...Array.from(new Set(projects.map((p) => p.year))).filter(Boolean).sort((a, b) => b.localeCompare(a))];

function getSearchScore(project: any, query: string, t?: (key: string) => string): number {
  if (!query.trim()) return 1;

  let cleanQuery = query.toLowerCase();

  // Strip filler phrases and natural language queries
  const fillers = [
    "i want the projects that contain",
    "i want the projects with",
    "i want projects that contain",
    "i want projects with",
    "i want projects containing",
    "projects that contain",
    "projects containing",
    "projects with",
    "show me projects",
    "show me the",
    "show me",
    "find projects",
    "find the",
    "find",
    "search for",
    "looking for",
    "that contain",
    "that has",
    "that have",
    "which contain",
    "which has",
    "which have",
    "containing",
    "with a",
    "with"
  ];

  for (const filler of fillers) {
    cleanQuery = cleanQuery.replace(filler, " ");
  }

  // Tokenize
  const tokens = cleanQuery
    .split(/[\s,.-]+/)
    .map(t => t.trim())
    .filter(t => t.length > 1 && !["and", "the", "for", "that", "this", "contain", "contains"].includes(t));

  const translatedTitle = t ? t(project.title) : "";
  const translatedSummary = t ? t(project.summary) : "";
  const translatedDescription = t ? t(project.description) : "";
  const translatedSector = t ? t(project.sector) : "";
  const translatedLocation = t ? t(project.location) : "";

  const searchableText = [
    project.title || "",
    project.summary || "",
    project.description || "",
    project.sector || "",
    project.location || "",
    translatedTitle,
    translatedSummary,
    translatedDescription,
    translatedSector,
    translatedLocation
  ].join(" ").toLowerCase();

  if (tokens.length === 0) {
    const originalLower = query.toLowerCase().trim();
    if (!originalLower) return 1;
    if (!searchableText.includes(originalLower)) return 0;
    
    let score = 0;
    if (project.title && project.title.toLowerCase().includes(originalLower)) score += 10;
    if (project.summary && project.summary.toLowerCase().includes(originalLower)) score += 5;
    if (project.description && project.description.toLowerCase().includes(originalLower)) score += 3;
    if (project.sector && project.sector.toLowerCase().includes(originalLower)) score += 2;
    if (project.location && project.location.toLowerCase().includes(originalLower)) score += 2;
    return score;
  }

  // Enforce logical AND: project must contain all extracted tokens
  for (const token of tokens) {
    if (!searchableText.includes(token)) {
      return 0;
    }
  }

  let score = 0;

  // Boost exact phrase matches of the cleaned search
  const cleanedPhrase = tokens.join(" ");
  if (project.title && project.title.toLowerCase().includes(cleanedPhrase)) score += 50;
  if (project.summary && project.summary.toLowerCase().includes(cleanedPhrase)) score += 30;
  if (project.description && project.description.toLowerCase().includes(cleanedPhrase)) score += 20;

  for (const token of tokens) {
    if (project.title && project.title.toLowerCase().includes(token)) score += 10;
    if (project.summary && project.summary.toLowerCase().includes(token)) score += 5;
    if (project.description && project.description.toLowerCase().includes(token)) score += 3;
    if (project.sector && project.sector.toLowerCase().includes(token)) score += 2;
    if (project.location && project.location.toLowerCase().includes(token)) score += 2;
  }

  if (tokens.length > 1) {
    score += 15;
  }

  return score;
}export default function Projects() {
  const [activeView, setActiveView] = useState<"all" | "designs" | "supervision" | "movies">("all");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { language, t } = useLanguage();
  const router = useRouter();
  
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const [recommendation, setRecommendation] = useState<{
    movie: any;
    timestamp: number;
    timestampLabel: string;
    topic: string;
    topicAr: string;
    keyword: string;
  } | null>(null);
  const [videoStartTime, setVideoStartTime] = useState<number>(0);
  const [lastRecommended, setLastRecommended] = useState<string>("");

  useEffect(() => {
    if (activeView !== "movies" || !searchQuery.trim()) {
      setRecommendation(null);
      return;
    }

    const queryLower = searchQuery.toLowerCase().trim();
    if (queryLower === lastRecommended.toLowerCase().trim()) return;

    const matchedTimestamp = MOVIE_TIMESTAMPS.find(item => 
      item.keywords.some(kw => queryLower.includes(kw))
    );

    if (matchedTimestamp) {
      const movie = MOVIES.find(m => m.videoId === matchedTimestamp.videoId);
      if (movie) {
        setRecommendation({
          movie,
          timestamp: matchedTimestamp.timestamp,
          timestampLabel: matchedTimestamp.timestampLabel,
          topic: matchedTimestamp.topic,
          topicAr: matchedTimestamp.topicAr,
          keyword: searchQuery
        });
        setLastRecommended(queryLower);
      }
    } else {
      setRecommendation(null);
    }
  }, [searchQuery, activeView, lastRecommended]);

  const PROJECT_ALIASES: Record<string, string[]> = {
    "zomra-east": ["zomra", "zomra east", "زمرة", "مشروع زمرة", "zumra", "zoumra", "zoomra"],
    "skiv": ["skiv", "saudi korean", "اسكيف", "القرية الصناعية", "اس كيه اي في"],
    "red-hills": ["red hills", "red hill", "ريد هيلز", "ريد هيل"],
    "majarra": ["majarra", "majarra vision", "مجرة"],
    "nebu-new-capital": ["nebu", "nebu commercial", "نيبو", "نيبو مول", "نبو"],
    "riviera-sahl-hashish": ["riviera", "ريفييرا", "ريفيرا"],
    "sohob-competition": ["sohob", "sohob residential", "سهب", "مشروع سهب"],
    "jusur-competition-ksa-2": ["jusur", "jusur tourism", "جسور", "مشروع جسور"],
    "osuol-towers-competition-ksa": ["osuol", "osuol towers", "أصول", "ابراج اصول", "اصول"],
    "lujain-resort": ["lujain", "lujain resort", "لجين", "منتجع لجين"],
    "the-crystal-spark-tower": ["crystal spark", "crystal spark tower", "كريستال سبارك", "برج كريستال"],
    "the-spirit-tower": ["spirit tower", "spirit", "سبيريت", "برج سبيريت", "سبريت"],
    "the-new-gateway-for-the-future": ["ring tower", "ring", "رينج", "برج رينج", "رينق"]
  };

  const getQuerySimilarity = (q: string, target: string): number => {
    const cleanQ = q.trim().toLowerCase();
    const cleanTarget = target.trim().toLowerCase();
    
    if (cleanTarget === cleanQ) return 100;
    if (cleanTarget.includes(cleanQ)) return 80 + (cleanQ.length / cleanTarget.length) * 15;
    if (cleanQ.includes(cleanTarget)) return 70 + (cleanTarget.length / cleanQ.length) * 15;
    
    // Check token overlap
    const qWords = cleanQ.split(/\s+/).filter(w => w.length > 1);
    const targetWords = cleanTarget.split(/\s+/).filter(w => w.length > 1);
    let matchCount = 0;
    for (const qw of qWords) {
      if (targetWords.some(tw => tw.includes(qw) || qw.includes(tw))) {
        matchCount++;
      }
    }
    if (matchCount > 0) {
      return (matchCount / Math.max(qWords.length, targetWords.length)) * 60;
    }
    
    return 0;
  };

  const findBestProjectMatch = (query: string) => {
    if (!query) return null;
    const lowerQuery = query.toLowerCase().trim();
    
    let bestProject = null;
    let maxScore = 0;
    
    for (const p of projects) {
      let score = 0;
      
      const aliases = PROJECT_ALIASES[p.slug] || [];
      for (const alias of aliases) {
        const sim = getQuerySimilarity(lowerQuery, alias);
        if (sim > score) score = sim;
      }
      
      const titleSim = getQuerySimilarity(lowerQuery, p.title);
      if (titleSim > score) score = titleSim;
      
      const slugSim = getQuerySimilarity(lowerQuery, p.slug);
      if (slugSim > score) score = slugSim;
      
      if (score > maxScore) {
        maxScore = score;
        bestProject = p;
      }
    }
    
    return maxScore >= 35 ? bestProject : null;
  };

  const findBestMovieMatch = (query: string) => {
    if (!query) return null;
    const lowerQuery = query.toLowerCase().trim();
    
    let bestMovie = null;
    let maxScore = 0;
    
    for (const m of MOVIES) {
      let score = 0;
      
      const aliases = MOVIE_ALIASES[m.slug] || [];
      for (const alias of aliases) {
        const sim = getQuerySimilarity(lowerQuery, alias);
        if (sim > score) score = sim;
      }
      
      const titleSim = getQuerySimilarity(lowerQuery, m.title);
      if (titleSim > score) score = titleSim;
      
      const slugSim = getQuerySimilarity(lowerQuery, m.slug);
      if (slugSim > score) score = slugSim;
      
      if (score > maxScore) {
        maxScore = score;
        bestMovie = m;
      }
    }
    
    return maxScore >= 35 ? bestMovie : null;
  };

  const processVoiceCommand = (transcript: string) => {
    if (!transcript) return;
    
    const lowerText = transcript.trim().toLowerCase();
    let isCommand = false;
    let target = "";
    let isMovieCommand = false;
    
    // English parsing
    if (lowerText.startsWith("open ")) {
      target = lowerText.replace("open ", "").trim();
      isCommand = true;
    } else if (lowerText.startsWith("go to ")) {
      target = lowerText.replace("go to ", "").trim();
      isCommand = true;
    } else if (lowerText.startsWith("show ")) {
      target = lowerText.replace("show ", "").trim();
      isCommand = true;
      isMovieCommand = true;
    } else if (lowerText.startsWith("play ")) {
      target = lowerText.replace("play ", "").trim();
      isCommand = true;
      isMovieCommand = true;
    }
    
    // Arabic parsing
    const arOpen = /^افتح\s+(.*)/i;
    const arShow = /^(شاهد|شغل|عرض)\s+(.*)/i;
    
    if (arOpen.test(lowerText)) {
      const match = lowerText.match(arOpen);
      if (match) {
        target = match[1].trim();
        isCommand = true;
      }
    } else if (arShow.test(lowerText)) {
      const match = lowerText.match(arShow);
      if (match) {
        target = match[2].trim();
        isCommand = true;
        isMovieCommand = true;
      }
    }
    
    // Clean fillers like "project", "movie", "compound", "مشروع", "فيلم", "فيديو", "كمبوند"
    const cleanTerm = (term: string) => {
      let t = term;
      const cleanWords = ["project", "movie", "compound", "مشروع", "فيلم", "فيديو", "كمبوند", "the"];
      cleanWords.forEach(word => {
        t = t.replace(new RegExp(`\\b${word}\\b`, 'gi'), "");
        t = t.replace(new RegExp(`${word}`, 'gi'), "");
      });
      return t.trim();
    };
    
    const cleanedTarget = cleanTerm(target || lowerText);
    
    if (isCommand && cleanedTarget) {
      if (isMovieCommand) {
        const matchedMovie = findBestMovieMatch(cleanedTarget);
        if (matchedMovie) {
          setActiveView("movies");
          setActiveVideoId(matchedMovie.videoId);
          return;
        }
      }
      
      const matchedProject = findBestProjectMatch(cleanedTarget);
      if (matchedProject) {
        router.push(`/projects/${matchedProject.slug}`);
        return;
      }
      
      const matchedMovieFallback = findBestMovieMatch(cleanedTarget);
      if (matchedMovieFallback) {
        setActiveView("movies");
        setActiveVideoId(matchedMovieFallback.videoId);
        return;
      }
    }
    
    setSearchQuery(transcript);
  };

  const startVoiceSearch = async () => {
    if (typeof window === "undefined") return;
    
    const SpeechLib = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechLib) {
      alert(language === "ar" 
        ? "البحث الصوتي غير مدعوم في هذا المتصفح. يرجى استخدام متصفح حديث مثل Chrome أو Edge."
        : "Voice search is not supported in this browser. Please use a modern browser like Chrome or Edge."
      );
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
      }
    } catch (err: any) {
      console.warn("getUserMedia error:", err);
      alert((language === "ar"
        ? "يرجى السماح بالوصول إلى الميكروفون لاستخدام ميزة البحث الصوتي."
        : "Please allow microphone access in your browser settings to use the voice search feature.") + ` (Error: ${err.name || err.message || err})`
      );
      return;
    }

    try {
      const rec = new SpeechLib();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = language === "ar" ? "ar-EG" : "en-US";

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onerror = (event: any) => {
        setIsListening(false);
        console.warn("Speech recognition warning:", event.error);
        if (event.error === "not-allowed") {
          alert((language === "ar"
            ? "يرجى السماح بالوصول إلى الميكروفون لاستخدام ميزة البحث الصوتي."
            : "Please allow microphone access in your browser settings to use the voice search feature.") + ` (Speech Error: ${event.error})`
          );
        }
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        processVoiceCommand(transcript);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (e) {
      console.warn("Failed to start speech recognition:", e);
    }
  };

  const gridRef = useRef<HTMLDivElement>(null);

  // Filter and rank projects by relevance
  const filteredProjects = projects
    .map((p) => ({
      project: p,
      score: getSearchScore(p, searchQuery, t),
    }))
    .filter((item) => {
      const p = item.project;
      
      if (activeView === "supervision") {
        // Only include specified technical/supervision portfolio projects
        if (!TECHNICAL_SLUGS.includes(p.slug)) return false;
        
        const techSector = TECHNICAL_SECTOR_MAP[p.slug];
        const matchesSector = selectedSector === "All" || techSector === selectedSector;
        const matchesRegion =
          selectedRegion === "All" ||
          p.location.toLowerCase().includes(selectedRegion.toLowerCase());
        const matchesYear = selectedYear === "All" || p.year === selectedYear;
        const matchesSearch = item.score > 0;
        
        return matchesSector && matchesRegion && matchesYear && matchesSearch;
      } else if (activeView === "designs") {
        // Only include design projects
        if (TECHNICAL_SLUGS.includes(p.slug)) return false;

        const matchesSector = selectedSector === "All" || p.sector === selectedSector;
        const matchesRegion =
          selectedRegion === "All" ||
          p.location.toLowerCase().includes(selectedRegion.toLowerCase());
        const matchesYear = selectedYear === "All" || p.year === selectedYear;
        const matchesSearch = item.score > 0;
        
        return matchesSector && matchesRegion && matchesYear && matchesSearch;
      } else {
        // "all" view - include all projects
        const matchesSector = selectedSector === "All" || p.sector === selectedSector;
        const matchesRegion =
          selectedRegion === "All" ||
          p.location.toLowerCase().includes(selectedRegion.toLowerCase());
        const matchesYear = selectedYear === "All" || p.year === selectedYear;
        const matchesSearch = item.score > 0;
        
        return matchesSector && matchesRegion && matchesYear && matchesSearch;
      }
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.project);

  // Filter and rank movies by search relevance
  const filteredMovies = MOVIES
    .map((m) => ({
      movie: m,
      score: getSearchScore(m, searchQuery, t),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.movie);

  // GSAP Entrance Stagger on grid load or filter update
  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      const cards = grid.querySelectorAll(`.${styles.projectCard}`);
      if (cards.length > 0) {
        gsap.killTweensOf(cards);
        
        gsap.set(cards, { opacity: 0, y: 30 });
        
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      }
    }
    ScrollTrigger.refresh();
  }, [selectedSector, selectedRegion, selectedYear, searchQuery, activeView]);

  const resetFilters = () => {
    setSelectedSector("All");
    setSelectedRegion("All");
    setSelectedYear("All");
    setSearchQuery("");
  };

  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.08 }}>
      <main className={styles.projectsPage}>
        {/* Header Title Section */}
        <section className={styles.headerSection}>
          <div className={styles.headerText}>
            <div className={styles.subtitle}>{t("Our Works")}</div>
            <h1 className={styles.title}>{t("Projects")}</h1>
          </div>
          <div className={styles.headerImageWrapper}>
            <video
              src="/assets/magnific_move-the-robot-as-he-is-b_nVWwyJmYQD.mp4"
              autoPlay
              loop
              muted
              playsInline
              className={styles.headerImage}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </section>

        {/* View Switcher Tabs (ALL / DESIGNS / SUPERVISION / MOVIES) */}
        <div className={styles.portfolioTabs}>
          <button
            className={`${styles.tabBtn} ${activeView === "all" ? styles.activeTabBtn : ""}`}
            onClick={() => {
              setActiveView("all");
              resetFilters();
            }}
          >
            {t("ALL")}
          </button>
          <button
            className={`${styles.tabBtn} ${activeView === "designs" ? styles.activeTabBtn : ""}`}
            onClick={() => {
              setActiveView("designs");
              resetFilters();
            }}
          >
            {t("DESIGNS")}
          </button>
          <button
            className={`${styles.tabBtn} ${activeView === "supervision" ? styles.activeTabBtn : ""}`}
            onClick={() => {
              setActiveView("supervision");
              resetFilters();
            }}
          >
            {t("SUPERVISION")}
          </button>
          <button
            className={`${styles.tabBtn} ${activeView === "movies" ? styles.activeTabBtn : ""}`}
            onClick={() => {
              setActiveView("movies");
              resetFilters();
            }}
          >
            {t("MOVIES")}
          </button>
        </div>

        {/* Sector Tabs Bar (In between main tabs and filter bar) */}
        {activeView !== "movies" && (
          <div className={styles.sectorTabsBar}>
            {(activeView === "supervision" ? technicalSectors : sectors).map((s) => (
              <button
                key={s}
                className={`${styles.sectorTabBtn} ${selectedSector === s ? styles.activeSectorTabBtn : ""}`}
                onClick={() => setSelectedSector(s)}
              >
                {s === "All" ? t("All Sectors") : t(s)}
              </button>
            ))}
          </div>
        )}

        {/* Filter & Search Bar - RMJM Style */}
        <section className={styles.filterBar}>

          {/* Region Selector (active for All, Designs, and Supervision) */}
          {activeView !== "movies" && (
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel} htmlFor="regionSelect">{t("Region")}</label>
              <select
                id="regionSelect"
                className={styles.selectInput}
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r === "All" ? t("All Regions") : t(r)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Year Selector (active for All, Designs, and Supervision) */}
          {activeView !== "movies" && (
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel} htmlFor="yearSelect">{t("Year")}</label>
              <select
                id="yearSelect"
                className={styles.selectInput}
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y === "All" ? t("All Years") : y}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* Keyword Search */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel} htmlFor="searchField">{t("Keywords")}</label>
            <div className={styles.searchFieldWrapper}>
              <input
                id="searchField"
                type="text"
                className={styles.textInput}
                placeholder={t("Search by keywords or description (e.g., 'central landscape')...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                className={`${styles.voiceSearchBtn} ${isListening ? styles.listening : ""}`}
                onClick={startVoiceSearch}
                title={language === "ar" ? "البحث بالصوت" : "Voice Search"}
                aria-label="Voice Search"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </button>
            </div>
          </div>

          {/* Reset Filters */}
          <button
            className={styles.resetButton}
            onClick={resetFilters}
            aria-label={t("Clear Filters")}
            title={t("Clear Filters")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </button>
        </section>

        {/* Portfolio Items Grid */}
        <section ref={gridRef}>
          {activeView !== "movies" ? (
            filteredProjects.length > 0 ? (
              <div className={styles.portfolioGrid}>
                {filteredProjects.map((project, idx) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className={styles.projectCard}
                  >
                    <div className={styles.cardImageWrapper}>
                      <span className={styles.cardNumber}>{String(idx + 1).padStart(2, "0")}</span>
                      <Image
                        src={project.featuredImage}
                        alt={t(project.title)}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.cardImage}
                      />
                    </div>
                    <div className={styles.cardDetails}>
                      <div className={styles.cardSector}>
                        {t(TECHNICAL_SLUGS.includes(project.slug) ? TECHNICAL_SECTOR_MAP[project.slug] || project.sector : project.sector)}
                      </div>
                      <h3 className={styles.cardTitle}>{t(project.title)}</h3>
                      <p className={styles.cardLocation}>{t(project.location)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>{t("No projects match your search criteria.")}</p>
                <button onClick={resetFilters}>{t("Clear Filters")}</button>
              </div>
            )
          ) : (
            filteredMovies.length > 0 ? (
              <div className={styles.portfolioGrid}>
                {filteredMovies.map((movie, idx) => (
                  <div
                    key={movie.slug}
                    className={`${styles.projectCard} ${styles.movieCard}`}
                    onClick={() => setActiveVideoId(movie.videoId)}
                  >
                    <div className={styles.cardImageWrapper}>
                      <span className={styles.cardNumber}>{String(idx + 1).padStart(2, "0")}</span>
                      <Image
                        src={movie.featuredImage}
                        alt={t(movie.title)}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.cardImage}
                      />
                      <div className={styles.playOverlay}>
                        <svg className={styles.playIcon} viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className={styles.cardDetails}>
                      <div className={styles.cardSector}>{t(movie.sector)}</div>
                      <h3 className={styles.cardTitle}>{t(movie.title)}</h3>
                      <p className={styles.cardLocation}>{t(movie.location)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>{t("No movies match your search criteria.")}</p>
                <button onClick={resetFilters}>{t("Clear Filters")}</button>
              </div>
            )
          )}
        </section>
      </main>

      {/* Video Lightbox Modal */}
      {activeVideoId && (
        <div className={styles.videoModalOverlay} onClick={() => { setActiveVideoId(null); setVideoStartTime(0); }}>
          <div className={styles.videoModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => { setActiveVideoId(null); setVideoStartTime(0); }} aria-label="Close video">×</button>
            <div className={styles.iframeWrapper}>
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1${videoStartTime ? `&start=${videoStartTime}` : ""}`}
                title="YouTube Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Recommendation Modal */}
      {recommendation && (
        <div className={styles.recommendModalOverlay}>
          <div className={styles.recommendModalContent}>
            <button 
              className={styles.recommendCloseBtn} 
              onClick={() => setRecommendation(null)}
              aria-label="Close recommendation"
            >
              ×
            </button>
            <div className={styles.recommendHeader}>
              <span className={styles.recommendBadge}>
                {language === "ar" ? "فيديو مقترح" : "Recommended Video"}
              </span>
            </div>
            <div className={styles.recommendCardWrapper}>
              <div className={`${styles.projectCard} ${styles.movieCard} ${styles.recommendCard}`}>
                <div className={styles.cardImageWrapper}>
                  <Image
                    src={recommendation.movie.featuredImage}
                    alt={t(recommendation.movie.title)}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 360px"
                    className={styles.cardImage}
                  />
                  <div className={styles.playOverlay}>
                    <svg className={styles.playIcon} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className={styles.cardDetails}>
                  <div className={styles.cardSector}>{t(recommendation.movie.sector)}</div>
                  <h3 className={styles.cardTitle}>{t(recommendation.movie.title)}</h3>
                  <p className={styles.cardLocation}>{t(recommendation.movie.location)}</p>
                </div>
              </div>
            </div>
            <p className={styles.recommendTopic}>
              {language === "ar" ? recommendation.topicAr : recommendation.topic}
            </p>
            <p className={styles.recommendQuestion}>
              {language === "ar" 
                ? `لقد وجدنا قسماً يتعلق بـ "${recommendation.keyword}" في الدقيقة ${recommendation.timestampLabel}. من أين ترغب في بدء المشاهدة؟`
                : `We found a chapter matching "${recommendation.keyword}" at ${recommendation.timestampLabel}. Where would you like to start watching?`
              }
            </p>
            <div className={styles.recommendActions}>
              <button 
                className={styles.recommendBtnPrimary}
                onClick={() => {
                  setVideoStartTime(recommendation.timestamp);
                  setActiveVideoId(recommendation.movie.videoId);
                  setRecommendation(null);
                }}
              >
                {language === "ar" 
                  ? `ابدأ من ${recommendation.timestampLabel}`
                  : `Start from ${recommendation.timestampLabel}`
                }
              </button>
              <button 
                className={styles.recommendBtnSecondary}
                onClick={() => {
                  setVideoStartTime(0);
                  setActiveVideoId(recommendation.movie.videoId);
                  setRecommendation(null);
                }}
              >
                {language === "ar" ? "ابدأ من البداية" : "Start from Beginning"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ReactLenis>
  );
}
