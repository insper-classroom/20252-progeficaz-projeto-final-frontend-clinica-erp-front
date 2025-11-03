// src/pages/Appointments/AppointmentForm.jsx
import React, { useMemo, useState, useEffect } from "react";

/**
 * Props:
 *  - patients: array
 *  - doctors: array
 *  - selectedDate: 'YYYY-MM-DD'
 *  - onDateChange(dateString)
 *  - onCreate({ patientId, doctorId, data, hora, detalhes })
 *  - loading
 */
export default function AppointmentForm({ patients = [], doctors = [], selectedDate, onDateChange, onCreate, loading }) {
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [hora, setHora] = useState("");
  const [detalhes, setDetalhes] = useState("");

  // search state for patients
  const [patientQuery, setPatientQuery] = useState("");
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);

  // available horarios for selected doctor+date (object { "HH:mm": { status, paciente }})
  const availableHorarios = useMemo(() => {
    if (!selectedDoctorId || !selectedDate) return {};
    const doc = doctors.find((d) => String(d._id) === String(selectedDoctorId));
    if (!doc) return {};
    return (doc.horarios && doc.horarios[selectedDate]) ? doc.horarios[selectedDate] : {};
  }, [selectedDoctorId, selectedDate, doctors]);

  // build options array only for 'disponível' slots
  const availableOptions = useMemo(() => {
    return Object.entries(availableHorarios)
      .filter(([h, info]) => (info?.status === "disponível" || info?.status === "disponivel" || !info?.status))
      .map(([h]) => h);
  }, [availableHorarios]);

  // reset hora when date/doctor changes
  useEffect(() => {
    setHora("");
  }, [selectedDoctorId, selectedDate]);

  // when selectedPatientId changes, reflect it on query input (for UX)
  useEffect(() => {
    const p = patients.find((x) => String(x._id) === String(selectedPatientId));
    if (p) setPatientQuery(p.nome || p.name || "");
  }, [selectedPatientId, patients]);

  // filtered patients for dropdown (simple, client-side). Limit results for performance.
  const filteredPatients = useMemo(() => {
    const q = (patientQuery || "").trim().toLowerCase();
    if (!q) return patients.slice(0, 30);
    return patients.filter((p) => (p.nome || p.name || "").toLowerCase().includes(q)).slice(0, 30);
  }, [patients, patientQuery]);

  // Clear form helper
  function clearFormLocal() {
    setSelectedPatientId("");
    setPatientQuery("");
    setSelectedDoctorId("");
    setHora("");
    setDetalhes("");
  }

  async function handleSubmit(e) {
    e && e.preventDefault();
    if (!onCreate) {
      window.alert("Handler de criação não fornecido.");
      return;
    }
    if (!selectedPatientId) {
      window.alert("Selecione um paciente.");
      return;
    }
    if (!selectedDoctorId) {
      window.alert("Selecione um médico.");
      return;
    }
    if (!hora) {
      window.alert("Selecione um horário.");
      return;
    }

    const success = await onCreate({
      patientId: selectedPatientId,
      doctorId: selectedDoctorId,
      data: selectedDate,
      hora,
      detalhes: detalhes ? { observacoes: detalhes } : {},
    });

    if (success) {
      clearFormLocal();
    }
  }

  function handleSelectPatient(p) {
    setSelectedPatientId(p._id);
    setPatientQuery(p.nome || p.name || "");
    setShowPatientDropdown(false);
  }

  return (
    <form className="appointment-form" onSubmit={handleSubmit} autoComplete="off">
      <label>
        Paciente
        <div style={{ position: "relative" }}>
          <input
            type="text"
            value={patientQuery}
            onChange={(e) => { setPatientQuery(e.target.value); setShowPatientDropdown(true); }}
            onFocus={() => setShowPatientDropdown(true)}
            onBlur={() => {
              // pequeno delay para permitir clique em item do dropdown
              setTimeout(() => setShowPatientDropdown(false), 150);
            }}
            placeholder="Pesquisar paciente por nome"
            aria-label="Buscar paciente"
          />

          {showPatientDropdown && (
            <ul className="patient-dropdown" role="listbox" aria-label="Resultados de pacientes">
              {filteredPatients.length === 0 ? (
                <li className="patient-dropdown-item empty">Nenhum paciente encontrado</li>
              ) : (
                filteredPatients.map((p) => {
                  const id = p._id ?? p.id ?? p.cpf ?? Math.random();
                  return (
                    <li
                      key={id}
                      role="option"
                      className="patient-dropdown-item"
                      onMouseDown={(ev) => ev.preventDefault()} // evita blur antes do click
                      onClick={() => handleSelectPatient(p)}
                    >
                      <div style={{ fontWeight: 700 }}>{p.nome || p.name}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>CPF: {p.cpf || "—"} · {p.celular || "—"}</div>
                    </li>
                  );
                })
              )}
            </ul>
          )}
        </div>
      </label>

      <label>
        Médico
        <select value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)}>
          <option value="">— selecione —</option>
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>{d.nome} — {d.especialidade}</option>
          ))}
        </select>
      </label>

      <label>
        Data
        <input type="date" value={selectedDate} onChange={(e) => onDateChange && onDateChange(e.target.value)} />
      </label>

      <label>
        Horário disponível
        <select value={hora} onChange={(e) => setHora(e.target.value)} disabled={!availableOptions.length}>
          <option value="">{availableOptions.length ? "— selecione —" : "Nenhum horário disponível"}</option>
          {availableOptions.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </label>

      <label>
        Observações (opcional)
        <input value={detalhes} onChange={(e) => setDetalhes(e.target.value)} placeholder="Ex.: Teleconsulta / observações" />
      </label>

      <div className="actions-row appointment-actions-adjusted">
        <button
          type="submit"
          className="btn primary"
          disabled={loading || !selectedPatientId || !selectedDoctorId || !hora}
        >
          {loading ? "Enviando..." : "Agendar consulta"}
        </button>

        <button
          type="button"
          className="btn ghost"
          onClick={() => clearFormLocal()}
        >
          Limpar
        </button>
      </div>
    </form>
  );
}
