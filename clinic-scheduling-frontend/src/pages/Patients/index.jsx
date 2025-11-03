// src/pages/Patients/index.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import PatientForm from "./PatientForm";
import ScheduleList from "../../components/ScheduleList";
import "./index.css";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [error, setError] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);

  async function loadPatients() {
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.get("/pacientes");
      const pacs = resp?.data?.pacientes ?? [];
      setPatients(Array.isArray(pacs) ? pacs : []);
    } catch (err) {
      console.error("Erro ao buscar pacientes:", err);
      setPatients([]);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPatients();
  }, []);

  async function handleSavePatient(basic) {
    const payload = {
      nome: basic.nome,
      cpf: basic.cpf,
      celular: basic.celular,
      idade: basic.idade,
    };
    try {
      const { data } = await axios.post("/pacientes", payload);
      const newId = data?.id || data?._id || null;

      const created = {
        _id: newId,
        nome: payload.nome,
        cpf: payload.cpf,
        celular: payload.celular,
        idade: payload.idade,
        consultas: {},
      };

      setPatients((prev) => [...prev, created]);
      window.alert("Paciente criado com sucesso.");
    } catch (err) {
      console.error("Erro ao criar paciente:", err);
      const message = err?.erro || err?.message || "Erro ao criar paciente";
      window.alert(message);
    }
  }

  const filtered = patients.filter((p) =>
    (p.nome || p.name || "").toLowerCase().includes(query.toLowerCase())
  );

  async function handleUpdatePatient(data) {
    if (!editingPatient) return;
    try {
      const { _id } = editingPatient;
      await axios.put(`/pacientes/${_id}`, data);
      setPatients((prev) =>
        prev.map((p) => (String(p._id) === String(_id) ? { ...p, ...data } : p))
      );
      setEditingPatient(null);
      window.alert("Paciente atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar paciente:", err);
      window.alert("Erro ao atualizar paciente (veja console).");
    }
  }

  async function handleDeletePatient(id) {
    if (!window.confirm("Confirmar exclusão do paciente? Esta ação é irreversível.")) return;
    try {
      await axios.delete(`/pacientes/${id}`);
      setPatients((prev) => prev.filter((p) => String(p._id) !== String(id)));
      if (selectedPatient?._id === id) setSelectedPatient(null);
      window.alert("Paciente excluído.");
    } catch (err) {
      console.error("Erro ao deletar paciente:", err);
      window.alert("Erro ao deletar paciente (veja console).");
    }
  }

  function handleEditPatient(p) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setEditingPatient(p);
  }

  // Remove uma consulta específica do paciente (e tenta também remover o horário do médico vinculado)
  async function handleDeleteConsulta(date, hora, info, paciente = selectedPatient) {
    if (!paciente) return window.alert("Nenhum paciente selecionado.");
    if (!window.confirm(`Remover consulta ${hora} em ${date}?`)) return;

    try {
      const id = paciente._id;

      // 1) remove a consulta do paciente
      await axios.delete(`/pacientes/${id}/consultas`, {
        data: { data: date, hora: hora },
      });

      // 2) se a consulta referenciar um médico, tenta remover o horário correspondente do médico
      const medicoId = info?.medico;
      if (medicoId && medicoId !== "ne") {
        try {
          await axios.delete(`/medicos/${medicoId}/horarios`, {
            data: { data: date, hora },
          });
        } catch (err) {
          console.error("Falha ao remover horário do médico (após remover consulta do paciente):", err);
        }
      }

      // 3) atualizar estado local de patients e selectedPatient
      const newConsultas = { ...(paciente.consultas || {}) };
      if (newConsultas[date]) {
        delete newConsultas[date][hora];
        if (Object.keys(newConsultas[date]).length === 0) delete newConsultas[date];
      }

      setPatients((prev) =>
        prev.map((p) => (String(p._id) === String(id) ? { ...p, consultas: newConsultas } : p))
      );
      if (selectedPatient?._id === id) setSelectedPatient((s) => ({ ...s, consultas: newConsultas }));

      window.alert("Consulta removida.");
    } catch (err) {
      console.error("Erro ao remover consulta:", err);
      window.alert("Erro ao remover consulta (veja console).");
    }
  }

  // Remove todos as consultas de uma data do paciente (e as consultas dos médicos vinculados)
  async function handleClearDate(date, paciente = selectedPatient) {
    if (!paciente) return window.alert("Nenhum paciente selecionado.");
    if (!window.confirm(`Remover todas as consultas de ${date}?`)) return;

    try {
      const id = paciente._id;
      const times = (paciente.consultas && paciente.consultas[date]) ? paciente.consultas[date] : {};
      const entries = Object.entries(times); // [ [hora, info], ... ]

      // 1) remove o dia inteiro nas consultas do paciente
      await axios.delete(`/pacientes/${id}/consultas`, {
        data: { data: date },
      });

      // 2) para cada horário/entry, se houver médico vinculado, remover o horário do médico
      for (const [hora, info] of entries) {
        const medicoId = info?.medico;
        if (medicoId && medicoId !== "ne") {
          try {
            await axios.delete(`/medicos/${medicoId}/horarios`, {
              data: { data: date, hora },
            });
          } catch (err) {
            console.error(`Falha ao remover horário do médico ${medicoId} para ${date} ${hora}:`, err);
          }
        }
      }

      // 3) atualizar estado local
      const newConsultas = { ...(paciente.consultas || {}) };
      delete newConsultas[date];

      setPatients((prev) => prev.map((p) => (String(p._id) === String(id) ? { ...p, consultas: newConsultas } : p)));
      if (selectedPatient?._id === id) setSelectedPatient((s) => ({ ...s, consultas: newConsultas }));

      window.alert(`Consultas de ${date} removidas com sucesso.`);
    } catch (err) {
      console.error("Erro ao limpar data de consultas:", err);
      window.alert("Erro ao limpar data (veja console).");
    }
  }

  // Remove todas as consultas do paciente (percorre todas as datas)
  async function handleClearAllConsultas(paciente = selectedPatient) {
    if (!paciente) return window.alert("Nenhum paciente selecionado.");
    if (!window.confirm(`Remover todas as consultas do paciente ${paciente.nome || paciente.name}?`)) return;

    try {
      const id = paciente._id;
      const allDates = Object.keys(paciente.consultas || {});

      for (const date of allDates) {
        const times = paciente.consultas[date] || {};
        const entries = Object.entries(times);

        try {
          await axios.delete(`/pacientes/${id}/consultas`, { data: { data: date } });
        } catch (err) {
          console.error(`Falha ao remover consultas do paciente para ${date}:`, err);
        }

        for (const [hora, info] of entries) {
          const medicoId = info?.medico;
          if (medicoId && medicoId !== "ne") {
            try {
              await axios.delete(`/medicos/${medicoId}/horarios`, { data: { data: date, hora } });
            } catch (err) {
              console.error(`Falha ao remover horário do médico ${medicoId} (${date} ${hora}):`, err);
            }
          }
        }
      }

      const newConsultas = {};
      setPatients((prev) => prev.map((p) => (String(p._id) === String(id) ? { ...p, consultas: newConsultas } : p)));
      if (selectedPatient?._id === id) setSelectedPatient((s) => ({ ...s, consultas: newConsultas }));

      window.alert("Todas as consultas removidas.");
    } catch (err) {
      console.error("Erro ao limpar todas as consultas:", err);
      window.alert("Erro ao limpar todas as consultas (veja console).");
    }
  }

  return (
    <div className="patients-root">
      <section className="patients-grid">
        <div className="card form-section">
          <h2>Formulário de cadastro</h2>

          <PatientForm
            initial={editingPatient}
            onSubmit={editingPatient ? handleUpdatePatient : handleSavePatient}
            onCancelEdit={() => setEditingPatient(null)}
          />

          <div className="actions" style={{ marginTop: 12 }}>
            <button className="btn" onClick={loadPatients} disabled={loading}>
              Atualizar lista
            </button>
          </div>
        </div>

        <aside className="card">
          <h3>Pesquisar paciente</h3>
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
              <div style={{ color: "var(--muted)", textAlign: "center" }}>Nenhum paciente</div>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {filtered.map((p) => (
                  <li
                    key={p._id ?? p.cpf}
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      marginBottom: 8,
                      background: selectedPatient?._id === p._id ? "rgba(15,179,135,0.08)" : "transparent",
                      cursor: "pointer",
                      border: "1px solid rgba(255,255,255,0.03)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                    }}
                    onClick={() => setSelectedPatient(p)}
                  >
                    <div>
                      <strong>{p.nome || p.name}</strong>
                      <div style={{ fontSize: 13, color: "var(--muted)" }}>{p.celular} — {p.idade} anos</div>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="icon-btn" onClick={(e) => { e.stopPropagation(); handleEditPatient(p); }} title="Editar paciente">✏️</button>
                      <button className="icon-btn" onClick={(e) => { e.stopPropagation(); handleDeletePatient(p._id); }} title="Deletar paciente">🗑️</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </section>

      <section style={{ marginTop: 28 }}>
        <h2 className="section-title">Consultas / Horários do paciente selecionado</h2>
        {!selectedPatient ? (
          <div style={{ color: "var(--muted)", textAlign: "center", padding: 16 }}>
            Selecione um paciente à esquerda para ver suas consultas.
          </div>
        ) : (
          <div className="card">
            <h3>{selectedPatient.nome || selectedPatient.name}</h3>
            <div style={{ color: "var(--muted)", marginBottom: 12 }}>
              {selectedPatient.celular} — {selectedPatient.idade} anos
            </div>

            <h4 style={{ marginTop: 6 }}>Consultas (objeto)</h4>
            <ScheduleList
              horarios={selectedPatient.consultas}
              onDeleteSlot={(date, hora, info) => handleDeleteConsulta(date, hora, info)}
              onClearDate={(date) => handleClearDate(date)}
              onClearAll={() => handleClearAllConsultas()}
            />
          </div>
        )}
      </section>

      {error && <div style={{ color: "crimson", marginTop: 12 }}>Erro: {String(error?.erro || error?.message || error)}</div>}
    </div>
  );
}
