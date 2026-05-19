import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

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
  "nav.home": { en: "Home", id: "Beranda" },
  "nav.about": { en: "About", id: "Tentang" },
  "nav.solution": { en: "Solution", id: "Solusi" },
  "nav.product": { en: "Product", id: "Produk" },
  "nav.visionMission": { en: "Vision & Mission", id: "Visi & Misi" },
  "nav.affiliation": { en: "Affiliation", id: "Afiliasi" },
  "nav.team": { en: "Team", id: "Tim" },
  "nav.technology": { en: "Technology", id: "Teknologi" },
  "nav.products": { en: "Products", id: "Produk" },
  "nav.whySLI": { en: "Why SLI", id: "Mengapa SLI" },
  "nav.articles": { en: "Articles", id: "Artikel" },
  "nav.contact": { en: "Contact", id: "Kontak" },

  // ── Hero ──
  "hero.subtitle": {
    en: "PT Solusi Layar International",
    id: "PT Solusi Layar International",
  },
  "hero.title1": {
    en: "Navigating the Future of",
    id: "Mengarungi Masa Depan",
  },
  "hero.titleHighlight": { en: "Maritime Operations", id: "Operasi Maritim" },
  "hero.tagline": {
    en: "Ship Fleet Operations & Performance Management",
    id: "Manajemen Operasi & Performa Armada Kapal",
  },
  "hero.tagline2": {
    en: "for Small–Medium Vessel Owners",
    id: "untuk Pemilik Kapal Kecil–Menengah",
  },
  "hero.tagline3": {
    en: "Through Non-Disruptive and Affordable Digital Transformation",
    id: "Melalui Transformasi Digital Tanpa Gangguan dan Terjangkau",
  },
  "hero.cta": { en: "Explore More", id: "Jelajahi Lebih Lanjut" },

  // ── About (Section 01) ──
  "about.label": { en: "About Us", id: "Tentang Kami" },
  "about.heading": {
    en: "Who We Are & Why We Exist",
    id: "Siapa Kami & Mengapa Kami Ada",
  },
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
    en: '"We believe that the best technology is technology that doesn\'t replace humans, but empowers them to make better, faster, and more confident decisions."',
    id: '"Kami percaya bahwa teknologi terbaik adalah teknologi yang tidak menggantikan manusia, tetapi memberdayakan mereka untuk membuat keputusan yang lebih baik, lebih cepat, dan lebih percaya diri."',
  },

  // ── Vision & Mission (Section 02) ──
  "vm.label": { en: "Vision & Mission", id: "Visi & Misi" },
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
  "aff.label": {
    en: "Affiliation & Expertise Foundation",
    id: "Afiliasi & Fondasi Keahlian",
  },
  "aff.heading": {
    en: "Built on Decades of Maritime Engineering Excellence",
    id: "Dibangun di Atas Puluhan Tahun Keunggulan Rekayasa Maritim",
  },
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
  "aff.svc2Title": {
    en: "Shipbuilding Project Management",
    id: "Shipbuilding Project Management",
  },
  "aff.svc2Desc": {
    en: "Comprehensively managing the shipbuilding process — from material procurement to handover — with uncompromising quality standards.",
    id: "Mengelola proses pembangunan kapal secara komprehensif — dari pengadaan material hingga serah terima — dengan standar kualitas yang tidak berkompromi.",
  },
  "aff.svc3Title": {
    en: "Supervision & Class Compliance",
    id: "Supervision & Class Compliance",
  },
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
  "team.label": { en: "Team Capabilities", id: "Kapabilitas Tim" },
  "team.heading": {
    en: "A Rare Convergence of Expertise",
    id: "Perpaduan Langka Keahlian",
  },
  "team.subtitle": {
    en: "What sets SLI apart from other players is the composition of our team — a rare blend of experienced maritime engineers, world-class software architects, and industry practitioners from various sectors.",
    id: "Yang membedakan SLI dari pemain lain adalah komposisi tim kami — sebuah perpaduan langka antara insinyur maritim berpengalaman, arsitek software kelas global, dan praktisi industri dari berbagai sektor.",
  },
  "team.cap1Title": {
    en: "Global Software Development",
    id: "Global Software Development",
  },
  "team.cap1Desc": {
    en: "Our development team has designed and delivered enterprise-grade solutions for clients across various parts of the world. Our system architecture is built with the principles of scalability, reliability, and security from the foundation.",
    id: "Tim pengembang kami telah merancang dan mengirimkan solusi enterprise-grade untuk klien di berbagai belahan dunia. Arsitektur sistem kami dibangun dengan prinsip scalability, reliability, dan security sejak fondasi.",
  },
  "team.cap2Title": {
    en: "Core Networking & Telecommunications",
    id: "Core Networking & Telekomunikasi",
  },
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

  // ── Board of Directors ──
  "board.label": { en: "Leadership", id: "Kepemimpinan" },
  "board.heading": {
    en: "Meet our Board of Directors",
    id: "Mengenal Dewan Direktur Kami",
  },
  "board.subheading": {
    en: "Our Board of Directors, with 30 years of experience, is committed to driving the company's innovation and growth into the future.",
    id: "Dewan Direktur kami, dengan pengalaman 30 tahun, berkomitmen untuk mendorong inovasi dan pertumbuhan perusahaan di masa depan.",
  },

  // ── Technology (Section 05) ──
  "tech.label": { en: "Leading Technology", id: "Teknologi Unggulan" },
  "tech.heading": {
    en: "The Tools That Redefine Maritime Intelligence",
    id: "Alat yang Mendefinisikan Ulang Inteligensi Maritim",
  },
  "tech.item1Title": {
    en: "World-Class Maritime Toolset",
    id: "World-Class Maritime Toolset",
  },
  "tech.item1Desc": {
    en: "SLI's platform integrates global maritime industry standard tools — from integrated AIS/VMS systems, real-time fleet management dashboards, to reporting modules compliant with IMO regulations and local port authorities.",
    id: "Platform SLI mengintegrasikan standar tools industri maritim global — mulai dari sistem AIS/VMS terintegrasi, fleet management dashboard real-time, hingga modul pelaporan yang sesuai dengan regulasi IMO dan otoritas pelabuhan lokal.",
  },
  "tech.item2Title": {
    en: "Digital Twin Modelling",
    id: "Digital Twin Modelling",
  },
  "tech.item2Desc": {
    en: "Our Digital Twin technology enables route and fuel consumption simulation with unprecedented accuracy. By building virtual replicas of every vessel in your fleet — complete with hydrodynamic characteristics, engine conditions, and cargo parameters.",
    id: "Teknologi Digital Twin kami memungkinkan simulasi rute dan konsumsi bahan bakar dengan akurasi yang belum pernah ada sebelumnya. Dengan membangun replika virtual dari setiap kapal dalam armada Anda — lengkap dengan karakteristik hidrodinamika, kondisi mesin, dan parameter kargo.",
  },
  "tech.item3Title": {
    en: "Seamless Data Acquisition",
    id: "Seamless Data Acquisition",
  },
  "tech.item3Desc": {
    en: "SLI is designed to integrate with existing infrastructure — no expensive hardware upgrades needed, no crew workflow changes, no operational downtime. Data flows seamlessly from your existing sensors and systems directly to the SLI platform.",
    id: "SLI dirancang untuk berintegrasi dengan infrastruktur yang sudah ada — tanpa perlu upgrade hardware mahal, tanpa perubahan workflow kru, tanpa downtime operasional. Data mengalir mulus dari sensor dan sistem existing Anda langsung ke platform SLI.",
  },

  // ── Our Products (Section 06) ──
  "products.label": { en: "Our Products", id: "Produk Kami" },
  "products.heading": {
    en: "Comprehensive Maritime Solutions",
    id: "Solusi Maritim Komprehensif",
  },
  "products.subheading": {
    en: "Advanced technology platforms designed to transform your fleet operations with digital innovation and AI-powered intelligence",
    id: "Platform teknologi canggih yang dirancang untuk mentransformasi operasi armada Anda dengan inovasi digital dan kecerdasan berbasis AI",
  },
  "products.tabFleetMaster": { en: "SLI Fleet Master", id: "SLI Fleet Master" },
  "products.tabNauticamAI": { en: "NautiCamAI", id: "NautiCamAI" },
  "products.fleetMaster.featuresTitle": {
    en: "Core Capabilities",
    id: "Kemampuan Utama",
  },
  "products.fleetMaster.feature1Title": {
    en: "Fleet Supervision",
    id: "Pengawasan Armada",
  },
  "products.fleetMaster.feature1Desc": {
    en: "Centralized real-time monitoring and management of entire fleet with comprehensive visibility into vessel status, location, and operational health",
    id: "Pemantauan dan manajemen terpusat secara real-time untuk seluruh armada dengan visibilitas komprehensif terhadap status, lokasi, dan kesehatan operasional kapal",
  },
  "products.fleetMaster.feature2Title": {
    en: "Voyage Supervision",
    id: "Pengawasan Perjalanan",
  },
  "products.fleetMaster.feature2Desc": {
    en: "Real-time oversight of individual voyages tracking route adherence, performance metrics, and enabling proactive decision-making",
    id: "Pengawasan real-time perjalanan individual dengan pelacakan kepatuhan rute, metrik performa, dan pengambilan keputusan proaktif",
  },
  "products.fleetMaster.feature3Title": {
    en: "Voyage Path Optimization",
    id: "Optimasi Rute Perjalanan",
  },
  "products.fleetMaster.feature3Desc": {
    en: "AI-powered route optimization considering weather, sea conditions, and fuel consumption for maximum efficiency and cost-effectiveness",
    id: "Optimasi rute berbasis AI yang mempertimbangkan cuaca, kondisi laut, dan konsumsi bahan bakar untuk efisiensi dan efektivitas biaya maksimal",
  },
  "products.fleetMaster.feature4Title": {
    en: "E-log Book",
    id: "Buku Log Digital",
  },
  "products.fleetMaster.feature4Desc": {
    en: "Digital real-time logbook replacing paper-based records with automatic data capture, secure storage, and regulatory compliance",
    id: "Buku log digital real-time menggantikan record berbasis kertas dengan capture data otomatis, penyimpanan aman, dan kepatuhan regulasi",
  },
  "products.fleetMaster.feature5Title": {
    en: "Weather Forecast",
    id: "Prakiraan Cuaca",
  },
  "products.fleetMaster.feature5Desc": {
    en: "Advanced weather data integration with predictive analytics for hazard alerts and voyage adjustment recommendations",
    id: "Integrasi data cuaca canggih dengan analitik prediktif untuk peringatan bahaya dan rekomendasi penyesuaian perjalanan",
  },
  "products.fleetMaster.feature6Title": {
    en: "Chart Data & Noon Report",
    id: "Data Peta & Laporan Tengah Hari",
  },
  "products.fleetMaster.feature6Desc": {
    en: "Comprehensive navigational data with automated noon reports combining chart data, position, speed, and fuel consumption updates",
    id: "Data navigasi komprehensif dengan laporan tengah hari otomatis menggabungkan data peta, posisi, kecepatan, dan update konsumsi bahan bakar",
  },
  // ── NauticamAI Capabilities ──
  "products.nauticamAI.featuresTitle": {
    en: "Visual Intelligence Capabilities",
    id: "Kapabilitas Visual Cerdas",
  },
  "products.nauticamAI.feature1Title": {
    en: "Bridge Navigation Oversight",
    id: "Pengawasan Navigasi Anjungan",
  },
  "products.nauticamAI.feature1Desc": {
    en: "Automatically detect and correct navigation drift or anomalies before critical incidents occur.",
    id: "Deteksi dan koreksi penyimpangan navigasi atau anomali secara otomatis sebelum insiden kritis terjadi.",
  },
  "products.nauticamAI.feature2Title": {
    en: "Real-Time Safety Intervention",
    id: "Intervensi Keselamatan Real-Time",
  },
  "products.nauticamAI.feature2Desc": {
    en: "Monitor deck activities 24/7 and instantly intervene on unsafe behaviors to drastically reduce crew injuries.",
    id: "Pantau aktivitas dek 24/7 dan intervensi perilaku tidak aman seketika untuk menekan angka cedera kru secara drastis.",
  },
  "products.nauticamAI.feature3Title": {
    en: "Technical Failure Prevention",
    id: "Pencegahan Kegagalan Teknis",
  },
  "products.nauticamAI.feature3Desc": {
    en: "Identify visual cues of equipment wear and act on early failure signals before costly operational downtime.",
    id: "Identifikasi tanda visual keausan alat dan tindak lanjuti sinyal kegagalan lebih awal sebelum terjadi waktu henti operasional.",
  },
  "products.nauticamAI.feature4Title": {
    en: "Proactive Threat Security",
    id: "Pertahanan Keamanan Proaktif",
  },
  "products.nauticamAI.feature4Desc": {
    en: "Maintain continuous surveillance to respond rapidly to unauthorized access and threats before breaches escalate.",
    id: "Pertahankan pengawasan berkelanjutan untuk merespons akses tak sah dan ancaman dengan cepat sebelum eskalasi meluas.",
  },
  "products.nauticamAI.feature5Title": {
    en: "MARPOL Compliance Monitoring",
    id: "Pemantauan Kepatuhan MARPOL",
  },
  "products.nauticamAI.feature5Desc": {
    en: "Address environmental safety gaps and pollution risks proactively before they become costly regulatory findings.",
    id: "Atasi celah keselamatan lingkungan dan risiko polusi secara proaktif sebelum menjadi temuan audit regulasi yang memakan biaya.",
  },
  "products.nauticamAI.feature6Title": {
    en: "Smart Vehicle Classification",
    id: "Deteksi Golongan Kendaraan Cerdas",
  },
  "products.nauticamAI.feature6Desc": {
    en: "Seamlessly detect, count, and categorize boarding vehicles in real-time to maximize deck capacity and manifest accuracy.",
    id: "Deteksi, hitung, dan golongkan tipe kendaraan secara otomatis dan real-time untuk memaksimalkan ruang muat dan memastikan akurasi manifes.",
  },
  // ── Problem Section ──
  "problem.label": { en: "Industry Challenges", id: "Tantangan Industri" },
  "problem.heading": {
    en: "The Gaps in Maritime Operations",
    id: "Celah dalam Operasi Maritim",
  },
  "problem.subheading": {
    en: "The maritime sector faces immense losses due to a critical disconnect: managing engine and fuel data without real-time visual safety oversight, creating operational blind spots.",
    id: "Sektor maritim menghadapi kerugian besar akibat keterputusan kritis: mengelola data mesin dan BBM berjalan tanpa pengawasan visual real-time, menciptakan titik buta operasional.",
  },
  "problem.p1Title": {
    en: "Unmonitored Fuel Inefficiency",
    id: "Inefisiensi BBM Tak Terdeteksi",
  },
  "problem.p1Desc": {
    en: "Without precise analytics tools, vessel fuel consumption climbs unnoticed due to suboptimal routing and uncalculated engine loads.",
    id: "Tanpa alat analitik presisi, konsumsi bahan bakar kapal membengkak tanpa disadari akibat rute buruk dan beban mesin yang tidak terhitung.",
  },
  "problem.p2Title": {
    en: "Critical Blind Spots & Collision Risks",
    id: "Risiko Tabrakan & Blind Spot Kritis",
  },
  "problem.p2Desc": {
    en: "Crew on the bridge face limited visual clarity at night or during heavy weather, increasing the risk of expensive accidents and asset damage.",
    id: "Kru di jembatan menghadapi keterbatasan pandangan visual saat malam atau cuaca buruk, meningkatkan risiko kecelakaan mahal dan kerusakan aset.",
  },
  "problem.p3Title": {
    en: "Unreliable Manual Logbooks",
    id: "Buku Log Manual Tidak Andal",
  },
  "problem.p3Desc": {
    en: "Noon reports and voyage logs compiled manually are prone to operational delays, human entries errors, and difficult tracking.",
    id: "Noon report dan log pelayaran yang disusun secara manual rentan tertunda, salah catat, dan sulit untuk diaudit secara akurat.",
  },
  "problem.p4Title": {
    en: "Unseen Deck Operations & Hazards",
    id: "Operasi Dek & Bahaya Luput Pengawasan",
  },
  "problem.p4Desc": {
    en: "Onshore managers lack live visual updates on deck activities, cargo status, and crew safety gear compliance during voyages.",
    id: "Manajer di darat tidak memiliki pemantauan visual langsung terhadap aktivitas dek, kondisi kargo, dan kepatuhan K3 kru selama pelayaran.",
  },
  "problem.p5Title": {
    en: "Strict Emissions & Safety Mandates",
    id: "Tekanan Regulasi Emisi & Keselamatan",
  },
  "problem.p5Desc": {
    en: "IMO international regulations require strict carbon reporting and high safety standards, demanding bulletproof digital proof.",
    id: "Regulasi internasional IMO menuntut pelaporan karbon yang ketat dan standar keselamatan tinggi, membutuhkan bukti data digital yang kuat.",
  },
  "problem.p6Title": {
    en: "Disruptive & High Cost Digitalization",
    id: "Digitalisasi Mahal & Mengganggu Operasional",
  },
  "problem.p6Desc": {
    en: "Traditional maritime technology requires expensive custom hardware installations and intrusive operational downtime on legacy ships.",
    id: "Teknologi maritim tradisional membutuhkan instalasi hardware kustom yang mahal dan downtime operasional yang mengganggu kapal lama.",
  },

  // ── Solution Section ──
  "solution.label": {
    en: "Our Solution Ecosystem",
    id: "Ekosistem Solusi Kami",
  },
  "solution.heading": {
    en: "The Brain and Eyes Strategy",
    id: "Strategi Otak dan Mata Maritim",
  },
  "solution.subheading": {
    en: "We combine the analytical brain of SLI Fleet Master with the powerful visual eyes of NauticamAI into one seamless digital hub.",
    id: "Kami memadukan otak analitik SLI Fleet Master dengan mata visual NauticamAI dalam satu pusat digital yang terintegrasi.",
  },
  "solution.s1Title": {
    en: "Performance & Fuel Optimization (Fleet Master)",
    id: "Optimasi Performa & BBM (Fleet Master)",
  },
  "solution.s1Desc": {
    en: "Transforms raw engine logs into operational insights to reduce fuel consumption, track maintenance, and calculate optimal route profiles.",
    id: "Mengubah log mesin mentah menjadi wawasan operasional untuk menekan konsumsi bahan bakar, melacak perawatan, dan menghitung rute optimal.",
  },
  "solution.s2Title": {
    en: "Smart Visual Computer Vision (NauticamAI)",
    id: "Computer Vision Cerdas (NauticamAI)",
  },
  "solution.s2Desc": {
    en: "Deploys automated AI models to track bridge safety, monitor deck parameters, and detect external maritime hazards 24/7.",
    id: "Menerapkan model AI otomatis untuk memantau keselamatan jembatan, mengawasi parameter dek, dan mendeteksi bahaya eksternal 24/7.",
  },
  "solution.s3Title": {
    en: "Unified Ship-to-Shore Digital Hub",
    id: "Pusat Digital Kapal-ke-Darat Terpadu",
  },
  "solution.s3Desc": {
    en: "Synchronizes automated telemetry and live camera streams into a single dashboard accessible anywhere by management.",
    id: "Menyinkronkan telemetri otomatis dan rekaman kamera langsung ke dalam satu dashboard yang dapat diakses manajemen di mana saja.",
  },
  "solution.s4Title": {
    en: "Predictive Insights & Automated Logs",
    id: "Insight Prediktif & Log Otomatis",
  },
  "solution.s4Desc": {
    en: "Combines digital event logs with predictive analytics for automated noon reports and instant hazard notifications.",
    id: "Menggabungkan log peristiwa digital dengan analitik prediktif untuk noon report otomatis dan notifikasi bahaya instan.",
  },
  "solution.statsHeading": {
    en: "Designed for Comprehensive Security",
    id: "Dirancang untuk Keamanan Menyeluruh",
  },
  "solution.statsSubheading": {
    en: "Maximum safety and ultimate fuel efficiency engineered perfectly into small-medium fleets.",
    id: "Keselamatan maksimal dan efisiensi bahan bakar optimal yang dirancang untuk armada kapal kecil-menengah.",
  },
  "solution.stat1": {
    en: "Operational workflow gaps",
    id: "Celah alur kerja operasional",
  },
  "solution.stat2": {
    en: "Hardware overhaul required",
    id: "Perombakan hardware diperlukan",
  },
  "solution.stat3": {
    en: "Active automated oversight",
    id: "Pengawasan otomatis aktif",
  },
  "solution.stat4": {
    en: "Vessel-to-cloud compatibility",
    id: "Kompatibilitas kapal-ke-cloud",
  },

  // ── Why SLI Section ──
  "why.label": { en: "Why SLI", id: "Mengapa SLI" },
  "why.heading": {
    en: "The Strategic Case for Choosing SLI",
    id: "Alasan Strategis Memilih SLI",
  },
  "why.subheading": {
    en: "We bridge the gap between complex naval architecture, multi-layer data analytics, and continuous visual edge AI computing.",
    id: "Kami menjembatani celah antara arsitektur kapal yang kompleks, analitik data multi-lapisan, dan visual edge AI computing.",
  },
  "why.r1Title": {
    en: "Data Analytics Meets Computer Vision",
    id: "Analitik Data Bertemu Computer Vision",
  },
  "why.r1Desc": {
    en: "SLI is the only platform that merges core engineering telemetries with contextual visual intelligence under one roof.",
    id: "SLI adalah satu-satunya platform yang menggabungkan telemetri teknik inti dengan inteligensi visual kontekstual di bawah satu atap.",
  },
  "why.r2Title": {
    en: "Unparalleled Maritime DNA",
    id: "DNA Maritim yang Tak Tertandingi",
  },
  "why.r2Desc": {
    en: "With deep ship design background, our algorithms understand ship hydrodynamics, class compliance standards, and operational realities.",
    id: "Dengan latar belakang desain kapal yang mendalam, algoritma kami memahami hidrodinamika kapal, standar class compliance, dan realitas operasional.",
  },
  "why.r3Title": {
    en: "Non-Invasive Implementation",
    id: "Implementasi Tanpa Disrupsi",
  },
  "why.r3Desc": {
    en: "Zero-friction onboarding. We leverage your existing sensors, analog outputs, and CCTV cameras. Value in days, not months.",
    id: "Onboarding tanpa friksi. Kami memanfaatkan sensor, output analog, dan kamera CCTV yang sudah ada. Insight didapat dalam hitungan hari.",
  },
  "why.r4Title": {
    en: "Scalable Infrastructure Architecture",
    id: "Arsitektur Infrastruktur Skalabel",
  },
  "why.r4Desc": {
    en: "Our cloud-powered solution dynamically scales from single legacy vessel management to hundreds of units flawlessly.",
    id: "Solusi berbasis cloud kami berkembang secara dinamis dari manajemen kapal tunggal hingga ratusan unit tanpa kendala.",
  },
  "why.r5Title": {
    en: "Double-Value Transparent ROI",
    id: "ROI Transparan Berlipat Ganda",
  },
  "why.r5Desc": {
    // Penambahan "maximized commercial capacity" / "optimalisasi kapasitas komersial"
    en: "Track clear fuel savings, quantified accident prevention metrics, and maximized commercial capacity clearly on your corporate dashboard.",
    id: "Pantau penghematan BBM, metrik pencegahan kecelakaan, hingga optimalisasi kapasitas komersial secara transparan di dashboard perusahaan Anda.",
  },
  "why.r6Title": {
    // Ubah judul agar menyinggung "Compliance/Kepatuhan" yang relevan dengan MARPOL & E-Log
    en: "Absolute Precision & Compliance",
    id: "Presisi & Kepatuhan Mutlak",
  },
  "why.r6Desc": {
    en: "Get verified, geolocated event logs and automated reports that ensure your fleet stays ahead of international safety and environmental regulations.",
    id: "Dapatkan log peristiwa terverifikasi dan laporan otomatis yang memastikan armada Anda selalu selangkah lebih maju dalam kepatuhan regulasi keselamatan dan lingkungan internasional.",
  },

  // ── Digital Twin Section ──
  "tech.dt.label": { en: "Core Technology", id: "Teknologi Inti" },
  "tech.dt.heading": {
    en: "Digital Twin — Advanced Ship Performance Model",
    id: "Digital Twin — Model Performa Kapal Canggih",
  },
  "tech.dt.subheading": {
    en: "SLI Fleet Master is built on a vessel-specific Digital Twin framework grounded in naval architecture, ship hydrodynamics, and decades of ship design experience — enabling accurate simulation and prediction of real-world performance.",
    id: "SLI Fleet Master dibangun di atas framework Digital Twin spesifik kapal yang berlandaskan arsitektur kapal, hidrodinamika, dan puluhan tahun pengalaman desain kapal — memungkinkan simulasi dan prediksi performa nyata yang akurat.",
  },
  "tech.dt.inputsLabel": { en: "Data Inputs", id: "Data Masuk" },
  "tech.dt.outputsLabel": { en: "Outputs", id: "Hasil" },
  "tech.dt.coreLabel": { en: "Digital Twin", id: "Digital Twin" },
  "tech.dt.coreTitle": {
    en: "Advanced Ship Performance Model",
    id: "Model Performa Kapal Canggih",
  },
  "tech.dt.input1": { en: "Chart Data", id: "Data Peta Laut" },
  "tech.dt.input2": { en: "AIS Data", id: "Data AIS" },
  "tech.dt.input3": { en: "Global Weather Data", id: "Data Cuaca Global" },
  "tech.dt.input4": { en: "Noon Reports", id: "Noon Report" },
  "tech.dt.input5": {
    en: "Real-Time Automation Data",
    id: "Data Otomasi Real-Time",
  },
  "tech.dt.out1": {
    en: "Fuel consumption prediction",
    id: "Prediksi konsumsi BBM",
  },
  "tech.dt.out2": {
    en: "Optimal route & speed profiles",
    id: "Rute & profil kecepatan optimal",
  },
  "tech.dt.out3": {
    en: "Voyage KPI benchmarking",
    id: "Benchmarking KPI pelayaran",
  },
  "tech.dt.f1Title": {
    en: "Ship Hydrodynamics Models",
    id: "Model Hidrodinamika Kapal",
  },
  "tech.dt.f1Desc": {
    en: "Each vessel's resistance, thrust, and motion behaviour is modelled precisely — accounting for hull geometry, loading condition, sea currents, and weather forces.",
    id: "Resistansi, gaya dorong, dan perilaku gerak setiap kapal dimodelkan secara presisi — memperhitungkan geometri lambung, kondisi muatan, arus laut, dan gaya cuaca.",
  },
  "tech.dt.f2Title": {
    en: "Naval Architectural Principles",
    id: "Prinsip Arsitektur Kapal",
  },
  "tech.dt.f2Desc": {
    en: "The model is grounded in internationally recognised naval architecture standards, ensuring predictions are scientifically valid and trusted by maritime professionals.",
    id: "Model ini berlandaskan standar arsitektur kapal yang diakui internasional, memastikan prediksi yang valid secara ilmiah dan dipercaya oleh para profesional maritim.",
  },
  "tech.dt.f3Title": {
    en: "Ship Design Experience",
    id: "Pengalaman Desain Kapal",
  },
  "tech.dt.f3Desc": {
    en: "Built by engineers with hands-on ship design and construction backgrounds — the Digital Twin reflects real vessel behaviour, not theoretical abstractions.",
    id: "Dibangun oleh insinyur dengan latar belakang desain dan konstruksi kapal langsung — Digital Twin mencerminkan perilaku kapal nyata, bukan abstraksi teoritis.",
  },

  // ── ADA 2.0 Section ──
  "tech.ada.label": { en: "Data Acquisition", id: "Pengumpulan Data" },
  "tech.ada.heading": {
    en: "ADA 2.0 — Easy & Reliable Data Collection",
    id: "ADA 2.0 — Pengumpulan Data yang Mudah & Andal",
  },
  "tech.ada.subheading": {
    en: "The SLI ADA (Automatic Data Acquisition) mobile application transforms how ship crews collect and submit operational data — eliminating manual errors and ensuring every data point is timestamped and geolocated automatically.",
    id: "Aplikasi mobile SLI ADA (Automatic Data Acquisition) mentransformasi cara kru kapal mengumpulkan dan mengirimkan data operasional — menghilangkan kesalahan manual dan memastikan setiap titik data diberi penanda waktu dan lokasi secara otomatis.",
  },
  "tech.ada.f1Title": {
    en: "Automatic Timestamping & Geolocation",
    id: "Penanda Waktu & Lokasi Otomatis",
  },
  "tech.ada.f1Desc": {
    en: "Every data entry is automatically stamped with the precise time and GPS position, removing the risk of inaccurate or late reports and providing a verifiable audit trail.",
    id: "Setiap entri data secara otomatis diberi cap waktu dan posisi GPS yang tepat, menghilangkan risiko laporan yang tidak akurat atau terlambat dan menyediakan jejak audit yang dapat diverifikasi.",
  },
  "tech.ada.f2Title": {
    en: "Automated Data Validation",
    id: "Validasi Data Otomatis",
  },
  "tech.ada.f2Desc": {
    en: "The SLI Operations Center reviews and validates incoming data daily, flagging any discrepancies between reported figures and expected values based on the Digital Twin model.",
    id: "Pusat Operasi SLI meninjau dan memvalidasi data masuk setiap hari, menandai setiap perbedaan antara angka yang dilaporkan dan nilai yang diharapkan berdasarkan model Digital Twin.",
  },
  "tech.ada.f3Title": {
    en: "100% Configurable Per Vessel",
    id: "100% Dapat Dikonfigurasi Per Kapal",
  },
  "tech.ada.f3Desc": {
    en: "Data collection metrics are fully customisable to match each customer's specific vessel type and reporting needs — covering not just engine performance, but also cargo, safety, and operational parameters.",
    id: "Metrik pengumpulan data sepenuhnya dapat dikonfigurasi sesuai jenis kapal dan kebutuhan pelaporan spesifik setiap pelanggan — mencakup tidak hanya performa mesin, tetapi juga kargo, keselamatan, dan parameter operasional.",
  },
  "tech.ada.appTitle": {
    en: "SLI Fleet Master Mobile App",
    id: "Aplikasi Mobile SLI Fleet Master",
  },
  "tech.ada.appDesc": {
    en: "Installed on crew devices — no dedicated hardware required. Crew submit structured reports directly from the vessel through a simple, guided interface.",
    id: "Dipasang di perangkat kru — tidak memerlukan hardware khusus. Kru mengirimkan laporan terstruktur langsung dari kapal melalui antarmuka yang sederhana dan terpandu.",
  },
  "tech.ada.reportLabel": { en: "Report Types", id: "Jenis Laporan" },
  "tech.ada.r1": { en: "Noon", id: "Noon" },
  "tech.ada.r2": { en: "Voyage", id: "Voyage" },
  "tech.ada.r3": { en: "Bunker", id: "Bunker" },
  "tech.ada.r4": { en: "RoB", id: "RoB" },
  "tech.ada.r5": { en: "Incident", id: "Insiden" },
  "tech.ada.r6": { en: "AIS", id: "AIS" },

  // ── Connectivity Section ──
  "tech.conn.label": {
    en: "Connectivity Infrastructure",
    id: "Infrastruktur Konektivitas",
  },
  "tech.conn.heading": {
    en: "Always Connected, Wherever Your Fleet Sails",
    id: "Selalu Terhubung, Di Manapun Armada Berlayar",
  },
  "tech.conn.subheading": {
    en: "SLI Fleet Master operates over a resilient, multi-layer connectivity stack — combining satellite and cellular networks to ensure uninterrupted data flow between vessels and the Operations Center, regardless of location.",
    id: "SLI Fleet Master beroperasi melalui stack konektivitas multi-lapisan yang tangguh — menggabungkan jaringan satelit dan seluler untuk memastikan aliran data yang tidak terputus antara kapal dan Pusat Operasi, terlepas dari lokasi.",
  },
  "tech.conn.c1Label": { en: "Primary", id: "Utama" },
  "tech.conn.c1Title": {
    en: "Satellite Connectivity",
    id: "Konektivitas Satelit",
  },
  "tech.conn.c1Desc": {
    en: "Vessel data is transmitted via satellite link, ensuring coverage in open ocean and remote waters far beyond cellular range. Included in the SLI subscription — no additional hardware procurement required.",
    id: "Data kapal dikirimkan melalui koneksi satelit, memastikan cakupan di laut lepas dan perairan terpencil jauh melampaui jangkauan seluler. Termasuk dalam langganan SLI — tidak diperlukan pengadaan hardware tambahan.",
  },
  "tech.conn.c1Badge": { en: "Global Coverage", id: "Cakupan Global" },
  "tech.conn.c2Label": { en: "Secondary", id: "Sekunder" },
  "tech.conn.c2Title": {
    en: "4G LTE Coastal Network",
    id: "Jaringan 4G LTE Pesisir",
  },
  "tech.conn.c2Desc": {
    en: "When vessels are within coastal range, 4G LTE provides high-bandwidth, low-latency connectivity for fast data synchronisation, real-time dashboard updates, and crew communications.",
    id: "Saat kapal berada dalam jangkauan pesisir, 4G LTE menyediakan konektivitas bandwidth tinggi dan latensi rendah untuk sinkronisasi data cepat, pembaruan dashboard real-time, dan komunikasi kru.",
  },
  "tech.conn.c2Badge": { en: "High Bandwidth", id: "Bandwidth Tinggi" },
  "tech.conn.c3Label": { en: "Extended Coverage", id: "Cakupan Diperluas" },
  "tech.conn.c3Title": {
    en: "Starlink / LEO Satellite Network",
    id: "Starlink / Jaringan Satelit LEO",
  },
  "tech.conn.c3Desc": {
    en: "For fleets requiring higher throughput at sea, SLI is compatible with Starlink and other Low Earth Orbit satellite providers — delivering broadband-grade speeds even in the most remote maritime routes.",
    id: "Untuk armada yang membutuhkan throughput lebih tinggi di laut, SLI kompatibel dengan Starlink dan penyedia satelit Low Earth Orbit lainnya — memberikan kecepatan setara broadband bahkan di rute maritim paling terpencil.",
  },
  "tech.conn.c3Badge": { en: "Low Latency", id: "Latensi Rendah" },
  "tech.conn.c4Label": { en: "Backend", id: "Backend" },
  "tech.conn.c4Title": {
    en: "Secured Cloud Infrastructure",
    id: "Infrastruktur Cloud Aman",
  },
  "tech.conn.c4Desc": {
    en: "All fleet data is stored and processed in a secured cloud environment — with role-based access controls, encrypted data transmission, and high-availability architecture to ensure data integrity and system uptime.",
    id: "Semua data armada disimpan dan diproses di lingkungan cloud yang aman — dengan kontrol akses berbasis peran, transmisi data terenkripsi, dan arsitektur ketersediaan tinggi untuk memastikan integritas data dan uptime sistem.",
  },
  "tech.conn.c4Badge": { en: "Encrypted", id: "Terenkripsi" },
  "tech.conn.note1": {
    en: "4G & Satellite connectivity included.",
    id: "Konektivitas 4G & Satelit sudah termasuk.",
  },
  "tech.conn.note2": {
    en: "All connectivity costs are bundled into the SLI monthly subscription per vessel — no separate data plan or hardware procurement needed.",
    id: "Semua biaya konektivitas sudah termasuk dalam langganan bulanan SLI per kapal — tidak diperlukan paket data terpisah atau pengadaan hardware.",
  },

  // ── Data Intelligence Section ──
  "tech.intel.label": { en: "Data Intelligence", id: "Inteligensi Data" },
  "tech.intel.heading": {
    en: "External Data Integration & AI-Powered Optimisation",
    id: "Integrasi Data Eksternal & Optimasi Berbasis AI",
  },
  "tech.intel.subheading": {
    en: "SLI Fleet Master enriches vessel performance data with external intelligence sources, enabling smarter decisions and more accurate predictions across every voyage.",
    id: "SLI Fleet Master memperkaya data performa kapal dengan sumber inteligensi eksternal, memungkinkan keputusan yang lebih cerdas dan prediksi yang lebih akurat di setiap pelayaran.",
  },
  "tech.intel.i1Title": {
    en: "AIS Data Integration",
    id: "Integrasi Data AIS",
  },
  "tech.intel.i1Desc": {
    en: "Automatic Identification System data provides real-time vessel position, speed, and heading — cross-referenced with noon reports to detect reporting discrepancies and validate actual performance.",
    id: "Data Automatic Identification System menyediakan posisi, kecepatan, dan arah kapal secara real-time — dicocokkan dengan noon report untuk mendeteksi perbedaan pelaporan dan memvalidasi performa aktual.",
  },
  "tech.intel.i2Title": { en: "Global Weather Data", id: "Data Cuaca Global" },
  "tech.intel.i2Desc": {
    en: "Real-time and forecast weather data — including wind, waves, swell, sea currents, water depth, and tropical storm tracking — is integrated into both the Digital Twin model and the voyage optimisation engine.",
    id: "Data cuaca real-time dan prakiraan — termasuk angin, gelombang, ombak, arus laut, kedalaman air, dan pelacakan badai tropis — diintegrasikan ke dalam model Digital Twin dan mesin optimasi pelayaran.",
  },
  "tech.intel.i3Title": {
    en: "Chart Data & ECA Visualisation",
    id: "Data Peta & Visualisasi ECA",
  },
  "tech.intel.i3Desc": {
    en: "Navigational chart data is overlaid with Emission Control Areas (ECA) and high-risk zone boundaries, giving fleet managers a complete operational picture for compliance and safety planning.",
    id: "Data peta navigasi ditumpangi dengan batas Emission Control Area (ECA) dan zona berisiko tinggi, memberikan gambaran operasional lengkap kepada manajer armada untuk perencanaan kepatuhan dan keselamatan.",
  },
  "tech.intel.aiLabel": {
    en: "AI-Assisted Optimisation",
    id: "Optimasi Berbantuan AI",
  },
  "tech.intel.aiTitle": {
    en: "Voyage Path Optimisation Engine",
    id: "Mesin Optimasi Rute Pelayaran",
  },
  "tech.intel.aiDesc": {
    en: "Combining the Digital Twin with real-time weather and AIS data, SLI's AI-assisted optimisation engine calculates the optimal route and speed profile for any voyage — balancing fuel efficiency, safety, regulatory compliance, and arrival time targets. Route plans can be exported as PDF or ECDIS-compatible formats.",
    id: "Menggabungkan Digital Twin dengan data cuaca real-time dan AIS, mesin optimasi berbantuan AI SLI menghitung rute dan profil kecepatan optimal untuk setiap pelayaran — menyeimbangkan efisiensi bahan bakar, keselamatan, kepatuhan regulasi, dan target waktu kedatangan. Rencana rute dapat diekspor dalam format PDF atau kompatibel ECDIS.",
  },
  "tech.intel.goalsLabel": {
    en: "Optimisation Objectives",
    id: "Tujuan Optimasi",
  },
  "tech.intel.goal1": { en: "Arrival time", id: "Waktu kedatangan" },
  "tech.intel.goal2": { en: "Constant speed", id: "Kecepatan konstan" },
  "tech.intel.goal3": { en: "RPM target", id: "Target RPM" },
  "tech.intel.goal4": { en: "Engine load", id: "Beban mesin" },
  "tech.intel.goal5": { en: "Max daily profit", id: "Profit harian maksimal" },
  "tech.intel.goal6": {
    en: "Overall cost reduction",
    id: "Pengurangan biaya total",
  },

  // ── CTA (Section 08) ──
  "cta.label": {
    en: "Join the Transformation",
    id: "Bergabunglah dalam Transformasi",
  },
  "cta.heading": {
    en: "Your Maritime Future Starts Here",
    id: "Masa Depan Maritim Anda Dimulai di Sini",
  },
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
    en: '"The sea doesn\'t wait. Neither should your data."',
    id: '"The sea doesn\'t wait. Neither should your data."',
  },
  "cta.emailLabel": { en: "Email", id: "Email" },
  "cta.phoneLabel": { en: "Phone", id: "Telepon" },
  "cta.websiteLabel": { en: "Website", id: "Website" },
  "cta.button": {
    en: "Start Free Consultation",
    id: "Mulai Konsultasi Gratis",
  },
  "cta.response": {
    en: "Response within 1 x 24 business hours",
    id: "Respons dalam 1 x 24 jam kerja",
  },

  // ── Footer ──
  "footer.tagline": {
    en: "Ship Fleet Operation & Performance Management through Digital Transformation",
    id: "Ship Fleet Operation & Performance Management through Digital Transformation",
  },
  "footer.quickLinks": { en: "Quick Links", id: "Tautan Cepat" },
  "footer.contact": { en: "Contact", id: "Kontak" },
  "footer.location": { en: "Our Locations", id: "Lokasi Kami" },
  "footer.locationSurabaya": {
    en: "Surabaya (Headquarters)",
    id: "Surabaya (Pusat)",
  },
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
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
