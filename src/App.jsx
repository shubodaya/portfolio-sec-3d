import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminPortal from "./AdminPortal.jsx";
import "./admin.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Experience from "./pages/Experience.jsx";
import Projects from "./pages/Projects.jsx";
import Education from "./pages/Education.jsx";
import { createDefaultSiteContent, mergeSiteContent } from "./siteContent";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.dispatchEvent(new Event("portfolio:route"));
        const loader = document.getElementById("ftco-loader");
        if (loader) {
          loader.classList.remove("show");
          loader.style.display = "none";
        }
        return;
      }
    }

    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("portfolio:route"));
    const loader = document.getElementById("ftco-loader");
    if (loader) {
      loader.classList.remove("show");
      loader.style.display = "none";
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const location = useLocation();
  const [publishedContent] = useState(() => createDefaultSiteContent());
  const [siteContent, setSiteContent] = useState(() => createDefaultSiteContent());
  const isAdminRoute =
    location.pathname === "/admin" || location.pathname === "/admin/";

  useEffect(() => {
    document.title =
      siteContent?.meta?.siteTitle || "portfolio-sec-3d";
  }, [siteContent]);

  if (isAdminRoute) {
    return (
      <AdminPortal
        defaultContent={publishedContent}
        onContentSaved={(nextContent) => setSiteContent(mergeSiteContent(nextContent))}
      />
    );
  }

  return (
    <>
      <ScrollManager />
      <Navbar siteContent={siteContent} />
      <Routes>
        <Route path="/" element={<Home siteContent={siteContent} />} />
        <Route path="/about" element={<About siteContent={siteContent} />} />
        <Route path="/experience" element={<Experience siteContent={siteContent} />} />
        <Route path="/projects" element={<Projects siteContent={siteContent} />} />
        <Route path="/education" element={<Education siteContent={siteContent} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <div id="ftco-loader" className="show fullscreen">
        <svg className="circular" width="48px" height="48px">
          <circle
            className="path-bg"
            cx="24"
            cy="24"
            r="22"
            fill="none"
            strokeWidth="4"
            stroke="#eeeeee"
          />
          <circle
            className="path"
            cx="24"
            cy="24"
            r="22"
            fill="none"
            strokeWidth="4"
            strokeMiterlimit="10"
            stroke="#F96D00"
          />
        </svg>
      </div>
    </>
  );
}
