// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Doctors from "./pages/Doctors";
import Schedules from "./pages/Schedules";
import "./index.css";

// Usaremos o backend real — removemos MSW/mocks.
// Se quiser manter mocks no futuro, reative condicionalmente com uma env var.
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />}>
          <Route index element={<div>Home (placeholder)</div>} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="schedules" element={<Schedules />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
