// src/components/Sidebar/index.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  User,
  Users,
  Calendar,
  ClipboardList,
  Bot,
  Menu,
  X
} from "lucide-react";
import "./index.css";

const LINKS = [
  { to: "/dashboard", label: "Dashboard", Icon: Home },
  { to: "/doctors", label: "Médicos", Icon: User },
  { to: "/patients", label: "Pacientes", Icon: Users },
  { to: "/schedules", label: "Horários", Icon: Calendar },
  { to: "/appointments", label: "Consultas", Icon: ClipboardList },
  { to: "/chatbot", label: "Chatbot", Icon: Bot },
];

export default function Sidebar({ collapsed = false, setCollapsed = () => {} }) {
  return (
    <aside className={"app-sidebar" + (collapsed ? " collapsed" : "")} aria-label="Navegação principal">
      <div className="sidebar-top">
        <div className="sidebar-brand" title={!collapsed ? "Clínica Peficaz" : "Clínica Peficaz"}>
          <div className="clinic-logo">🩺</div>
          {!collapsed && <div className="clinic-name">Clínica Peficaz</div>}
        </div>

        <button
          className="sidebar-toggle"
          aria-pressed={collapsed}
          aria-label={collapsed ? "Expandir a barra lateral" : "Colapsar a barra lateral"}
          onClick={() => {
            try {
              setCollapsed(!collapsed);
              localStorage.setItem("sidebar_collapsed", !collapsed ? "1" : "0");
            } catch {}
          }}
          type="button"
        >
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav" role="navigation">
        {LINKS.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
            title={collapsed ? label : ""}
          >
            <span className="link-icon" aria-hidden="true"><Icon size={18} /></span>
            {!collapsed && <span className="link-label">{label}</span>}
            {collapsed && <span className="tooltip">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && <small>v1.0 • Peficaz</small>}
      </div>
    </aside>
  );
}
