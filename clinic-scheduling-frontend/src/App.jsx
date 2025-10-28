// src/App.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.css";

export default function App() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("sidebar_collapsed") === "1";
    } catch {
      return false;
    }
  });

  const sidebarWidth = collapsed ? 92 : 300; // espaço total da sidebar + margem visual

  return (
    <div className="app-root">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className="app-main"
        style={{
          marginLeft: sidebarWidth,
          transition: "margin-left .22s ease",
        }}
      >
        <header className="app-topbar">
          <div>AppBar (placeholder)</div>
        </header>

        <section className="app-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
