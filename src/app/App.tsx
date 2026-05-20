import { Routes, Route } from "react-router";
import { LanguageProvider } from "./components/LanguageContext";
import ScrollToTop from "./components/ScrollToTop"; // Sesuaikan path ini jika Anda menyimpannya di folder lain
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SolutionPage from "./pages/SolutionPage";
import ProductPage from "./pages/ProductPage";
import { ArticlePage } from "./pages/ArticlePage";
import { ArticleView } from "./pages/ArticleView";
import ContactPage from "./pages/ContactPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import TechnologyPage from "./pages/TechnologyPage";

export default function App() {
  return (
    <LanguageProvider>
      {/* Panggil komponen ScrollToTop di sini, di luar Routes */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/solution" element={<SolutionPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/artikel" element={<ArticlePage />} />
        <Route path="/artikel/:id" element={<ArticleView />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sli/v1/login" element={<AdminLoginPage />} />
        <Route path="/sli/v1/dashboard" element={<AdminDashboardPage />} />
      </Routes>
    </LanguageProvider>
  );
}
