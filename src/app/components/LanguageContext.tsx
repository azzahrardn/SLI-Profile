import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "en" | "id";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggleLang: () => {},
  t: (key: string) => key,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

const translations: Record<string, Record<Lang, string>> = {
  // ── Navbar links ──
  "nav.about": { en: "About", id: "Tentang" },
  "nav.visionMission": { en: "Vision & Mission", id: "Visi & Misi" },
  "nav.affiliation": { en: "Affiliation", id: "Afiliasi" },
  "nav.team": { en: "Team", id: "Tim" },
  "nav.technology": { en: "Technology", id: "Teknologi" },
  "nav.products": { en: "Products", id: "Produk" },
  "nav.whySLI": { en: "Why SLI", id: "Mengapa SLI" },
  "nav.contact": { en: "Contact", id: "Kontak" },

  // ── Hero ──
  "hero.subtitle": { en: "PT Solusi Layar International", id: "PT Solusi Layar International" },
  "hero.title1": { en: "Navigating the Future of", id: "Mengarungi Masa Depan" },
  "hero.titleHighlight": { en: "Maritime Operations", id: "Operasi Maritim" },
  "hero.tagline": { en: "Ship Fleet Operation & Performance Management", id: "Manajemen Operasi & Performa Armada Kapal" },
  "hero.tagline2": { en: "Through Digital Transformation", id: "Melalui Transformasi Digital" },
  "hero.cta": { en: "Explore More", id: "Jelajahi Lebih Lanjut" },

  // ── About (Section 01) ──
  "about.label": { en: "01 — About Us", id: "01 — Tentang Kami" },
  "about.heading": { en: "Who We Are & Why We Exist", id: "Siapa Kami & Mengapa Kami Ada" },
  "about.p1": {
    en: "PT Solusi Layar International (SLI) is a maritime technology company founded with one critical mission: to transform how ship fleets are operated, monitored, and optimized in the digital era. We are not just a software provider — we are a strategic partner that understands the sea, understands ships, and understands the shipping business from the inside.",
    id: "PT Solusi Layar International (SLI) adalah perusahaan teknologi maritim yang didirikan dengan satu misi kritis: mentransformasi cara armada kapal dioperasikan, dipantau, dan dioptimalkan di era digital. Kami bukan sekadar penyedia software — kami adalah mitra strategis yang memahami laut, memahami kapal, dan memahami bisnis pelayaran dari dalam.",
  },
  "about.p1Highlight": {
    en: "to transform how ship fleets are operated, monitored, and optimized in the digital era.",
    id: "mentransformasi cara armada kapal dioperasikan, dipantau, dan dioptimalkan di era digital.",
  },
  "about.p1Before": {
    en: "PT Solusi Layar International (SLI) is a maritime technology company founded with one critical mission: ",
    id: "PT Solusi Layar International (SLI) adalah perusahaan teknologi maritim yang didirikan dengan satu misi kritis: ",
  },
  "about.p1After": {
    en: " We are not just a software provider — we are a strategic partner that understands the sea, understands ships, and understands the shipping business from the inside.",
    id: " Kami bukan sekadar penyedia software — kami adalah mitra strategis yang memahami laut, memahami kapal, dan memahami bisnis pelayaran dari dalam.",
  },
  "about.p2Before": {
    en: "At the intersection of ",
    id: "Di persimpangan antara ",
  },
  "about.p2After": {
    en: ", SLI delivers world-class fleet management solutions specifically designed for the unique challenges of Indonesia's and the global maritime industry.",
    id: ", SLI menghadirkan solusi manajemen armada kelas dunia yang dirancang khusus untuk tantangan unik industri maritim Indonesia dan global.",
  },
  "about.quote": {
    en: "\"We believe that the best technology is technology that doesn't replace humans, but empowers them to make better, faster, and more confident decisions.\"",
    id: "\"Kami percaya bahwa teknologi terbaik adalah teknologi yang tidak menggantikan manusia, tetapi memberdayakan mereka untuk membuat keputusan yang lebih baik, lebih cepat, dan lebih percaya diri.\"",
  },

  // ── Vision & Mission (Section 02) ──
  "vm.label": { en: "02 — Vision & Mission", id: "02 — Visi & Misi" },
  "vm.heading": { en: "Our North Star", id: "Bintang Penuntun Kami" },
  "vm.visionTitle": { en: "VISION", id: "VISI" },
  "vm.visionText": {
    en: "To be the pioneer of maritime digital transformation in Southeast Asia — leading an era where every sailing vessel is connected, optimized, and contributing to a more efficient, safe, and sustainable shipping industry.",
    id: "Menjadi pelopor transformasi digital maritim di Asia Tenggara — memimpin era di mana setiap kapal yang berlayar terhubung, teroptimasi, dan berkontribusi pada industri pelayaran yang lebih efisien, aman, dan berkelanjutan.",
  },
  "vm.missionTitle": { en: "MISSION", id: "MISI" },
  "vm.mission1": {
    en: "Integrating people, process, and technology into one cohesive and intuitive fleet management ecosystem.",
    id: "Mengintegrasikan people, process, dan technology dalam satu ekosistem manajemen armada yang kohesif dan intuitif.",
  },
  "vm.mission2": {
    en: "Delivering cutting-edge Digital Twin and data acquisition solutions that can be implemented without operational disruption.",
    id: "Menghadirkan solusi Digital Twin dan data acquisition mutakhir yang dapat diimplementasi tanpa disrupsi operasional.",
  },
  "vm.mission3": {
    en: "Empowering fleet operators and managers with real-time insights that drive data-driven decisions.",
    id: "Memberdayakan operator dan manajer armada dengan insight real-time yang mendorong keputusan berbasis data.",
  },
  "vm.mission4": {
    en: "Ensuring every SLI partner achieves cost efficiency, fleet reliability, and sustainable competitive advantage.",
    id: "Memastikan setiap mitra SLI meraih efisiensi biaya, keandalan armada, dan keunggulan kompetitif yang berkelanjutan.",
  },

  // ── Affiliation (Section 03) ──
  "aff.label": { en: "03 — Affiliation & Expertise Foundation", id: "03 — Afiliasi & Fondasi Keahlian" },
  "aff.heading": { en: "Built on Decades of Maritime Engineering Excellence", id: "Dibangun di Atas Puluhan Tahun Keunggulan Rekayasa Maritim" },
  "aff.introBefore": {
    en: "SLI's strength is closely affiliated with ",
    id: "Kekuatan SLI berafiliasi erat dengan ",
  },
  "aff.introAfter": {
    en: ", an influential maritime engineering firm with a long track record in three critical domains:",
    id: ", sebuah firma rekayasa maritim berpengaruh dengan rekam jejak panjang dalam tiga domain kritis:",
  },
  "aff.svc1Title": { en: "Ship Design", id: "Ship Design" },
  "aff.svc1Desc": {
    en: "Designing ships from concept to final technical drawings, ensuring every specification aligns with international regulations and client operational needs.",
    id: "Merancang kapal dari konsep hingga gambar teknis akhir, memastikan setiap spesifikasi selaras dengan regulasi internasional dan kebutuhan operasional klien.",
  },
  "aff.svc2Title": { en: "Shipbuilding Project Management", id: "Shipbuilding Project Management" },
  "aff.svc2Desc": {
    en: "Comprehensively managing the shipbuilding process — from material procurement to handover — with uncompromising quality standards.",
    id: "Mengelola proses pembangunan kapal secara komprehensif — dari pengadaan material hingga serah terima — dengan standar kualitas yang tidak berkompromi.",
  },
  "aff.svc3Title": { en: "Supervision & Class Compliance", id: "Supervision & Class Compliance" },
  "aff.svc3Desc": {
    en: "Supervising construction and ensuring compliance with international classification standards (BKI, DNV, Lloyd's Register, and others).",
    id: "Mengawasi konstruksi dan memastikan kepatuhan terhadap standar klasifikasi internasional (BKI, DNV, Lloyd's Register, dan lainnya).",
  },
  "aff.footer1": {
    en: "This affiliation gives SLI something invaluable: ",
    id: "Afiliasi ini memberikan SLI sesuatu yang tidak ternilai: ",
  },
  "aff.footerHighlight": {
    en: "deep understanding of ship anatomy, operational realities on deck, and the technical language",
    id: "pemahaman mendalam tentang anatomi kapal, realitas operasional di atas dek, dan bahasa teknis",
  },
  "aff.footer2": {
    en: " that makes communication with clients and shipyards far more effective and efficient.",
    id: " yang membuat komunikasi dengan klien dan galangan menjadi jauh lebih efektif dan efisien.",
  },

  // ── Team (Section 04) ──
  "team.label": { en: "04 — Team Capabilities", id: "04 — Kapabilitas Tim" },
  "team.heading": { en: "A Rare Convergence of Expertise", id: "Perpaduan Langka Keahlian" },
  "team.subtitle": {
    en: "What sets SLI apart from other players is the composition of our team — a rare blend of experienced maritime engineers, world-class software architects, and industry practitioners from various sectors.",
    id: "Yang membedakan SLI dari pemain lain adalah komposisi tim kami — sebuah perpaduan langka antara insinyur maritim berpengalaman, arsitek software kelas global, dan praktisi industri dari berbagai sektor.",
  },
  "team.cap1Title": { en: "Global Software Development", id: "Global Software Development" },
  "team.cap1Desc": {
    en: "Our development team has designed and delivered enterprise-grade solutions for clients across various parts of the world. Our system architecture is built with the principles of scalability, reliability, and security from the foundation.",
    id: "Tim pengembang kami telah merancang dan mengirimkan solusi enterprise-grade untuk klien di berbagai belahan dunia. Arsitektur sistem kami dibangun dengan prinsip scalability, reliability, dan security sejak fondasi.",
  },
  "team.cap2Title": { en: "Core Networking & Telecommunications", id: "Core Networking & Telekomunikasi" },
  "team.cap2Desc": {
    en: "Deep expertise in network infrastructure and telecommunications systems enables SLI to design robust ship data connectivity — from VSAT to LTE/5G coastal, even in the most remote waters.",
    id: "Keahlian mendalam dalam infrastruktur jaringan dan sistem telekomunikasi memungkinkan SLI merancang konektivitas data kapal yang robust — dari VSAT hingga LTE/5G coastal, bahkan di perairan terpencil sekalipun.",
  },
  "team.cap3Title": { en: "Corporate Finance", id: "Corporate Finance" },
  "team.cap3Desc": {
    en: "Financial analysis capabilities enable us to calculate and prove the ROI of every solution we offer — speaking in the language best understood by business decision-makers.",
    id: "Kemampuan analisis finansial memungkinkan kami menghitung dan membuktikan ROI dari setiap solusi yang kami tawarkan — berbicara dalam bahasa yang paling dipahami oleh pengambil keputusan bisnis.",
  },
  "team.cap4Title": { en: "Corporate Consulting", id: "Corporate Consulting" },
  "team.cap4Desc": {
    en: "We don't just implement technology; we help clients map out their digital transformation roadmap strategically, from assessment to execution and continuous optimization.",
    id: "Kami tidak hanya mengimplementasikan teknologi; kami membantu klien memetakan roadmap transformasi digital mereka secara strategis, dari assessment hingga eksekusi dan optimasi berkelanjutan.",
  },

  // ── Technology (Section 05) ──
  "tech.label": { en: "05 — Leading Technology", id: "05 — Teknologi Unggulan" },
  "tech.heading": { en: "The Tools That Redefine Maritime Intelligence", id: "Alat yang Mendefinisikan Ulang Inteligensi Maritim" },
  "tech.item1Title": { en: "World-Class Maritime Toolset", id: "World-Class Maritime Toolset" },
  "tech.item1Desc": {
    en: "SLI's platform integrates global maritime industry standard tools — from integrated AIS/VMS systems, real-time fleet management dashboards, to reporting modules compliant with IMO regulations and local port authorities.",
    id: "Platform SLI mengintegrasikan standar tools industri maritim global — mulai dari sistem AIS/VMS terintegrasi, fleet management dashboard real-time, hingga modul pelaporan yang sesuai dengan regulasi IMO dan otoritas pelabuhan lokal.",
  },
  "tech.item2Title": { en: "Digital Twin Modelling", id: "Digital Twin Modelling" },
  "tech.item2Desc": {
    en: "Our Digital Twin technology enables route and fuel consumption simulation with unprecedented accuracy. By building virtual replicas of every vessel in your fleet — complete with hydrodynamic characteristics, engine conditions, and cargo parameters.",
    id: "Teknologi Digital Twin kami memungkinkan simulasi rute dan konsumsi bahan bakar dengan akurasi yang belum pernah ada sebelumnya. Dengan membangun replika virtual dari setiap kapal dalam armada Anda — lengkap dengan karakteristik hidrodinamika, kondisi mesin, dan parameter kargo.",
  },
  "tech.item3Title": { en: "Seamless Data Acquisition", id: "Seamless Data Acquisition" },
  "tech.item3Desc": {
    en: "SLI is designed to integrate with existing infrastructure — no expensive hardware upgrades needed, no crew workflow changes, no operational downtime. Data flows seamlessly from your existing sensors and systems directly to the SLI platform.",
    id: "SLI dirancang untuk berintegrasi dengan infrastruktur yang sudah ada — tanpa perlu upgrade hardware mahal, tanpa perubahan workflow kru, tanpa downtime operasional. Data mengalir mulus dari sensor dan sistem existing Anda langsung ke platform SLI.",
  },

  // ── Our Products (Section 06) ──
  "products.label": { en: "06 — Our Products", id: "06 — Produk Kami" },
  "products.heading": { en: "Comprehensive Maritime Solutions", id: "Solusi Maritim Komprehensif" },
  "products.subheading": {
    en: "Advanced technology platforms designed to transform your fleet operations with digital innovation and AI-powered intelligence",
    id: "Platform teknologi canggih yang dirancang untuk mentransformasi operasi armada Anda dengan inovasi digital dan kecerdasan berbasis AI",
  },
  "products.tabFleetMaster": { en: "SLI Fleet Master", id: "SLI Fleet Master" },
  "products.tabNauticamAI": { en: "NautiCamAI", id: "NautiCamAI" },
  "products.fleetMaster.featuresTitle": { en: "Core Capabilities", id: "Kemampuan Utama" },
  "products.fleetMaster.feature1Title": { en: "Fleet Supervision", id: "Pengawasan Armada" },
  "products.fleetMaster.feature1Desc": {
    en: "Centralized real-time monitoring and management of entire fleet with comprehensive visibility into vessel status, location, and operational health",
    id: "Pemantauan dan manajemen terpusat secara real-time untuk seluruh armada dengan visibilitas komprehensif terhadap status, lokasi, dan kesehatan operasional kapal",
  },
  "products.fleetMaster.feature2Title": { en: "Voyage Supervision", id: "Pengawasan Perjalanan" },
  "products.fleetMaster.feature2Desc": {
    en: "Real-time oversight of individual voyages tracking route adherence, performance metrics, and enabling proactive decision-making",
    id: "Pengawasan real-time perjalanan individual dengan pelacakan kepatuhan rute, metrik performa, dan pengambilan keputusan proaktif",
  },
  "products.fleetMaster.feature3Title": { en: "Voyage Path Optimization", id: "Optimasi Rute Perjalanan" },
  "products.fleetMaster.feature3Desc": {
    en: "AI-powered route optimization considering weather, sea conditions, and fuel consumption for maximum efficiency and cost-effectiveness",
    id: "Optimasi rute berbasis AI yang mempertimbangkan cuaca, kondisi laut, dan konsumsi bahan bakar untuk efisiensi dan efektivitas biaya maksimal",
  },
  "products.fleetMaster.feature4Title": { en: "E-log Book", id: "Buku Log Digital" },
  "products.fleetMaster.feature4Desc": {
    en: "Digital real-time logbook replacing paper-based records with automatic data capture, secure storage, and regulatory compliance",
    id: "Buku log digital real-time menggantikan record berbasis kertas dengan capture data otomatis, penyimpanan aman, dan kepatuhan regulasi",
  },
  "products.fleetMaster.feature5Title": { en: "Weather Forecast", id: "Prakiraan Cuaca" },
  "products.fleetMaster.feature5Desc": {
    en: "Advanced weather data integration with predictive analytics for hazard alerts and voyage adjustment recommendations",
    id: "Integrasi data cuaca canggih dengan analitik prediktif untuk peringatan bahaya dan rekomendasi penyesuaian perjalanan",
  },
  "products.fleetMaster.feature6Title": { en: "Chart Data & Noon Report", id: "Data Peta & Laporan Tengah Hari" },
  "products.fleetMaster.feature6Desc": {
    en: "Comprehensive navigational data with automated noon reports combining chart data, position, speed, and fuel consumption updates",
    id: "Data navigasi komprehensif dengan laporan tengah hari otomatis menggabungkan data peta, posisi, kecepatan, dan update konsumsi bahan bakar",
  },
  "products.nauticamAI.featuresTitle": { en: "Capabilities", id: "Kemampuan" },
  "products.nauticamAI.feature1Title": { en: "AI-Powered Event Detection", id: "Deteksi Peristiwa Berbasis AI" },
  "products.nauticamAI.feature1Desc": {
    en: "Real-time anomaly detection using advanced computer vision technology",
    id: "Deteksi anomali real-time menggunakan teknologi computer vision canggih",
  },
  "products.nauticamAI.feature2Title": { en: "Onboard & Onshore Dashboards", id: "Dashboard Kapal & Pantai" },
  "products.nauticamAI.feature2Desc": {
    en: "Unified dashboards enabling seamless ship-shore collaboration and insights sharing",
    id: "Dashboard terpadu yang memungkinkan kolaborasi kapal-pantai yang mulus dan berbagi insight",
  },
  "products.nauticamAI.feature3Title": { en: "Multi-Area Monitoring", id: "Monitoring Multi-Area" },
  "products.nauticamAI.feature3Desc": {
    en: "Comprehensive coverage: security, bridge, cargo, safety, maintenance, and pollution",
    id: "Cakupan komprehensif: keamanan, jembatan, kargo, keselamatan, pemeliharaan, dan polusi",
  },
  "products.nauticamAI.feature4Title": { en: "External Data Integration", id: "Integrasi Data Eksternal" },
  "products.nauticamAI.feature4Desc": {
    en: "Enriched insights with AIS and weather data for comprehensive situational awareness",
    id: "Insight yang diperkaya dengan data AIS dan cuaca untuk kesadaran situasional yang komprehensif",
  },
  "products.nauticamAI.feature5Title": { en: "Digital Event Log", id: "Log Peristiwa Digital" },
  "products.nauticamAI.feature5Desc": {
    en: "Searchable video-to-insight conversion transforming raw footage into actionable intelligence",
    id: "Konversi video-ke-insight yang dapat dicari mengubah rekaman mentah menjadi intelijen yang dapat ditindaklanjuti",
  },
  "products.nauticamAI.feature6Title": { en: "Automated Alerts", id: "Peringatan Otomatis" },
  "products.nauticamAI.feature6Desc": {
    en: "Proactive notifications for hazards, anomalies, and operational inefficiencies",
    id: "Notifikasi proaktif untuk bahaya, anomali, dan ketidakefisienan operasional",
  },

  // ── Why SLI (Section 07) ──
  "why.label": { en: "07 — Why SLI?", id: "07 — Mengapa SLI?" },
  "why.heading": { en: "The Strategic Case for Choosing SLI", id: "Alasan Strategis Memilih SLI" },
  "why.r1Title": { en: "People + Technology, Not One or the Other", id: "People + Technology, Bukan Salah Satu" },
  "why.r1Desc": {
    en: "SLI integrates a powerful technology platform, accompanied by a team of experts who understand maritime operations from the inside.",
    id: "SLI mengintegrasikan platform teknologi yang powerful, didampingi oleh tim ahli yang memahami operasi maritim dari dalam.",
  },
  "why.r2Title": { en: "Unmatched Domain Expertise", id: "Domain Expertise yang Tidak Tertandingi" },
  "why.r2Desc": {
    en: "With direct affiliation to PT Terafulk Megantara Design and a cross-industry experienced team, SLI speaks the same language as its clients.",
    id: "Dengan afiliasi langsung ke PT Terafulk Megantara Design dan tim berpengalaman lintas industri, SLI berbicara bahasa yang sama dengan klien.",
  },
  "why.r3Title": { en: "Implementation Without Disruption", id: "Implementasi Tanpa Disrupsi" },
  "why.r3Desc": {
    en: "Zero-friction onboarding is our promise. Our system adapts to your way of working. Valuable insights in days, not months.",
    id: "Zero-friction onboarding adalah janji kami. Sistem kami beradaptasi dengan cara kerja Anda. Insight berharga dalam hitungan hari, bukan bulan.",
  },
  "why.r4Title": { en: "Scalable from One Ship to a Large Fleet", id: "Skalabel dari Satu Kapal hingga Armada Besar" },
  "why.r4Desc": {
    en: "From single vessel operators to shipping companies with hundreds of units, the SLI platform grows with your needs.",
    id: "Dari operator kapal tunggal hingga perusahaan pelayaran dengan ratusan unit, platform SLI tumbuh bersama kebutuhan Anda.",
  },
  "why.r5Title": { en: "Measurable & Transparent ROI", id: "ROI yang Terukur dan Transparan" },
  "why.r5Desc": {
    en: "We don't just promise efficiency — we measure it. Every client gets a performance dashboard showing real-time savings.",
    id: "Kami tidak hanya berjanji efisiensi — kami mengukurnya. Setiap klien mendapatkan dashboard kinerja yang menunjukkan penghematan secara real-time.",
  },
  "why.r6Title": { en: "Report Accuracy: Weekly & Every Voyage", id: "Akurasi Report: Weekly & Every Voyage" },
  "why.r6Desc": {
    en: "Fleet performance reports are compiled accurately every week and every voyage — ensuring operational data is always up-to-date for strategic decision-making.",
    id: "Laporan performa armada disusun secara akurat setiap minggu dan setiap voyage — memastikan data operasional selalu up-to-date untuk pengambilan keputusan strategis.",
  },

  // ── CTA (Section 08) ──
  "cta.label": { en: "08 — Join the Transformation", id: "08 — Bergabunglah dalam Transformasi" },
  "cta.heading": { en: "Your Maritime Future Starts Here", id: "Masa Depan Maritim Anda Dimulai di Sini" },
  "cta.p1": {
    en: "The maritime industry is at an inflection point. Companies that invest in digital transformation today will define industry standards for the coming decade.",
    id: "Industri maritim sedang berada di titik infleksi. Perusahaan yang berinvestasi pada transformasi digital hari ini akan mendefinisikan standar industri untuk dekade mendatang.",
  },
  "cta.p2Before": {
    en: "PT Solusi Layar International is here as your ",
    id: "PT Solusi Layar International hadir sebagai ",
  },
  "cta.p2Highlight": {
    en: "strategic partner",
    id: "partner strategis Anda",
  },
  "cta.p2After": {
    en: " on this transformation journey.",
    id: " dalam perjalanan transformasi ini.",
  },
  "cta.quote": {
    en: "\"The sea doesn't wait. Neither should your data.\"",
    id: "\"The sea doesn't wait. Neither should your data.\"",
  },
  "cta.emailLabel": { en: "Email", id: "Email" },
  "cta.phoneLabel": { en: "Phone", id: "Telepon" },
  "cta.websiteLabel": { en: "Website", id: "Website" },
  "cta.button": { en: "Start Free Consultation", id: "Mulai Konsultasi Gratis" },
  "cta.response": { en: "Response within 1 x 24 business hours", id: "Respons dalam 1 x 24 jam kerja" },

  // ── Footer ──
  "footer.tagline": {
    en: "Ship Fleet Operation & Performance Management through Digital Transformation",
    id: "Ship Fleet Operation & Performance Management through Digital Transformation",
  },
  "footer.quickLinks": { en: "Quick Links", id: "Tautan Cepat" },
  "footer.contact": { en: "Contact", id: "Kontak" },
  "footer.location": { en: "Our Locations", id: "Lokasi Kami" },
  "footer.locationSurabaya": { en: "Surabaya (Headquarters)", id: "Surabaya (Pusat)" },
  "footer.addressSurabaya1": {
    en: "VieLoft Unit 2503 – Ciputra World Surabaya",
    id: "VieLoft Unit 2503 – Ciputra World Surabaya",
  },
  "footer.addressSurabaya2": {
    en: "Jl. Mayjen Sungkono No. 87-89, Surabaya, 60224",
    id: "Jl. Mayjen Sungkono No. 87-89, Surabaya, 60224",
  },
  "footer.locationJakarta": { en: "Jakarta", id: "Jakarta" },
  "footer.locationSingapore": { en: "Singapore", id: "Singapore" },
  "footer.copyright": {
    en: "PT Solusi Layar International. All rights reserved.",
    id: "PT Solusi Layar International. All rights reserved.",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "en" ? "id" : "en"));
  }, []);

  const t = useCallback(
    (key: string) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang];
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
