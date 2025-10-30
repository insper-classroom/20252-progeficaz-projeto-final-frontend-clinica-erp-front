// src/components/ScheduleList.jsx
import React from "react";

export default function ScheduleList({ horarios }) {
  if (!horarios || Object.keys(horarios).length === 0)
    return <div style={{ color: "var(--muted)", textAlign: "center" }}>Nenhum horário cadastrado.</div>;

  return (
    <div className="schedule-list">
      {Object.entries(horarios).map(([date, times]) => (
        <div key={date} className="schedule-day">
          <h4>{date}</h4>
          <ul>
            {Object.entries(times).map(([hora, info]) => (
              <li key={hora} className={`slot ${info.status}`}>
                <span>{hora}</span>
                <span className="status">{info.status}</span>
                {info.paciente && info.paciente !== "ne" && (
                  <span className="paciente">{info.paciente}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
