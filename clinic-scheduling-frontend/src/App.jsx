// src/App.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div className="app-root" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Placeholder: Sidebar/Topbar serão implementados por outro dev */}
      <aside style={{ width: 240, background: "#f5f5f5", padding: 16 }}>
        {/* TODO: substituir por Sidebar real */}
        <strong>Sidebar (placeholder)</strong>
        <nav>
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/doctors">Doctors</a></li>
            <li><a href="/schedules">Schedule</a></li>
          </ul>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: 24 }}>
        {/* TopBar placeholder */}
        <header style={{ marginBottom: 16 }}>
          <div>AppBar (placeholder)</div>
        </header>

        {/* Aqui as páginas renderizam */}
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
