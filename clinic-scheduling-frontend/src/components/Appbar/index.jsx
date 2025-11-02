// src/components/AppBar/index.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function AppBar({ title = "Painel", clinic = {}, user = {}, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    // limpa sessão local (ajuste conforme seu fluxo de auth)
    try { localStorage.removeItem("auth_token"); } catch {}
    if (typeof onLogout === "function") onLogout();
    // redireciona para landing (ajuste rota se necessário: "/" ou "/landing")
    navigate("/"); 
  }

  return (
    <header className="appbar-root">
      <div className="appbar-left">
        <div className="appbar-title">
            <div className="appbar-main-title">{title}</div>
        </div>
      </div>


      <div className="appbar-right">
        {/* removido o botão lateral extra solicitado */}
        <div className="appbar-user">
          <span className="appbar-user-initial">{(user?.name || "A").charAt(0)}</span>
          <span className="appbar-username">{user?.name || "Administrador"}</span>
        </div>

        <button className="appbar-logout" onClick={handleLogout} title="Logout">
          ⤴
        </button>
      </div>
    </header>
  );
}
