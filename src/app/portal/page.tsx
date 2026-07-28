"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { projects } from "../../data/projects";
import styles from "./portal.module.css";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  matchedProjects?: any[];
}

export default function PortalPage() {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [stats, setStats] = useState({ filesCount: 120, matches: 0 });
  const [questionsCount, setQuestionsCount] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const toggleListening = async () => {
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

  useEffect(() => {
    // Welcome message
    setMessages([
      {
        sender: "bot",
        text: language === "ar"
          ? "مرحباً بك في بوابة كيو ب الذكية. اسألني عن أي ملف، إعداد، أو ميزة برمجية داخل مجلد المشروع وسأقوم بالبحث عنها مباشرة وعرض الشيفرة البرمجية المرتبطة بها."
          : "Welcome to the CUBE Portal. Ask me about any component, configuration, package setting, style, or translation in the project, and I will scan the code live to retrieve it."
      }
    ]);
  }, [language]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSearch = async (searchQueryText: string) => {
    if (!searchQueryText.trim() || loading) return;

    setLoading(true);
    setQuestionsCount((prev) => prev + 1);
    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: searchQueryText }]);
    setQuery("");

    // Tokenize query on the frontend
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
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `Error: ${data.error || "Something went wrong"}` }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Failed to connect to the CUBE search engine. Ensure the server is running." }
      ]);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className={styles.portalContainer}>
      {/* Background Holographic Glows */}
      <div className={styles.hologramGrid} />
      <div className={styles.glowOrbRed} />
      <div className={styles.glowOrbWhite} />

      <div className={styles.mainWrapper}>
        <div className={styles.header}>
          <div className={styles.logoBadge}>
            <Image
              src="/logo-v4.png"
              alt="CUBE Logo"
              width={90}
              height={90}
              className={styles.logoImage}
            />
          </div>
          <h1>
            {language === "ar" ? "بوابة كيو ب الذكية" : "CUBE PORTAL"}
          </h1>
          <p className={styles.subtitle}>
            {language === "ar"
              ? "منصة البحث والتحليل التفاعلي المباشر للشيفرة البرمجية والملفات الهيكلية للموقع"
              : "Futuristic interactive search & semantic parsing console for the CUBE codebase"}
          </p>
        </div>

        <div className={styles.portalGrid}>
          {/* Left Panel: Stats & Registry */}
          <div className={styles.statsCard}>
            <div className={styles.cardHeader}>
              <div className={styles.neonPulse} />
              <h3>{language === "ar" ? "حالة النظام" : "SYSTEM MONITOR"}</h3>
            </div>
            
            <div className={styles.statsMetrics}>
              <div className={styles.metricItem}>
                <span className={styles.metricVal}>{stats.matches}</span>
                <span className={styles.metricLabel}>
                  {language === "ar" ? "النتائج المطابقة" : "Matched Results"}
                </span>
              </div>
              <div className={styles.metricItem}>
                <span className={styles.metricVal} style={{ color: "#e30613" }}>
                  {questionsCount}
                </span>
                <span className={styles.metricLabel}>
                  {language === "ar" ? "الأسئلة المطروحة" : "Questions Asked"}
                </span>
              </div>
            </div>

            <div className={styles.systemStatus}>
              <div className={styles.statusRow}>
                <span>Engine Status:</span>
                <span className={styles.statusOnline}>ONLINE</span>
              </div>
              <div className={styles.statusRow}>
                <span>Directory Target:</span>
                <code>cube-site/</code>
              </div>
            </div>
            <div className={styles.cubeLogoMark}>
              <Image
                src="/assets/cube_brochure_v2.jpg"
                alt="Cube Brochure"
                width={275}
                height={275}
                className={styles.brochureImage}
              />
            </div>
          </div>

          {/* Right Panel: Futuristic Chat Interface */}
          <div className={styles.chatCard}>
            <div className={styles.chatHeader}>
              <div className={styles.liveIndicator}>
                <span className={styles.liveDot} />
                <span>{language === "ar" ? "البوابة النشطة" : "ACTIVE PORTAL"}</span>
              </div>
            </div>

            <div className={styles.chatMessages}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${styles.messageWrapper} ${
                    msg.sender === "user" ? styles.msgUser : styles.msgBot
                  }`}
                  style={{ flexDirection: "column", gap: "12px" }}
                >
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
                            // Simple inline code highlighting helper
                            const parts = line.split("`");
                            return (
                              <p key={lIdx}>
                                {parts.map((p, pIdx) =>
                                  pIdx % 2 === 1 ? <code key={pIdx}>{p}</code> : p
                                )}
                              </p>
                            );
                          }
                          return <p key={lIdx}>{line}</p>;
                        })}
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>

                  {msg.matchedProjects && msg.matchedProjects.length > 0 && (
                    <div className={styles.chatProjectsGrid}>
                      {msg.matchedProjects.map((project, pIdx) => (
                        <Link
                          key={project.slug}
                          href={`/projects/${project.slug}`}
                          className={styles.portalProjectCard}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className={styles.portalCardImageWrapper}>
                            <Image
                              src={project.featuredImage}
                              alt={project.title}
                              fill
                              sizes="120px"
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



             {/* Input Row */}
            <div className={styles.chatInputWrapper}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder={
                    language === "ar"
                      ? "ابحث عن مكون أو ميزة في الكود..."
                      : "Ask about any file, styles, or logic..."
                  }
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
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.micIcon}>
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
          </div>
        </div>
      </div>
    </div>
  );
}
