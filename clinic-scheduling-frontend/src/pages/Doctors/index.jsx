// src/pages/Doctors/index.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import DoctorForm from "./DoctorForm";
import ScheduleList from "../../components/ScheduleList";
import "./index.css";


export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]); // garante array
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [error, setError] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);

  async function loadDoctors() {
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.get("/medicos");
      // backend responde { medicos: [...] }
      const medicos = resp?.data?.medicos ?? [];
      setDoctors(Array.isArray(medicos) ? medicos : []);
    } catch (err) {
      console.error("Erro ao buscar médicos:", err);
      setDoctors([]);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDoctors();
  }, []);

  async function handleSaveDoctor(basic) {
    const payload = {
      nome: basic.nome,
      cpf: basic.cpf,
      crm: basic.crm,
      especialidade: basic.especialidade,
      horarios: {}, // mantemos vazio aqui
    };
    try {
      const { data } = await axios.post("/medicos", payload);
      // backend retorna { mensagem: "...", id: "<id>" }
      const newId = data?.id || data?._id || null;

      // constrói objeto local para refletir criação sem recarregar do servidor
      const created = {
        _id: newId,
        nome: payload.nome,
        cpf: payload.cpf,
        crm: payload.crm,
        especialidade: payload.especialidade,
        horarios: {},
      };

      setDoctors((prev) => [...prev, created]);
      window.alert("Médico criado com sucesso.");
    } catch (err) {
      console.error("Erro ao criar médico:", err);
      const message = err?.erro || err?.message || "Erro ao criar médico";
      window.alert(message);
    }
  }

  const filtered = doctors.filter((d) =>
    (d.nome || d.name || "").toLowerCase().includes(query.toLowerCase())
  );
  async function handleUpdateDoctor(data) {
    if (!editingDoctor) return;
    try {
      const { _id } = editingDoctor;
      await axios.put(`/medicos/${_id}`, data);
      setDoctors((prev) =>
        prev.map((m) =>
          String(m._id) === String(_id) ? { ...m, ...data } : m
        )
      );
      setEditingDoctor(null);
      window.alert("Médico atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar médico:", err);
      window.alert("Erro ao atualizar médico (veja console).");
    }
  }

  // Deletar médico
  async function handleDeleteDoctor(id) {
    if (!window.confirm("Confirmar exclusão do médico? Esta ação é irreversível.")) return;
    try {
      await axios.delete(`/medicos/${id}`);
      setDoctors((prev) => prev.filter((m) => String(m._id) !== String(id)));
      if (selectedDoctor?._id === id) setSelectedDoctor(null);
      window.alert("Médico excluído.");
    } catch (err) {
      console.error("Erro ao deletar médico:", err);
      window.alert("Erro ao deletar médico (veja console).");
    }
  }

  
  function handleEditDoctor(med) {
  // move o foco para o topo e preenche o formulário com os dados
    window.scrollTo({ top: 0, behavior: "smooth" });
    setEditingDoctor(med);
  }

  // Remove um horário específico do médico selecionado (ou de um médico passado)
  async function handleDeleteSlot(date, hora, medico = selectedDoctor) {
    if (!medico) return window.alert("Nenhum médico selecionado.");
    if (!window.confirm(`Remover horário ${hora} em ${date}?`)) return;

    try {
      const id = medico._id;
    
      // ✅ Novo endpoint DELETE para horários individuais
      await axios.delete(`/medicos/${id}/horarios`, {
        data: { data: date, hora: hora },
      });
      
      
      const newHorarios = { ...(medico.horarios || {}) };
      if (newHorarios[date]) {
        delete newHorarios[date][hora];
        if (Object.keys(newHorarios[date]).length === 0) delete newHorarios[date];
      }
      // atualizar estado local de doctors e selectedDoctor
      setDoctors((prev) => prev.map((m) => (String(m._id) === String(id) ? { ...m, horarios: newHorarios } : m)));
      if (selectedDoctor?._id === id) setSelectedDoctor((s) => ({ ...s, horarios: newHorarios }));
      window.alert("Horário removido.");
    } catch (err) {
      console.error("Erro ao remover horário:", err);
      window.alert("Erro ao remover horário (veja console).");
    }
  }

  // Remove todos os horários de uma data
  async function handleClearDate(date, medico = selectedDoctor) {
    if (!medico) return window.alert("Nenhum médico selecionado.");
    if (!window.confirm(`Remover todos os horários de ${date}?`)) return;

    try {
      const id = medico._id;
      await axios.delete(`/medicos/${id}/horarios`, {
      data: { data: date },
      });

      const newHorarios = { ...(medico.horarios || {}) };
      delete newHorarios[date];
      
      setDoctors((prev) => prev.map((m) => (String(m._id) === String(id) ? { ...m, horarios: newHorarios } : m)));
      if (selectedDoctor?._id === id) setSelectedDoctor((s) => ({ ...s, horarios: newHorarios }));
      window.alert(`Horários de ${date} removidos com sucesso.`);
    } catch (err) {
      console.error("Erro ao limpar data:", err);
      window.alert("Erro ao limpar data (veja console).");
    }
  }

  // Remove todos os horários do médico
  async function handleClearAllHorarios(medico = selectedDoctor) {
    if (!medico) return window.alert("Nenhum médico selecionado.");
    if (!window.confirm(`Remover todos os horários do médico ${medico.nome || medico.name}?`)) return;

    try {
      const id = medico._id;
      const newHorarios = {};
      await axios.put(`/medicos/${id}`, newHorarios);
      setDoctors((prev) => prev.map((m) => (String(m._id) === String(id) ? { ...m, horarios: newHorarios } : m)));
      if (selectedDoctor?._id === id) setSelectedDoctor((s) => ({ ...s, horarios: newHorarios }));
      window.alert("Todos os horários removidos.");
    } catch (err) {
      console.error("Erro ao limpar todos os horários:", err);
      window.alert("Erro ao limpar todos os horários (veja console).");
    }
  }

  return (
    <div className="doctors-root">
      <h1>Médicos — cadastro e consultas</h1>

      <section className="doctors-grid">
        <div className="card form-section">
          <h2>Formulário de cadastro</h2>
          <DoctorForm
            initial={editingDoctor}
            onSubmit={editingDoctor ? handleUpdateDoctor : handleSaveDoctor}
            onCancelEdit={() => setEditingDoctor(null)}
          />
          <div className="actions" style={{ marginTop: 12 }}>
            <button className="btn" onClick={loadDoctors} disabled={loading}>
              Atualizar lista
            </button>
          </div>
        </div>

        <aside className="card">
          <h3>Pesquisar médico</h3>
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: "100%", marginBottom: 12 }}
          />
          <div style={{ maxHeight: 300, overflow: "auto" }}>
            {loading ? (
              <div style={{ color: "var(--muted)", textAlign: "center" }}>Carregando…</div>
            ) : filtered.length === 0 ? (
              <div style={{ color: "var(--muted)", textAlign: "center" }}>Nenhum médico</div>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {filtered.map((d) => (
                  <li
                  key={d._id ?? d.crm}
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    marginBottom: 8,
                    background: selectedDoctor?._id === d._id ? "rgba(15,179,135,0.08)" : "transparent",
                    cursor: "pointer",
                    border: "1px solid rgba(255,255,255,0.03)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                  }}
                  onClick={() => setSelectedDoctor(d)}
                >
                  <div>
                    <strong>{d.nome || d.name}</strong>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>{d.especialidade} — {d.crm}</div>
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="icon-btn" onClick={(e) => { e.stopPropagation(); handleEditDoctor(d); }} title="Editar médico">✏️</button>
                    <button className="icon-btn" onClick={(e) => { e.stopPropagation(); handleDeleteDoctor(d._id); }} title="Deletar médico">🗑️</button>
                  </div>
                </li>

                ))}
              </ul>
            )}
          </div>
        </aside>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2 className="section-title">Consultas / Horários do médico selecionado</h2>
        {!selectedDoctor ? (
          <div style={{ color: "var(--muted)", textAlign: "center", padding: 16 }}>
            Selecione um médico à esquerda para ver seus horários/agendamentos.
          </div>
        ) : (
          <div className="card">
            <h3>{selectedDoctor.nome || selectedDoctor.name}</h3>
            <div style={{ color: "var(--muted)", marginBottom: 12 }}>
              {selectedDoctor.especialidade} — {selectedDoctor.crm}
            </div>

            <h4 style={{ marginTop: 6 }}>Horários (objeto)</h4>
            <ScheduleList
              horarios={selectedDoctor.horarios}
              onDeleteSlot={(date, hora) => handleDeleteSlot(date, hora)}
              onClearDate={(date) => handleClearDate(date)}
              onClearAll={() => handleClearAllHorarios()}
            />

          </div>
        )}
      </section>

      {error && <div style={{ color: "crimson", marginTop: 12 }}>Erro: {String(error?.erro || error?.message || error)}</div>}
    </div>
  );
}
