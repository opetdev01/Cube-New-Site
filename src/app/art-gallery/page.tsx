"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";
import styles from "./art-gallery.module.css";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  type: "painting" | "sketch";
  src: string; // URL or Base64 string
  date: string;
  isUserUploaded?: boolean;
}

interface UploadLog {
  id: string;
  timestamp: number;
}

export default function ArtGalleryPage() {
  const { language, t } = useLanguage();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [pendingArtworks, setPendingArtworks] = useState<Artwork[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [selectedFolderArtist, setSelectedFolderArtist] = useState<string | null>(null);

  const [lightboxArt, setLightboxArt] = useState<Artwork | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadCountThisMonth, setUploadCountThisMonth] = useState(0);
  const [showLimitAlert, setShowLimitAlert] = useState(false);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Full-screen Intro Splash State
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [introEnded, setIntroEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const introVideoRef = useRef<HTMLVideoElement>(null);

  // Pre-populated downloaded art gallery master files
  const defaultArtworks: Artwork[] = [
    {
      id: "art-1",
      title: "CUBE Composition 2012",
      artist: "Dr. Ashraf Abdel Mohsen",
      type: "painting",
      src: "/assets/Art/10-6-2012.jpg",
      date: "2012-06-10"
    },
    {
      id: "art-2",
      title: "Abstract Manifestation",
      artist: "Dr. Ashraf Abdel Mohsen",
      type: "painting",
      src: "/assets/Art/20190711_142931.jpg",
      date: "2019-07-11"
    },
    {
      id: "art-3",
      title: "Cairo Heritage Impression I",
      artist: "Dr. Ashraf Abdel Mohsen",
      type: "sketch",
      src: "/assets/Art/Ash_Art_Ashraf_Abdel_Mohsen_Egypt_2014 (35).jpg",
      date: "2014-04-12"
    },
    {
      id: "art-4",
      title: "Cairo Heritage Impression II",
      artist: "Dr. Ashraf Abdel Mohsen",
      type: "sketch",
      src: "/assets/Art/Ash_Art_Ashraf_Abdel_Mohsen_Egypt_2014 (39).jpg",
      date: "2014-04-18"
    },
    {
      id: "art-5",
      title: "Conceptual Architectural Flow",
      artist: "Dr. Ashraf Abdel Mohsen",
      type: "sketch",
      src: "/assets/Art/IMG_2718jpg.jpg",
      date: "2015-05-20"
    },
    {
      id: "art-6",
      title: "Tectonic Study I",
      artist: "Dr. Ashraf Abdel Mohsen",
      type: "sketch",
      src: "/assets/Art/IMG_4747jj.jpg",
      date: "2016-08-11"
    },
    {
      id: "art-7",
      title: "Tectonic Study II",
      artist: "Dr. Ashraf Abdel Mohsen",
      type: "sketch",
      src: "/assets/Art/IMG_4750jjj.jpg",
      date: "2016-08-14"
    },
    {
      id: "art-8",
      title: "Dynamic Volumetrics I",
      artist: "Dr. Ashraf Abdel Mohsen",
      type: "sketch",
      src: "/assets/Art/IMG_4761hjj.jpg",
      date: "2017-09-02"
    },
    {
      id: "art-9",
      title: "Dynamic Volumetrics II",
      artist: "Dr. Ashraf Abdel Mohsen",
      type: "sketch",
      src: "/assets/Art/IMG_4776jjj.jpg",
      date: "2017-09-08"
    },
    {
      id: "art-10",
      title: "Spatial Layering Study",
      artist: "Dr. Ashraf Abdel Mohsen",
      type: "sketch",
      src: "/assets/Art/IMG_4793jjj.jpg",
      date: "2018-03-15"
    },
    {
      id: "art-11",
      title: "Structural Synthesis I",
      artist: "Dr. Ashraf Abdel Mohsen",
      type: "sketch",
      src: "/assets/Art/IMG_4804jjjj.jpg",
      date: "2018-04-22"
    },
    {
      id: "art-12",
      title: "Structural Synthesis II",
      artist: "Dr. Ashraf Abdel Mohsen",
      type: "sketch",
      src: "/assets/Art/IMG_4825jjj.jpg",
      date: "2018-04-29"
    },
    {
      id: "art-13",
      title: "Urban Fabric Vision I",
      artist: "Dr. Ashraf Abdel Mohsen",
      type: "sketch",
      src: "/assets/Art/IMG_4898jjj.jpg",
      date: "2019-10-05"
    },
    {
      id: "art-14",
      title: "Urban Fabric Vision II",
      artist: "Dr. Ashraf Abdel Mohsen",
      type: "sketch",
      src: "/assets/Art/IMG_4901jj.jpg",
      date: "2019-10-12"
    }
  ];

  useEffect(() => {
    // Load approved and pending artworks from localStorage
    if (typeof window !== "undefined") {
      const storedArt = localStorage.getItem("cube_art_uploads");
      const storedPending = localStorage.getItem("cube_art_pending");
      const storedLogs = localStorage.getItem("cube_art_upload_logs");
      let parsedArt: Artwork[] = [];
      if (storedArt) {
        try {
          parsedArt = JSON.parse(storedArt);
        } catch (e) {
          console.error("Failed to parse stored art", e);
        }
      }

      let parsedPending: Artwork[] = [];
      if (storedPending) {
        try {
          parsedPending = JSON.parse(storedPending);
        } catch (e) {
          console.error("Failed to parse pending art", e);
        }
      }

      setArtworks([...defaultArtworks, ...parsedArt]);
      setPendingArtworks(parsedPending);
      calculateMonthlyUploads(storedLogs ? JSON.parse(storedLogs) : []);

      // Always play intro video on every visit to Art Gallery page
      setIsIntroActive(true);
      setIntroEnded(false);
    }
  }, [language]);

  const handleFinishIntro = () => {
    setIntroEnded(true);
    setTimeout(() => {
      setIsIntroActive(false);
    }, 600);
  };



  const handleAdminPanelOpen = () => {
    setShowAdminPanel(true);
  };

  const calculateMonthlyUploads = (logs: UploadLog[]) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-11

    const monthlyCount = logs.filter((log) => {
      const logDate = new Date(log.timestamp);
      return logDate.getFullYear() === currentYear && logDate.getMonth() === currentMonth;
    }).length;

    setUploadCountThisMonth(monthlyCount);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert(language === "ar" ? "يرجى تحميل ملفات الصور فقط (PNG, JPG, WEBP)." : "Please upload image files only (PNG, JPG, WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const base64Src = event.target.result as string;

        const newArt: Artwork = {
          id: `user-${Date.now()}`,
          title: file.name.substring(0, file.name.lastIndexOf(".")) || file.name,
          artist: language === "ar" ? "فنان ضيف" : "Guest Artist",
          type: file.name.toLowerCase().includes("sketch") || file.name.toLowerCase().includes("رسم") ? "sketch" : "painting",
          src: base64Src,
          date: new Date().toISOString().split("T")[0],
          isUserUploaded: true
        };

        // Add to PENDING list (NOT live)
        const updatedPending = [...pendingArtworks, newArt];
        setPendingArtworks(updatedPending);
        localStorage.setItem("cube_art_pending", JSON.stringify(updatedPending));

        // Show guest success alert
        setShowUploadSuccess(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Admin approval action
  const acceptArtwork = (art: Artwork) => {
    // 1. Move to approved artworks
    const updatedApproved = [...artworks, art];
    setArtworks(updatedApproved);
    localStorage.setItem("cube_art_uploads", JSON.stringify(updatedApproved));

    // 2. Remove from pending list
    const updatedPending = pendingArtworks.filter(a => a.id !== art.id);
    setPendingArtworks(updatedPending);
    localStorage.setItem("cube_art_pending", JSON.stringify(updatedPending));
  };

  // Admin decline action
  const declineArtwork = (id: string) => {
    const updatedPending = pendingArtworks.filter(a => a.id !== id);
    setPendingArtworks(updatedPending);
    localStorage.setItem("cube_art_pending", JSON.stringify(updatedPending));
  };

  // Delete live approved artwork
  const deleteArtwork = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = artworks.filter(a => a.id !== id);
    setArtworks(updated);
    localStorage.setItem("cube_art_uploads", JSON.stringify(updated));
  };

  // Group artworks by artist name
  const foldersMap: { [artistName: string]: Artwork[] } = {};
  artworks.forEach((art) => {
    const artistName = art.artist || (language === "ar" ? "فنان ضيف" : "Guest Artist");
    if (!foldersMap[artistName]) {
      foldersMap[artistName] = [];
    }
    foldersMap[artistName].push(art);
  });

  const folderArtists = Object.keys(foldersMap);

  return (
    <div className={styles.galleryContainer}>
      {/* Full-Screen Art Gallery Intro Splash Video Overlay */}
      {isIntroActive && (
        <div className={`${styles.artIntroOverlay} ${introEnded ? styles.artIntroFadeOut : ""}`}>
          <video
            ref={introVideoRef}
            src="/assets/magnific_i-want-this-robot-to-draw_SywuP7iUb8.mp4"
            autoPlay
            muted={isMuted}
            playsInline
            onEnded={handleFinishIntro}
            className={styles.artIntroVideoFullscreen}
          />

          {/* Top Right Controls: Mute Toggle + SKIP INTRO Button */}
          <div className={styles.artIntroControls}>
            <button
              className={styles.artIntroMuteBtn}
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Unmute Sound" : "Mute Sound"}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>

            <button
              className={styles.artIntroSkipBtn}
              onClick={handleFinishIntro}
            >
              <span>{language === "ar" ? "تخطي المقدمة ➔" : "SKIP INTRO ➔"}</span>
            </button>
          </div>
        </div>
      )}

      <div className={styles.wrapper}>
        <header className={styles.header}>
          <span className={styles.sectionSubtitle}>{t("Curated Masterpieces")}</span>
          <h1 className={styles.sectionTitle}>{language === "ar" ? "معرض الفنون الرقمي" : "ART GALLERY"}</h1>
          <div className={styles.titleDivider} />
          <p className={styles.headerText}>
            {language === "ar"
              ? "مساحة عرض تفاعلية مخصصة للوحات الفنية والرسومات التخطيطية الهندسية والمعمارية لمشاريع كيو ب."
              : "An interactive architectural exhibition dedicated to curated conceptual paintings, sketches, and drafts."}
          </p>
          <div style={{ fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.12em", color: "var(--c-red)", textTransform: "uppercase", marginTop: "1rem" }}>
            {t("Shaping, Peaceful, Living")}
          </div>
        </header>

        {/* Upload Zone & Limits Monitor */}
        <section className={styles.uploadSection}>
          <div className={styles.uploadGrid}>
            
            {/* Drag & Drop Card */}
            <div 
              className={`${styles.dragCard} ${dragActive ? styles.dragActive : ""}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*"
                style={{ display: "none" }}
              />
              <div className={styles.uploadIconWrapper}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4>{language === "ar" ? "اضغط أو اسحب عملك الفني هنا" : "Upload painting or sketch"}</h4>
              <p>{language === "ar" ? "يدعم الصور بصيغة PNG, JPG أو WEBP" : "Supports PNG, JPG, or WEBP images"}</p>
            </div>

            {/* Admin Control Gateway (Unlimited Moderation Mode) */}
            <div className={styles.adminCard}>
              <div className={styles.adminHeaderLabel}>
                <span className={styles.pulseDot} />
                <h3>{language === "ar" ? "بوابة الإشراف الإداري" : "ADMIN MODERATION GATEWAY"}</h3>
              </div>
              <div className={styles.adminStats}>
                <div className={styles.statItem}>
                  <span className={styles.statVal}>{artworks.length}</span>
                  <span className={styles.statLbl}>{language === "ar" ? "الأعمال المنشورة" : "Live Artworks"}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statVal}>{pendingArtworks.length}</span>
                  <span className={styles.statLbl}>{language === "ar" ? "قيد المراجعة" : "Pending Review"}</span>
                </div>
              </div>
              
              {/* Secret Admin Button "Gallery Received" */}
              <div className={styles.adminActionRow}>
                <button 
                  onClick={handleAdminPanelOpen} 
                  className={styles.adminPanelBtn}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.inboxIcon}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-3.5 3.5a1 1 0 01-1.4 0L12 14.5l-3.1 3.1a1 1 0 01-1.4 0L4 14" />
                  </svg>
                  <span>{language === "ar" ? "المرفوعات الواردة" : "Gallery Received"}</span>
                  {pendingArtworks.length > 0 && (
                    <span className={styles.pendingBadge}>{pendingArtworks.length}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Gallery Grid Section (Edge-to-Edge) */}
      <section className={styles.galleryGridSection}>
        <div className={styles.folderGrid}>
          {folderArtists.map((artistKey) => {
            const folderArts = foldersMap[artistKey] || [];
            const coverArt = folderArts[0];
            const isDrAshraf = artistKey.includes("Ashraf") || artistKey.includes("أشرف");
            const folderTitleText = isDrAshraf
              ? (language === "ar" ? "أعمال د. أشرف الفنية" : "Dr. Ashraf Artwork")
              : (language === "ar" ? `أعمال ${artistKey} الفنية` : `${artistKey} Artwork`);

            return (
              <div 
                key={artistKey} 
                className={styles.folderCard} 
                onClick={() => {
                  setSelectedFolderArtist(artistKey);
                  setIsFolderOpen(true);
                }}
              >
                <div className={styles.folderTab}>{language === "ar" ? "معرض" : "Exhibition"}</div>
                <div className={styles.folderCoverWrapper}>
                  {coverArt && (
                    <Image
                      src={coverArt.src}
                      alt={`${folderTitleText} Cover`}
                      fill
                      sizes="320px"
                      className={styles.folderCoverImage}
                      priority={isDrAshraf}
                    />
                  )}
                </div>
                <div className={styles.folderDetails}>
                  <h3 className={styles.folderTitle}>{folderTitleText}</h3>
                  <span className={styles.folderCount}>
                    {language === "ar" ? `${folderArts.length} عمل فني` : `${folderArts.length} Artworks`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Folder Window Overlay */}
      {isFolderOpen && selectedFolderArtist && (
        <div className={styles.folderOverlayModal} onClick={() => { setIsFolderOpen(false); setSelectedFolderArtist(null); }}>
          <div className={styles.folderWindow} onClick={(e) => e.stopPropagation()}>
            <div className={styles.folderWindowHeader}>
              <h2 className={styles.folderWindowTitle}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style={{ color: "var(--c-red)" }}>
                  <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 11H5V8h14v9z"/>
                </svg>
                {selectedFolderArtist.includes("Ashraf") || selectedFolderArtist.includes("أشرف")
                  ? (language === "ar" ? "أعمال د. أشرف الفنية" : "Dr. Ashraf Artwork")
                  : (language === "ar" ? `أعمال ${selectedFolderArtist} الفنية` : `${selectedFolderArtist} Artwork`)}
              </h2>
              <button className={styles.closeFolderBtn} onClick={() => { setIsFolderOpen(false); setSelectedFolderArtist(null); }} aria-label="Close Folder">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className={styles.folderWindowContent}>
              <div className={styles.exhibitionGrid}>
                {(foldersMap[selectedFolderArtist] || []).map((art) => (
                  <div 
                    key={art.id} 
                    className={styles.artFrameCard}
                    onClick={() => setLightboxArt(art)}
                  >
                    <div className={styles.artImageWrapper}>
                      <Image 
                        src={art.src} 
                        alt={art.title}
                        width={600}
                        height={800}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block"
                        }}
                        className={styles.artImage}
                      />
                      
                      {/* Hover Plaque Info Overlay */}
                      <div className={styles.plaqueOverlay}>
                        <h3 className={styles.artTitle}>{art.title}</h3>
                        <div className={styles.plaqueMeta}>
                          <span className={styles.artArtist}>{art.artist}</span>
                          <span className={styles.artDate}>{art.date.split("-")[0]}</span>
                        </div>
                      </div>

                      {/* Delete Button for User Uploads */}
                      {art.isUserUploaded && (
                        <button 
                          onClick={(e) => deleteArtwork(art.id, e)}
                          className={styles.deleteBtn}
                          title={language === "ar" ? "حذف العمل" : "Delete Artwork"}
                          aria-label="Delete Artwork"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {(!foldersMap[selectedFolderArtist] || foldersMap[selectedFolderArtist].length === 0) && (
                <div className={styles.emptyGallery}>
                  <p>{language === "ar" ? "لا توجد أعمال فنية معروضة حالياً." : "No artworks found."}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox / Immersive Frame Modal */}
      {lightboxArt && (
        <div className={styles.lightboxOverlay} onClick={() => setLightboxArt(null)}>
          <button className={styles.closeLightbox} onClick={() => setLightboxArt(null)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxFrame}>
              <div className={styles.lightboxImageWrapper}>
                <Image 
                  src={lightboxArt.src} 
                  alt={lightboxArt.title}
                  width={1400}
                  height={1000}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "75vh",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: "2px"
                  }}
                  className={styles.lightboxImage}
                />
              </div>
            </div>

            <div className={styles.lightboxPlaque}>
              <h2>{lightboxArt.title}</h2>
              <p className={styles.lightboxArtist}>{lightboxArt.artist}</p>
              <div className={styles.lightboxMeta}>
                <span>{language === "ar" ? `التصنيف: ${lightboxArt.type === "sketch" ? "رسم" : "لوحة"}` : `Type: ${lightboxArt.type}`}</span>
                <span>{language === "ar" ? `العام: ${lightboxArt.date}` : `Date: ${lightboxArt.date}`}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Secret Admin Panel Modal (Gallery Received Inbox) */}
      {showAdminPanel && (
        <div className={styles.adminOverlay} onClick={() => setShowAdminPanel(false)}>
          <div className={styles.adminModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.adminHeader}>
              <h2>{language === "ar" ? "المرفوعات الواردة" : "Gallery Received"}</h2>
              <button className={styles.closeAdminBtn} onClick={() => setShowAdminPanel(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className={styles.adminList}>
              {pendingArtworks.map((art) => (
                <div key={art.id} className={styles.pendingItem}>
                  <div className={styles.pendingImageWrapper}>
                    <img src={art.src} alt={art.title} className={styles.pendingImage} />
                  </div>
                  
                  <div className={styles.pendingDetails}>
                    <h4>{art.title}</h4>
                    <p>{t(art.type.toUpperCase())} • {art.date}</p>
                  </div>

                  <div className={styles.pendingActions}>
                    <button 
                      onClick={() => acceptArtwork(art)} 
                      className={styles.acceptBtn}
                      title={language === "ar" ? "قبول ونشر العمل" : "Accept and Publish"}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => declineArtwork(art.id)} 
                      className={styles.declineBtn}
                      title={language === "ar" ? "رفض العمل" : "Decline Artwork"}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              {pendingArtworks.length === 0 && (
                <div className={styles.emptyInbox}>
                  <p>{language === "ar" ? "لا توجد أعمال فنية واردة للمراجعة حالياً." : "No pending uploads in the moderation queue."}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}



      {/* Success Modal (Pending Admin Review) */}
      {showUploadSuccess && (
        <div className={styles.limitAlertOverlay} onClick={() => setShowUploadSuccess(false)}>
          <div className={styles.limitAlertModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.successIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2>{language === "ar" ? "تم التقديم بنجاح!" : "Submission Successful!"}</h2>
            <p>
              {language === "ar"
                ? "تم إرسال عملك الفني بنجاح. سيظهر في معرض الصور فور مراجعته وقبوله من قبل مسؤول المعرض."
                : "Your artwork has been submitted successfully! It is now pending review in 'Gallery Received' before going live."}
            </p>
            <button onClick={() => setShowUploadSuccess(false)} className={styles.alertCloseBtn} style={{ backgroundColor: "#25d366" }}>
              {language === "ar" ? "موافق" : "GREAT"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
