// src/pages/Doctors/index.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import DoctorForm from "./DoctorForm";
import "./index.css";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]); // garante array
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <div className="doctors-root">
      <h1>Médicos — cadastro e consultas</h1>

      <section className="doctors-grid">
        <div className="card form-section">
          <h2>Formulário de cadastro</h2>
          <DoctorForm onSubmit={handleSaveDoctor} />
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
                    }}
                    onClick={() => setSelectedDoctor(d)}
                  >
                    <strong>{d.nome || d.name}</strong>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>{d.especialidade} — {d.crm}</div>
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
            <pre className="preview-box">
              {selectedDoctor.horarios
                ? JSON.stringify(selectedDoctor.horarios, null, 2)
                : "Nenhum horário cadastrado"}
            </pre>
          </div>
        )}
      </section>

      {error && <div style={{ color: "crimson", marginTop: 12 }}>Erro: {String(error?.erro || error?.message || error)}</div>}
    </div>
  );
}
