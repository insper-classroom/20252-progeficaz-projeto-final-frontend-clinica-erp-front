// src/pages/Appointments/index.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import AppointmentForm from "./AppointmentForm";
import AppointmentsList from "./AppointmentsList";
import "./appointments.css";

export default function AppointmentsPage() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointmentsForDay, setAppointmentsForDay] = useState([]); // aggregated view
  const [loading, setLoading] = useState(false);
  const [filterTerm, setFilterTerm] = useState("");

  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });

  // helper to load patients + doctors
  async function loadPatientsAndDoctors() {
    setLoading(true);
    try {
      const [pResp, dResp] = await Promise.all([axios.get("/pacientes"), axios.get("/medicos")]);
      setPatients((pResp?.data?.pacientes) ?? []);
      setDoctors((dResp?.data?.medicos) ?? []);
    } catch (err) {
      console.error("Erro ao carregar pacientes/medicos:", err);
      setPatients([]);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPatientsAndDoctors();
  }, []);

  // Build a flat list of appointments for selectedDate from patients[].consultas
  useEffect(() => {
    const list = [];
    for (const p of patients) {
      const consults = p.consultas ?? {};
      const day = consults[selectedDate] ?? {};
      for (const [hora, info] of Object.entries(day)) {
        list.push({
          pacienteId: p._id,
          pacienteNome: p.nome,
          data: selectedDate,
          hora,
          detalhes: info,
        });
      }
    }
    // sort by hora (optional) to display chronological
    list.sort((a, b) => (a.hora > b.hora ? 1 : a.hora < b.hora ? -1 : 0));
    setAppointmentsForDay(list);
  }, [patients, selectedDate]);

  // create appointment: runs two calls (doctor horarios update + patient consultas insert)
  async function handleCreateAppointment({ patientId, doctorId, data, hora, detalhes = {} }) {
    if (!patientId || !doctorId || !data || !hora) {
      window.alert("Preencha paciente, médico, data e horário.");
      return false;
    }

    const confirmMsg = `Confirmar agendamento em ${data} ${hora}?`;
    if (!window.confirm(confirmMsg)) return false;

    // 1) Atualiza horário do médico (marca ocupado + paciente)
    const newInfoForHour = { status: "ocupado", paciente: patientId, ...detalhes };

    try {
      // first call: PUT /medicos/:id/horarios (update single hour)
      await axios.put(`/medicos/${doctorId}/horarios`, {
        data,
        hora,
        info: newInfoForHour,
      });
    } catch (err) {
      console.error("Falha ao atualizar horário do médico:", err);
      window.alert("Erro ao reservar o horário no médico. Tente novamente.");
      return false;
    }

    // 2) Em seguida, registra consulta no paciente (POST /pacientes/:id/consultas)
    const payload = {
      [data]: {
        [hora]: {
          detalhes: {
            medicoId: doctorId,
            status: "pendente",
            ...detalhes,
          },
        },
      },
    };

    try {
      await axios.post(`/pacientes/${patientId}/consultas`, payload);
    } catch (err) {
      console.error("Falha ao adicionar consulta ao paciente:", err);
      // rollback simple: tentar liberar o horário no médico
      try {
        const rollbackInfo = { status: "disponível", paciente: "ne" };
        await axios.put(`/medicos/${doctorId}/horarios`, { data, hora, info: rollbackInfo });
      } catch (rbErr) {
        console.error("Rollback falhou (horário pode ter ficado inconsistente):", rbErr);
      }
      window.alert("Erro ao salvar a consulta no paciente. Operação revertida (se possível).");
      return false;
    }

    // sucesso: atualizar estado local (doctors + patients) sem reload completo
    setDoctors((prev) =>
      prev.map((d) =>
        String(d._id) === String(doctorId)
          ? { ...d, horarios: { ...(d.horarios || {}), [data]: { ...((d.horarios || {})[data] || {}), [hora]: newInfoForHour } } }
          : d
      )
    );

    setPatients((prev) =>
      prev.map((p) =>
        String(p._id) === String(patientId)
          ? { ...p, consultas: { ...(p.consultas || {}), [data]: { ...((p.consultas || {})[data] || {}), [hora]: { detalhes: payload[data][hora].detalhes } } } }
          : p
      )
    );

    window.alert("Consulta agendada com sucesso.");
    return true;
  }

  // handlers for right-panel controls
  function handleClearFilter() {
    setFilterTerm("");
  }

  async function handleReload() {
    await loadPatientsAndDoctors();
  }

  return (
    <div className="appointments-root">
      
      <div className="appointments-grid">
        <aside className="appointments-form-card card">
          <h3>Agendamento</h3>
          <AppointmentForm
            patients={patients}
            doctors={doctors}
            selectedDate={selectedDate}
            onDateChange={(d) => setSelectedDate(d)}
            onCreate={handleCreateAppointment}
            loading={loading}
          />
        </aside>

        <main className="appointments-list-card">
          {/* RIGHT PANEL CONTROLS: date + search + buttons (aligned) */}
          <div className="appointments-list-controls">
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <h3 className="section-title-right" style={{ margin: 0 }}>Consultas em {selectedDate}</h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                title="Selecionar data para listar consultas"
                className="list-date"
              />
            </div>

            <input
              type="search"
              placeholder="Buscar paciente, médico ou especialidade"
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
              className="appointments-search"
            />

            <div className="appointments-controls-right">
              <button className="btn" onClick={handleClearFilter}>Limpar</button>
              <button className="btn" onClick={handleReload}>Recarregar</button>
            </div>
          </div>

          <AppointmentsList
            appointments={appointmentsForDay}
            doctors={doctors}
            filterTerm={filterTerm}
            onRefresh={handleReload}
          />
        </main>
      </div>
    </div>
  );
}
