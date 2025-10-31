// src/pages/Schedules/index.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import ScheduleGenerator from "./ScheduleGenerator";
import ScheduleList from "../../components/ScheduleList";

import "./index.css"; 

export default function Schedules() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [previewHorarios, setPreviewHorarios] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoadingDoctors(true);
      try {
        const resp = await axios.get("/medicos");
        const list = resp?.data?.medicos ?? [];
        setDoctors(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("Erro ao buscar médicos:", err);
        setDoctors([]);
        setError(err);
      } finally {
        setLoadingDoctors(false);
      }
    })();
  }, []);

  const selectedDoctor = doctors?.find((d) => String(d._id) === String(selectedDoctorId));

  async function handleSaveHorarios(horarios) {
    if (!selectedDoctor) {
      window.alert("Selecione um médico primeiro.");
      return;
    }
    if (!horarios || Object.keys(horarios).length === 0) {
      window.alert("Nenhum horário para salvar.");
      return;
    }

    setSaving(true);
    try {
      await axios.put(`/medicos/${selectedDoctor._id}`, horarios);
      setDoctors((prev) =>
        prev.map((d) => (String(d._id) === String(selectedDoctor._id) ? { ...d, horarios } : d))
      );
      setPreviewHorarios(horarios);
      window.alert("Horários salvos com sucesso.");
    } catch (err) {
      console.error("Erro ao salvar horários:", err);
      window.alert("Erro ao salvar horários (veja console).");
    } finally {
      setSaving(false);
    }
  }

  function handleClearPreview() {
    setPreviewHorarios(null);
  }

  return (
    <div className="schedules-root">
      <h1> Horários — gerar e vincular </h1>

      <div className="card" style={{ marginBottom: 18 }}>
        <label style={{ display: "block", marginBottom: 8, color: "var(--muted)" }}>
          Selecionar médico
        </label>
        <select
          value={selectedDoctorId}
          onChange={(e) => setSelectedDoctorId(e.target.value)}
          className="form-select"
        >

          <option value="">— selecione —</option>
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.nome || d.name} — {d.crm}
            </option>
          ))}
        </select>
        {loadingDoctors && <div style={{ marginTop: 8, color: "var(--muted)" }}>Carregando médicos…</div>}
      </div>

      <div className="generator-card card">
        {/* O próprio ScheduleGenerator mantém seus controles e botões de gerar/limpar */}
        <ScheduleGenerator
          onGenerate={setPreviewHorarios}
          onSaveClick={() => handleSaveHorarios(previewHorarios)}
          onClear={handleClearPreview}
          saveDisabled={!previewHorarios || Object.keys(previewHorarios).length === 0}
        />


        {/* mantemos apenas o botão salvar centralizado */}
        
      </div>

      <section style={{ marginTop: 20 }}>
        <h2 className="section-title">Preview Horários gerados</h2>
        <ScheduleList horarios={previewHorarios} />

      </section>
    </div>
  );
}
