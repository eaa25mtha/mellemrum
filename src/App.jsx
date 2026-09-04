import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import EventPage from "./pages/EventPage";
import LoginPage from "./pages/LoginPage";
import MyRegistrationsPage from "./pages/MyRegistrationsPage";
import RegistrationsPage from "./pages/RegistrationsPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    const pageTitles = {
      "/": "Mellemrum. | Find plads til noget nyt.",
      "/om": "Om Mellemrum | Mellemrum",
      "/login": "Log ind | Mellemrum",
      "/mine-tilmeldinger": "Mine tilmeldinger | Mellemrum",
      "/tilmeldinger": "Tilmeldinger | Mellemrum",
    };

    if (pathname.startsWith("/events/")) {
      document.title = "Event | Mellemrum";
      return;
    }

    document.title =
      pageTitles[pathname] ?? "Siden blev ikke fundet | Mellemrum";
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:eventId" element={<EventPage />} />
        <Route path="/om" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mine-tilmeldinger" element={<MyRegistrationsPage />} />
        <Route path="/tilmeldinger" element={<RegistrationsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
