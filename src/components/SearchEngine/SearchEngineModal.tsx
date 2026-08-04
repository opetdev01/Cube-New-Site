"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";
import { projects } from "@/data/projects";
import styles from "./SearchEngineModal.module.css";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  matchedProjects?: any[];
}

interface SearchEngineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchEngineModal({ isOpen, onClose }: SearchEngineModalProps) {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [stats, setStats] = useState({ filesCount: 120, matches: 0 });
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Robot Intro Video Splash State
  const [introStep, setIntroStep] = useState<"intro" | "search">("intro");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCardClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    onClose();
    router.push(`/projects/${slug}`);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIntroStep("intro");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && introStep === "search") {
      // Focus on input
      setTimeout(() => {
        const input = document.getElementById("globalSearchInput");
        input?.focus();
      }, 100);
    }
  }, [isOpen, introStep]);

  useEffect(() => {
    // Initial welcome message
    setMessages([
      {
        sender: "bot",
        text: language === "ar"
          ? "مرحباً بك في بوابة البحث الذكي لـ كيو ب. يمكنك الاستفسار عن أي مشروع، أو إعداد، أو ميزة داخل الموقع، وسأقوم بتمشيط قاعدة الكود وعرض النتائج مباشرة."
          : "Welcome to the CUBE Intelligent Search Engine. Ask me about any component, layout configuration, design standard, styles, or specific projects, and I will parse your query directly."
      }
    ]);
  }, [language, isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const toggleListening = async () => {
    if (typeof window === "undefined") return;

    const SpeechLib = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechLib) {
      alert(language === "ar"
        ? "البحث الصوتي غير مدعوم في هذا المتصفح. يرجى استخدام متصفح حديث مثل Chrome."
        : "Voice search is not supported in this browser. Please use a modern browser like Chrome."
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
        : "Please allow microphone access in your browser settings to use the voice search feature.")
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
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleSearch(transcript);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (e) {
      console.warn("Failed to start speech recognition:", e);
    }
  };

  const handleSearch = async (searchQueryText: string) => {
    if (!searchQueryText.trim() || loading) return;

    setLoading(true);
    setMessages((prev) => [...prev, { sender: "user", text: searchQueryText }]);
    setQuery("");

    // Front-end token matcher for projects
    const STOP_WORDS = new Set([
      "what", "do", "you", "know", "about", "how", "where", "to", "in", "of", 
      "for", "with", "on", "at", "by", "an", "this", "that", "from", "it", 
      "me", "tell", "show", "is", "are", "was", "were", "be", "been", "the", 
      "a", "and", "or", "but", "if", "then", "else", "can", "will", "would",
      "should", "could", "here", "there", "who", "whom", "whose", "why", "please",
      "find", "search", "get", "give", "look", "up", "info", "information", "project"
    ]);
    const rawTokens = searchQueryText.toLowerCase().replace(/[^\w\s\u0600-\u06FF]/g, " ").split(/\s+/);
    const keywords = rawTokens.filter(t => t.length > 1 && !STOP_WORDS.has(t));
    const searchTerms = keywords.length > 0 ? keywords : rawTokens.filter(t => t.length > 0);

    const matchedProjects: any[] = [];
    if (searchTerms.length > 0) {
      for (const p of projects) {
        const titleLower = (p.title || "").toLowerCase();
        const descLower = (p.description || "").toLowerCase();
        const summaryLower = (p.summary || "").toLowerCase();
        const sectorLower = (p.sector || "").toLowerCase();
        const locLower = (p.location || "").toLowerCase();

        let match = false;
        for (const term of searchTerms) {
          if (titleLower.includes(term) || descLower.includes(term) || summaryLower.includes(term) || sectorLower.includes(term) || locLower.includes(term)) {
            match = true;
            break;
          }
        }
        if (match) {
          matchedProjects.push(p);
        }
      }
    }

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQueryText })
      });

      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, { 
          sender: "bot", 
          text: data.answer,
          matchedProjects: matchedProjects.slice(0, 3)
        }]);
        setStats({
          filesCount: data.filesScannedCount || 120,
          matches: matchedProjects.length
        });
      } else {
        setMessages((prev) => [...prev, { sender: "bot", text: `Error: ${data.error || "Unable to parse request."}` }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Failed to connect to the CUBE search engine. Ensure the server is online." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.hologramGrid} />

        {introStep === "intro" ? (
          <div className={styles.introContent}>
            <video
              ref={videoRef}
              src="/assets/magnific_make-this-robot-as-he-is-_lJUZe6zgv9.mp4"
              autoPlay
              playsInline
              muted
              onEnded={() => setIntroStep("search")}
              className={styles.introVideo}
            />

            <div className={styles.introOverlayControls}>
              <span className={styles.robotStatusText}>
                {language === "ar" ? "جاري تهيئة المساعد الذكي..." : "INITIALIZING AI SEARCH ASSISTANT..."}
              </span>
              <button
                className={styles.introSkipButton}
                onClick={() => setIntroStep("search")}
              >
                {language === "ar" ? "تخطي ➔" : "SKIP ➔"}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header section with monitor stats */}
            <div className={styles.modalHeader}>
              <div className={styles.headerTitleBox}>
                <h2>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--c-red)" }}>
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  {language === "ar" ? "محرك البحث الذكي" : "CUBE SEARCH ENGINE"}
                </h2>
                <p>{language === "ar" ? "منصة البحث والتحليل الفوري لمحتوى كيو ب" : "AI Search console scanning local components & registry"}</p>
              </div>

              <div className={styles.systemStatusRow}>
                <div className={styles.statusIndicator}>
                  <span className={styles.pulseDot} />
                  <span>ONLINE</span>
                </div>
                <div className={styles.statItem}>
                  {language === "ar" ? "ملفات مفحوصة: " : "Scanned Files: "}
                  <strong>{stats.filesCount}</strong>
                </div>
                <div className={styles.statItem}>
                  {language === "ar" ? "مطابقات: " : "Matches: "}
                  <strong>{stats.matches}</strong>
                </div>
              </div>

              <button className={styles.closeButton} onClick={onClose} aria-label="Close search">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Message board */}
            <div className={styles.chatMessages}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`${styles.messageWrapper} ${msg.sender === "user" ? styles.msgUser : styles.msgBot}`}>
                  <div className={styles.messageContent}>
                    {msg.sender === "bot" ? (
                      <div className={styles.botMarkdown}>
                        {msg.text.split("\n").map((line, lIdx) => {
                          if (line.startsWith("###")) {
                            return <h4 key={lIdx}>{line.replace("###", "")}</h4>;
                          }
                          if (line.startsWith("```")) {
                            return null;
                          }
                          if (line.includes("`")) {
                            const parts = line.split("`");
                            return (
                              <p key={lIdx}>
                                {parts.map((p, pIdx) => pIdx % 2 === 1 ? <code key={pIdx}>{p}</code> : p)}
                              </p>
                            );
                          }
                          return <p key={lIdx}>{line}</p>;
                        })}
                      </div>
                    ) : (
                      <p style={{ margin: 0 }}>{msg.text}</p>
                    )}
                  </div>

                  {msg.matchedProjects && msg.matchedProjects.length > 0 && (
                    <div className={styles.chatProjectsGrid}>
                      {msg.matchedProjects.map((project) => (
                        <Link
                          key={project.slug}
                          href={`/projects/${project.slug}`}
                          className={styles.portalProjectCard}
                          onClick={(e) => handleCardClick(e, project.slug)}
                        >
                          <div className={styles.portalCardImageWrapper}>
                            <Image
                              src={project.featuredImage}
                              alt={project.title}
                              fill
                              sizes="90px"
                              className={styles.portalCardImage}
                            />
                          </div>
                          <div className={styles.portalCardDetails}>
                            <span className={styles.portalCardSector}>{t(project.sector)}</span>
                            <h4 className={styles.portalCardTitle}>{t(project.title)}</h4>
                            <p className={styles.portalCardLocation}>{t(project.location)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className={`${styles.messageWrapper} ${styles.msgBot}`}>
                  <div className={styles.loadingPulse}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input box */}
            <div className={styles.chatInputWrapper}>
              <div className={styles.inputContainer}>
                <input
                  id="globalSearchInput"
                  type="text"
                  placeholder={language === "ar" ? "اسأل محرك البحث عن أي تفاصيل أو مشاريع..." : "Ask search engine about any projects, team members, or design rules..."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
                  className={styles.chatInput}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`${styles.micButton} ${isListening ? styles.listening : ""}`}
                  title={language === "ar" ? "تحدث بالصوت" : "Speak to search"}
                  aria-label="Speak to search"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.micIcon}>
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => handleSearch(query)}
                className={styles.sendButton}
                disabled={loading}
              >
                {language === "ar" ? "إرسال" : "SEND"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
