// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Doctors from "./pages/Doctors";
import Schedules from "./pages/Schedules";
import LandingPage from "./pages/LandingPage";
import "./index.css";

// Usaremos o backend real — removemos MSW/mocks.
// Se quiser manter mocks no futuro, reative condicionalmente com uma env var.
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Redirect root to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Landing page as a standalone route (no Sidebar/App wrapper) */}
        <Route path="/home" element={<LandingPage />} />

        {/* App and its protected routes (renders Sidebar, topbar, etc.) */}
        <Route path="/" element={<App />}>
          <Route path="doctors" element={<Doctors />} />
          <Route path="schedules" element={<Schedules />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
