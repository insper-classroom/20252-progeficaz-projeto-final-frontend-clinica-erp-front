// src/pages/Appointments/AppointmentsList.jsx
import React, { useMemo } from "react";

export default function AppointmentsList({ appointments = [], doctors = [], filterTerm = "", onRefresh }) {
  const normalizedFilter = (filterTerm || "").trim().toLowerCase();

  // função utilitária: tenta extrair texto de observação/descrição de estruturas variadas
  function extractObs(a) {
    // várias possibilidades: a.detalhes pode ser string, objeto com 'detalhes', objeto direto, etc.
    if (!a) return "";
    const d = a.detalhes ?? a; // fallback
    if (typeof d === "string") return d;
    // se for objeto, checar campos comuns
    return (
      (d.detalhes && (typeof d.detalhes === "string" ? d.detalhes : d.detalhes.observacoes || d.detalhes.obs || d.detalhes.texto)) ||
      d.observacoes ||
      d.obs ||
      d.texto ||
      ""
    ) || "";
  }

  const enriched = useMemo(() => {
    return appointments.map((a) => {
      // tentar obter doctorId a partir dos formatos possíveis
      const doctorId = (a.detalhes && a.detalhes.detalhes && a.detalhes.detalhes.medicoId) || (a.detalhes && a.detalhes.medicoId) || a.medicoId || (a.detalhes && a.detalhes.medico);
      const doctor = doctors.find((d) => String(d._id) === String(doctorId));
      const obs = extractObs(a);
      const doctorName = doctor ? `${doctor.nome} — ${doctor.especialidade || ""}`.trim() : "";
      return { ...a, doctorName, obs };
    });
  }, [appointments, doctors]);

  const filtered = useMemo(() => {
    if (!normalizedFilter) return enriched;
    return enriched.filter((a) => {
      const patient = (a.pacienteNome || "").toLowerCase();
      const doc = (a.doctorName || "").toLowerCase();
      const spec = ( (doctors.find(d => String(d._id) === String((a.detalhes && a.detalhes.detalhes && a.detalhes.detalhes.medicoId)))?.especialidade) || "" ).toLowerCase();
      const obs = (a.obs || "").toLowerCase();
      return patient.includes(normalizedFilter) || doc.includes(normalizedFilter) || spec.includes(normalizedFilter) || obs.includes(normalizedFilter);
    });
  }, [enriched, normalizedFilter, doctors]);

  return (
    <div className="appointments-list">
      <div style={{ marginBottom: 12, color: "var(--muted)" }}>
        {filtered.length} consulta(s) encontradas
      </div>


      {filtered.length === 0 ? (
        <div className="empty">Nenhuma consulta cadastrada para esta data.</div>
      ) : (
        <ul className="appt-items">
          {filtered.map((a, idx) => (
            <li className="appt-item" key={`${a.pacienteId}-${a.hora}-${idx}`}>
              <div className="left">
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div className="time" style={{ minWidth: 64 }}>{a.hora}</div>
                  <div>
                    <div className="patient">{a.pacienteNome}</div>
                    {a.doctorName && <div className="doctor">{a.doctorName}</div>}
                    {a.obs && <div className="obs">{a.obs}</div>}
                  </div>
                </div>
              </div>

              <div className="right">
                <div className="status">{ (a.detalhes && a.detalhes.detalhes && a.detalhes.detalhes.status) || (a.detalhes && a.detalhes.status) || "pendente" }</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
