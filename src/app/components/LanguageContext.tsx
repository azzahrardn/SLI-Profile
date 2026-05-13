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
  "products.nauticamAI.featuresTitle": { en: "Capabilities", id: "Kemampuan" },
  "products.nauticamAI.feature1Title": {
    en: "AI-Powered Event Detection",
    id: "Deteksi Peristiwa Berbasis AI",
  },
  "products.nauticamAI.feature1Desc": {
    en: "Real-time anomaly detection using advanced computer vision technology",
    id: "Deteksi anomali real-time menggunakan teknologi computer vision canggih",
  },
  "products.nauticamAI.feature2Title": {
    en: "Onboard & Onshore Dashboards",
    id: "Dashboard Kapal & Pantai",
  },
  "products.nauticamAI.feature2Desc": {
    en: "Unified dashboards enabling seamless ship-shore collaboration and insights sharing",
    id: "Dashboard terpadu yang memungkinkan kolaborasi kapal-pantai yang mulus dan berbagi insight",
  },
  "products.nauticamAI.feature3Title": {
    en: "Multi-Area Monitoring",
    id: "Monitoring Multi-Area",
  },
  "products.nauticamAI.feature3Desc": {
    en: "Comprehensive coverage: security, bridge, cargo, safety, maintenance, and pollution",
    id: "Cakupan komprehensif: keamanan, jembatan, kargo, keselamatan, pemeliharaan, dan polusi",
  },
  "products.nauticamAI.feature4Title": {
    en: "External Data Integration",
    id: "Integrasi Data Eksternal",
  },
  "products.nauticamAI.feature4Desc": {
    en: "Enriched insights with AIS and weather data for comprehensive situational awareness",
    id: "Insight yang diperkaya dengan data AIS dan cuaca untuk kesadaran situasional yang komprehensif",
  },
  "products.nauticamAI.feature5Title": {
    en: "Digital Event Log",
    id: "Log Peristiwa Digital",
  },
  "products.nauticamAI.feature5Desc": {
    en: "Searchable video-to-insight conversion transforming raw footage into actionable intelligence",
    id: "Konversi video-ke-insight yang dapat dicari mengubah rekaman mentah menjadi intelijen yang dapat ditindaklanjuti",
  },
  "products.nauticamAI.feature6Title": {
    en: "Automated Alerts",
    id: "Peringatan Otomatis",
  },
  "products.nauticamAI.feature6Desc": {
    en: "Proactive notifications for hazards, anomalies, and operational inefficiencies",
    id: "Notifikasi proaktif untuk bahaya, anomali, dan ketidakefisienan operasional",
  },
  // ── Problem Section ──
  "problem.label": { en: "The Challenge", id: "Tantangan" },
  "problem.heading": {
    en: "Maritime Industry Challenges",
    id: "Tantangan Industri Maritim",
  },
  "problem.subheading": {
    en: "Indonesia's maritime sector faces significant operational hurdles. Small and medium ship owners struggle with outdated processes, limited visibility, and rising costs in an increasingly regulated environment.",
    id: "Sektor maritim Indonesia menghadapi berbagai kendala operasional. Pemilik kapal kecil dan menengah berjuang dengan proses yang ketinggalan zaman, visibilitas terbatas, dan biaya yang terus meningkat di tengah regulasi yang semakin ketat.",
  },
  "problem.p1Title": {
    en: "No Real-Time Fleet Visibility",
    id: "Tidak Ada Visibilitas Armada Real-Time",
  },
  "problem.p1Desc": {
    en: "Ship owners lack live tracking of vessel locations, voyage status, and performance — leading to delayed decisions and poor fleet oversight.",
    id: "Pemilik kapal tidak memiliki pelacakan langsung terhadap lokasi kapal, status pelayaran, dan performa — menyebabkan keterlambatan keputusan dan pengawasan armada yang buruk.",
  },
  "problem.p2Title": {
    en: "Manual & Paper-Based Reporting",
    id: "Pelaporan Manual & Berbasis Kertas",
  },
  "problem.p2Desc": {
    en: "Noon reports and voyage logs are still submitted manually, making data unreliable, slow to process, and difficult to audit.",
    id: "Noon report dan log pelayaran masih dikirimkan secara manual, membuat data tidak akurat, lambat diproses, dan sulit diaudit.",
  },
  "problem.p3Title": {
    en: "Inefficient Fuel Management",
    id: "Manajemen Bahan Bakar Tidak Efisien",
  },
  "problem.p3Desc": {
    en: "Without route and speed optimisation tools, fuel consumption is higher than necessary — directly inflating operational costs.",
    id: "Tanpa alat optimasi rute dan kecepatan, konsumsi bahan bakar lebih tinggi dari yang seharusnya — langsung meningkatkan biaya operasional.",
  },
  "problem.p4Title": { en: "Reactive Maintenance", id: "Perawatan Reaktif" },
  "problem.p4Desc": {
    en: "Maintenance is handled after breakdowns occur rather than being planned ahead, resulting in costly downtime and unplanned incidents.",
    id: "Perawatan dilakukan setelah kerusakan terjadi, bukan direncanakan sebelumnya — mengakibatkan downtime mahal dan insiden tak terduga.",
  },
  "problem.p5Title": {
    en: "Mounting Regulatory Pressure",
    id: "Tekanan Regulasi yang Semakin Berat",
  },
  "problem.p5Desc": {
    en: "IMO 2023 standards are pushing shipping companies to reduce carbon emissions and improve fuel efficiency — requiring accurate operational data.",
    id: "Standar IMO 2023 mendorong perusahaan pelayaran untuk mengurangi emisi karbon dan meningkatkan efisiensi bahan bakar — yang memerlukan data operasional yang akurat.",
  },
  "problem.p6Title": {
    en: "High Cost of Digitalisation",
    id: "Biaya Digitalisasi yang Tinggi",
  },
  "problem.p6Desc": {
    en: "Many digital solutions demand expensive hardware upgrades or complete workflow overhauls, making adoption impractical for most ship owners.",
    id: "Banyak solusi digital mensyaratkan peningkatan hardware mahal atau perombakan total alur kerja, menjadikannya tidak praktis bagi sebagian besar pemilik kapal.",
  },

  // ── Solution Section ──
  "solution.label": { en: "Our Approach", id: "Solusi Kami" },
  "solution.heading": { en: "SLI Fleet Master", id: "SLI Fleet Master" },
  "solution.subheading": {
    en: "SLI Fleet Master is an integrated fleet management platform that makes digital transformation easy, fast, and cost-effective — without changing your operation workflow or upgrading your hardware.",
    id: "SLI Fleet Master adalah platform manajemen armada terpadu yang membuat transformasi digital menjadi mudah, cepat, dan hemat biaya — tanpa mengubah alur kerja operasi atau meningkatkan hardware Anda.",
  },
  "solution.s1Title": { en: "Fleet Supervision", id: "Pengawasan Armada" },
  "solution.s1Desc": {
    en: "Get a real-time helicopter view of your entire fleet — vessel positions on the map, voyage status, weather conditions, draft, and speed — all in one centralised dashboard.",
    id: "Dapatkan tampilan helikopter real-time dari seluruh armada — posisi kapal di peta, status pelayaran, kondisi cuaca, draft, dan kecepatan — semuanya dalam satu dashboard terpusat.",
  },
  "solution.s2Title": {
    en: "Voyage Supervision & Path Optimisation",
    id: "Pengawasan Pelayaran & Optimasi Rute",
  },
  "solution.s2Desc": {
    en: "Review past and ongoing voyages with full KPI breakdowns: fuel consumption, RPM, engine load, and weather impact. Plan optimal routes to minimise fuel costs.",
    id: "Tinjau pelayaran lalu dan yang sedang berlangsung dengan rincian KPI lengkap: konsumsi BBM, RPM, beban mesin, dan dampak cuaca. Rencanakan rute optimal untuk meminimalkan biaya bahan bakar.",
  },
  "solution.s3Title": { en: "OnBoard Reports", id: "Laporan OnBoard" },
  "solution.s3Desc": {
    en: "Digitise noon reports and voyage logs. Receive automated alerts when reported speed, fuel, or weather data deviates from expected values. Export all data in CSV format.",
    id: "Digitalkan noon report dan log pelayaran. Terima notifikasi otomatis bila kecepatan, konsumsi BBM, atau data cuaca yang dilaporkan menyimpang. Ekspor semua data dalam format CSV.",
  },
  "solution.s4Title": { en: "Maintenance Tracking", id: "Pelacakan Perawatan" },
  "solution.s4Desc": {
    en: "Track your ship maintenance plan proactively to avoid costly unplanned breakdowns and keep vessels in optimal condition.",
    id: "Pantau rencana perawatan kapal secara proaktif untuk menghindari kerusakan tak terduga yang mahal dan menjaga kondisi kapal tetap optimal.",
  },
  "solution.statsHeading": {
    en: "Designed for the Indonesian Fleet",
    id: "Dirancang untuk Armada Indonesia",
  },
  "solution.statsSubheading": {
    en: "Built around the realities of small-medium ship owners operating legacy vessels.",
    id: "Dibangun sesuai realitas pemilik kapal kecil-menengah yang mengoperasikan kapal-kapal lama.",
  },
  "solution.stat1": {
    en: "Operational workflow changes",
    id: "Perubahan alur kerja operasional",
  },
  "solution.stat2": {
    en: "Hardware upgrades required",
    id: "Upgrade hardware diperlukan",
  },
  "solution.stat3": {
    en: "Fleet monitoring availability",
    id: "Ketersediaan pemantauan armada",
  },
  "solution.stat4": {
    en: "Compatible with existing ship systems",
    id: "Kompatibel dengan sistem kapal yang ada",
  },

  // ── Why SLI (Section 07) ──
  "why.label": { en: "Why SLI", id: "Mengapa SLI" },
  "why.heading": {
    en: "The Strategic Case for Choosing SLI",
    id: "Alasan Strategis Memilih SLI",
  },
  "why.subheading": {
    en: "Built by experts with maritime, software, and consulting experience — we understand the real challenges Indonesian ship owners face.",
    id: "Dibangun oleh para ahli dengan pengalaman di bidang maritim, perangkat lunak, dan konsultasi — kami memahami tantangan nyata yang dihadapi pemilik kapal Indonesia.",
  },
  "why.r1Title": {
    en: "People + Technology, Not One or the Other",
    id: "People + Technology, Bukan Salah Satu",
  },
  "why.r1Desc": {
    en: "SLI integrates a powerful technology platform, accompanied by a team of experts who understand maritime operations from the inside.",
    id: "SLI mengintegrasikan platform teknologi yang powerful, didampingi oleh tim ahli yang memahami operasi maritim dari dalam.",
  },
  "why.r2Title": {
    en: "Unmatched Domain Expertise",
    id: "Domain Expertise yang Tidak Tertandingi",
  },
  "why.r2Desc": {
    en: "With direct affiliation to PT Terafulk Megantara Design and a cross-industry experienced team, SLI speaks the same language as its clients.",
    id: "Dengan afiliasi langsung ke PT Terafulk Megantara Design dan tim berpengalaman lintas industri, SLI berbicara bahasa yang sama dengan klien.",
  },
  "why.r3Title": {
    en: "Implementation Without Disruption",
    id: "Implementasi Tanpa Disrupsi",
  },
  "why.r3Desc": {
    en: "Zero-friction onboarding is our promise. Our system adapts to your way of working. Valuable insights in days, not months.",
    id: "Zero-friction onboarding adalah janji kami. Sistem kami beradaptasi dengan cara kerja Anda. Insight berharga dalam hitungan hari, bukan bulan.",
  },
  "why.r4Title": {
    en: "Scalable from One Ship to a Large Fleet",
    id: "Skalabel dari Satu Kapal hingga Armada Besar",
  },
  "why.r4Desc": {
    en: "From single vessel operators to shipping companies with hundreds of units, the SLI platform grows with your needs.",
    id: "Dari operator kapal tunggal hingga perusahaan pelayaran dengan ratusan unit, platform SLI tumbuh bersama kebutuhan Anda.",
  },
  "why.r5Title": {
    en: "Measurable & Transparent ROI",
    id: "ROI yang Terukur dan Transparan",
  },
  "why.r5Desc": {
    en: "We don't just promise efficiency — we measure it. Every client gets a performance dashboard showing real-time savings.",
    id: "Kami tidak hanya berjanji efisiensi — kami mengukurnya. Setiap klien mendapatkan dashboard kinerja yang menunjukkan penghematan secara real-time.",
  },
  "why.r6Title": {
    en: "Report Accuracy: Weekly & Every Voyage",
    id: "Akurasi Report: Weekly & Every Voyage",
  },
  "why.r6Desc": {
    en: "Fleet performance reports are compiled accurately every week and every voyage — ensuring operational data is always up-to-date for strategic decision-making.",
    id: "Laporan performa armada disusun secara akurat setiap minggu dan setiap voyage — memastikan data operasional selalu up-to-date untuk pengambilan keputusan strategis.",
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
