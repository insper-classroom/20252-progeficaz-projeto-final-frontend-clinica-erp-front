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

  async function handleSubmit(e) {
    e && e.preventDefault();
    if (!onCreate) {
      window.alert("Handler de criação não fornecido.");
      return;
    }
    // use the state variable names used here (selectedPatientId / selectedDoctorId)
    const success = await onCreate({
      patientId: selectedPatientId,
      doctorId: selectedDoctorId,
      data: selectedDate,
      hora,
      detalhes: detalhes ? { observacoes: detalhes } : {},
    });
    if (success) {
      // limpa formulário
      setSelectedPatientId("");
      setSelectedDoctorId("");
      setHora("");
      setDetalhes("");
    }
  }

  return (
    <form className="appointment-form" onSubmit={handleSubmit}>
      <label>
        Paciente
        <select value={selectedPatientId} onChange={(e) => setSelectedPatientId(e.target.value)}>
          <option value="">— selecione —</option>
          {patients.map((p) => (
            <option key={p._id} value={p._id}>{p.nome}</option>
          ))}
        </select>
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

      <div className="actions-row">
        <button type="submit" className="btn primary" disabled={loading || !selectedPatientId || !selectedDoctorId || !hora}>
          Agendar consulta
        </button>
        <button type="button" className="btn" onClick={() => { setSelectedPatientId(""); setSelectedDoctorId(""); setHora(""); setDetalhes(""); }}>
          Limpar
        </button>
      </div>
    </form>
  );
}
