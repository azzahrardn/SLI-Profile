import { Routes, Route } from "react-router";
import { LanguageProvider } from "./components/LanguageContext";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SolutionPage from "./pages/SolutionPage";
import ProductPage from "./pages/ProductPage";
import { ArticlePage } from "./pages/ArticlePage";
import { ArticleView } from "./pages/ArticleView";
import ContactPage from "./pages/ContactPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/solution" element={<SolutionPage />} />
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