export interface MovieItem {
  slug: string;
  title: string;
  videoId: string;
  featuredImage: string;
  sector: string;
  location: string;
}

export interface MovieTimestampItem {
  videoId: string;
  keywords: string[];
  timestamp: number;
  timestampLabel: string;
  topic: string;
  topicAr: string;
}

export const MOVIES: MovieItem[] = [
  {
    slug: "skiv-saudi-korean-industrial-village",
    title: "SKIV Saudi Korean Industrial Village",
    videoId: "v7cYXQv2KNs",
    featuredImage: "https://img.youtube.com/vi/v7cYXQv2KNs/maxresdefault.jpg",
    sector: "Industrial & Infrastructure",
    location: "Jazan, Kingdom of Saudi Arabia (KSA)"
  },
  {
    slug: "metatut-metaverse",
    title: "Metatut: A Metaverse Inspired by Tutankhamun",
    videoId: "Y4dSXUS1kRc",
    featuredImage: "https://img.youtube.com/vi/Y4dSXUS1kRc/maxresdefault.jpg",
    sector: "Virtual World & Metaverse Development",
    location: "Tutera Digital Realm"
  },
  {
    slug: "gaza-calls",
    title: "Gaza calls غزة تنادى",
    videoId: "TQho13xoSyk",
    featuredImage: "https://img.youtube.com/vi/TQho13xoSyk/maxresdefault.jpg",
    sector: "Mixed-Use & Visions",
    location: "Gaza, Palestine"
  },
  {
    slug: "nebu-commercial-mall",
    title: "Nebu Commercial Mall",
    videoId: "7MjqpCLiozo",
    featuredImage: "https://img.youtube.com/vi/7MjqpCLiozo/maxresdefault.jpg",
    sector: "Commercial & Retail",
    location: "New Administrative Capital, Egypt"
  },
  {
    slug: "sahara-international-school",
    title: "Sahara International School",
    videoId: "aA_chQ69WlM",
    featuredImage: "https://img.youtube.com/vi/aA_chQ69WlM/maxresdefault.jpg",
    sector: "Culture & Education",
    location: "New Administrative Capital, Cairo, Egypt"
  },
  {
    slug: "riviera-sahl-hashish",
    title: "Riviera Sahl Hasheesh",
    videoId: "LUfiiXa-cec",
    featuredImage: "https://img.youtube.com/vi/LUfiiXa-cec/hqdefault.jpg",
    sector: "Residential & Resorts",
    location: "Sahl Hasheesh, Hurghada, Egypt"
  },
  {
    slug: "tut-lodge-wellness-resort",
    title: "Tut Lodge",
    videoId: "IxRNXNxbddA",
    featuredImage: "https://img.youtube.com/vi/IxRNXNxbddA/hqdefault.jpg",
    sector: "Residential & Resorts",
    location: "Aswan, Egypt"
  },
  {
    slug: "vortex-resorts",
    title: "Vortex Resorts",
    videoId: "JyjbPvK-qOg",
    featuredImage: "https://img.youtube.com/vi/JyjbPvK-qOg/hqdefault.jpg",
    sector: "Residential & Resorts",
    location: "Hurghada, Red Sea, Egypt"
  },
  {
    slug: "suez-canal-entrance-waterfront",
    title: "The Suez Canal Entrance Waterfront",
    videoId: "0ras66hmSxg",
    featuredImage: "https://img.youtube.com/vi/0ras66hmSxg/hqdefault.jpg",
    sector: "Mixed-Use & Visions",
    location: "Suez Canal, Egypt"
  },
  {
    slug: "kemet-tower",
    title: "Kemet Tower, New Administrative Capital Cairo, Egypt",
    videoId: "cqPHMVkU1Vk",
    featuredImage: "https://img.youtube.com/vi/cqPHMVkU1Vk/hqdefault.jpg",
    sector: "Commercial & Retail",
    location: "New Administrative Capital, Cairo, Egypt"
  },
  {
    slug: "crystal-pyramid-vision-sun-capital",
    title: "Crystal Pyramid Vision - Sun Capital, Giza",
    videoId: "G2w8poYtCb4",
    featuredImage: "https://img.youtube.com/vi/G2w8poYtCb4/hqdefault.jpg",
    sector: "Mixed-Use & Visions",
    location: "Sun Capital, Giza, Egypt"
  }
];

