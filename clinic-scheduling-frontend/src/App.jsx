import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppBar from "./components/Appbar"; // ✅ novo import
import "./App.css";

export default function App() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("sidebar_collapsed") === "1";
    } catch {
      return false;
    }
  });

  const sidebarWidth = collapsed ? 92 : 300;

  // exemplo temporário de usuário e clínica logada
  const clinic = { name: "Clínica Peficaz" };
  const user = { name: "Administrador" };

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
        {/* substitui o placeholder antigo */}
        <AppBar
          title="Painel Administrativo"
          clinic={clinic}
          user={user}
          onLogout={() => {
            console.log("Logout executado");
            // implementar: limpar token e redirecionar para login
          }}
        />

        <section className="app-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
