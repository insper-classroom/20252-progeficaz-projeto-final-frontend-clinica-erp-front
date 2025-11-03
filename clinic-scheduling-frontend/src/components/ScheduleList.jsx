// src/components/ScheduleList.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function ScheduleList({ horarios, onDeleteSlot, onClearDate, onClearAll }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // busca lista de pacientes para resolver nome pelo ID
    (async () => {
      try {
        const resp = await axios.get("/pacientes");
        setPatients(resp?.data?.pacientes ?? []);
      } catch (err) {
        console.error("Erro ao carregar pacientes:", err);
      }
    })();
  }, []);

  if (!horarios || Object.keys(horarios).length === 0) {
    return <div style={{ color: "var(--muted)", textAlign: "center" }}>Nenhum horário cadastrado.</div>;
  }

  // resolve o nome do paciente
  const getPacienteNome = (id) => {
    if (!id || id === "ne") return "nenhum";
    const p = patients.find((x) => String(x._id) === String(id));
    return p ? p.nome : id; // mostra nome, ou ID se não encontrar
  };

  return (
    <div className="schedule-list">
      {Object.entries(horarios).map(([date, times]) => (
        <div key={date} className="schedule-day">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <h4>{date}</h4>
            <div style={{ display: "flex", gap: 8 }}>
              {onClearDate && (
                <button
                  className="icon-btn"
                  onClick={() => onClearDate(date)}
                  title={`Remover todos os horários de ${date}`}
                >
                  🗑️ dia
                </button>
              )}
            </div>
          </div>

          <ul>
            {Object.entries(times).map(([hora, info]) => (
              <li key={hora} className={`slot ${info?.status || ""}`}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>{hora}</strong>
                    <div className="status">{info?.status}</div>
                    {info?.paciente && info.paciente !== "ne" && (
                      <div className="paciente">{getPacienteNome(info.paciente)}</div>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    {onDeleteSlot && (
                      <button className="icon-btn" onClick={() => onDeleteSlot && onDeleteSlot(date, hora, info)} title={`Remover ${hora} de ${date}`}>
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {onClearAll && (
        <div style={{ marginTop: 12, textAlign: "center" }}>
          <button
            className="btn clear"
            onClick={() => onClearAll()}
            title="Remover todos os horários do médico"
          >
            Remover todos os horários do médico
          </button>
        </div>
      )}
    </div>
  );
}