export const MOVIE_TIMESTAMPS: MovieTimestampItem[] = [
  {
    videoId: "Y4dSXUS1kRc",
    keywords: ["villa", "villas", "landscape", "landscaping", "greenery", "metaverse", "فيلا", "فيلات", "لاندسكيب", "طبيعة", "ميتافيرس"],
    timestamp: 45,
    timestampLabel: "00:45",
    topic: "Virtual Landscapes & Metaverse Walkthrough",
    topicAr: "المساحات الخضراء واللاندسكيب الافتراضي وجولة الميتافيرس"
  },
  {
    videoId: "v7cYXQv2KNs",
    keywords: ["skiv", "industrial", "korean", "infrastructure", "صناعي", "بنية تحتية", "اسكيف"],
    timestamp: 60,
    timestampLabel: "01:00",
    topic: "Industrial & Infrastructure Development Zoning",
    topicAr: "مناطق التطوير الصناعي والبنية التحتية"
  },
  {
    videoId: "TQho13xoSyk",
    keywords: ["gaza", "palestine", "reconstruction", "vision", "identity", "غزة", "فلسطين", "إعمار", "رؤية", "هوية"],
    timestamp: 90,
    timestampLabel: "01:30",
    topic: "Urban Reconstruction Vision for Gaza",
    topicAr: "رؤية إعادة الإعمار والتخطيط العمراني لغزة"
  },
  {
    videoId: "7MjqpCLiozo",
    keywords: ["nebu", "commercial", "mall", "retail", "gold", "نيبو", "تجاري", "مول", "تجزئة", "ذهب"],
    timestamp: 30,
    timestampLabel: "00:30",
    topic: "Gold Hieroglyphic Circular Concept Flow",
    topicAr: "مفهوم التدفق الدائري المستوحى من رمز الذهب الفرعوني"
  },
  {
    videoId: "aA_chQ69WlM",
    keywords: ["school", "education", "sahara", "مدرسة", "تعليم", "الصحراء", "مدرسه"],
    timestamp: 45,
    timestampLabel: "00:45",
    topic: "Sahara School Modern Learning Spaces",
    topicAr: "مساحات التعلم الحديثة بمدرسة الصحراء"
  },
  {
    videoId: "LUfiiXa-cec",
    keywords: ["riviera", "sahl hasheesh", "ريفييرا", "ريفيرا", "سهل حشيش"],
    timestamp: 60,
    timestampLabel: "01:00",
    topic: "Riviera Sahl Hasheesh Coastal Architecture",
    topicAr: "العمارة الساحلية بريفيرا سهل حشيش"
  },
  {
    videoId: "IxRNXNxbddA",
    keywords: ["tut lodge", "wellness", "aswan", "نزل توت", "توت", "أسوان", "اسوان"],
    timestamp: 45,
    timestampLabel: "00:45",
    topic: "Tut Lodge Wellness Resort Concept",
    topicAr: "مفهوم منتجع نزل توت الاستشفائي"
  },
  {
    videoId: "JyjbPvK-qOg",
    keywords: ["vortex", "resorts", "hurghada", "فورتكس", "منتجعات", "الغردقة", "الغردقه"],
    timestamp: 50,
    timestampLabel: "00:50",
    topic: "Vortex Resorts Architecture & Lagoons",
    topicAr: "عمارة منتجعات فورتكس والبحيرات المائية"
  },
  {
    videoId: "0ras66hmSxg",
    keywords: ["suez", "canal", "waterfront", "entrance", "السويس", "قناة", "واجهة بحرية", "مدخل"],
    timestamp: 60,
    timestampLabel: "01:00",
    topic: "Suez Canal Entrance Waterfront Design",
    topicAr: "تصميم الواجهة البحرية لمدخل قناة السويس"
  },
  {
    videoId: "cqPHMVkU1Vk",
    keywords: ["kemet", "tower", "capital", "cairo", "كيميت", "برج", "العاصمة الإدارية", "القاهرة"],
    timestamp: 45,
    timestampLabel: "00:45",
    topic: "Kemet Tower Architectural Concept",
    topicAr: "المفهوم المعماري لبرج كيميت"
  },
  {
    videoId: "G2w8poYtCb4",
    keywords: ["crystal", "pyramid", "sun capital", "giza", "كريستال", "هرم", "صن كابيتال", "الجيزة"],
    timestamp: 50,
    timestampLabel: "00:50",
    topic: "Crystal Pyramid Vision & Sun Capital Masterplan",
    topicAr: "رؤية الهرم الكريستالي ومخطط صن كابيتال"
  }
];

export const MOVIE_ALIASES: Record<string, string[]> = {
  "skiv-saudi-korean-industrial-village": ["skiv", "saudi korean", "industrial village", "اسكيف", "القرية الصناعية", "اس كيه اي في"],
  "metatut-metaverse": ["metatut", "metaverse tut", "ميتاتوت", "ميتا توت", "ميتافيرس"],
  "gaza-calls": ["gaza", "palestine", "reconstruction", "غزة", "فلسطين", "غزه"],
  "nebu-commercial-mall": ["nebu", "mall", "commercial mall", "نيبو", "مول نيبو", "مول"],
  "sahara-international-school": ["sahara", "sahara school", "sahara international school", "مدرسة الصحراء", "الصحراء الدولية", "مدرسة الصحراء الدولية", "صحراء"],
  "riviera-sahl-hashish": ["riviera", "sahl hasheesh", "ريفييرا", "ريفيرا", "سهل حشيش"],
  "tut-lodge-wellness-resort": ["tut lodge", "wellness", "aswan", "نزل توت", "توت", "أسوان", "اسوان"],
  "vortex-resorts": ["vortex", "resorts", "hurghada", "فورتكس", "منتجعات", "الغردقة", "الغردقه"],
  "suez-canal-entrance-waterfront": ["suez", "canal", "waterfront", "السويس", "قناة السويس", "واجهة بحرية"],
  "kemet-tower": ["kemet", "tower", "كيميت", "برج كيميت", "برج"],
  "crystal-pyramid-vision-sun-capital": ["crystal", "pyramid", "sun capital", "كريستال", "هرم", "صن كابيتال", "الجيزة"]
};
