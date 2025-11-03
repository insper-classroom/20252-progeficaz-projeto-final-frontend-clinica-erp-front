import React, { useEffect, useState } from "react";
import axios from "../../../api/axiosInstance";
import "./PatientQuery.css";

export default function PatientQuery() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [displayQuery, setDisplayQuery] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Editing state
  const [editingPatient, setEditingPatient] = useState(null); // object with patient data
  const [updating, setUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => setDisplayQuery(query), 200);
    return () => clearTimeout(t);
  }, [query]);

  // Utility to extract id
  function getIdOf(p) {
    return p._id ?? p.id ?? null;
  }

  async function loadPatients() {
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.get("/pacientes");
      const pacientes = resp?.data?.pacientes ?? resp?.data ?? [];
      setPatients(Array.isArray(pacientes) ? pacientes : []);
    } catch (err) {
      console.error("Erro ao carregar pacientes:", err);
      const message =
        err?.response?.data?.erro ||
        err?.response?.statusText ||
        err?.message ||
        "Erro ao carregar pacientes";
      setError(message);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPatients();
  }, []);

  // Optimistic delete with fallback
  async function deletePatient(id) {
    if (!id) {
      return window.alert("ID do paciente não disponível.");
    }
    if (!window.confirm(`Confirma exclusão do paciente ${id}?`)) return;

    setDeletingId(id);
    const prev = patients;
    setPatients((p) => p.filter((x) => getIdOf(x) !== id));

    try {
      await axios.delete(`/pacientes/${id}`);
      window.alert("Paciente deletado com sucesso.");
    } catch (err) {
      console.error("Erro ao deletar paciente:", err);
      window.alert("Erro ao deletar paciente.");
      setPatients(prev); // reverte
    } finally {
      setDeletingId(null);
    }
  }

  // NEW: Update patient via PUT /pacientes/:id
  async function updatePatient(id, payload) {
    if (!id) {
      setUpdateStatus({ type: "error", text: "ID do paciente não disponível." });
      return;
    }

    setUpdating(true);
    setUpdateStatus(null);

    try {
      const res = await axios.put(`/pacientes/${encodeURIComponent(id)}`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      // Atualiza a lista localmente: substitui o paciente atualizado
      setPatients((prev) =>
        prev.map((p) => (getIdOf(p) === id ? { ...p, ...payload } : p))
      );

      setUpdateStatus({
        type: "success",
        text: res?.data?.mensagem || "Paciente atualizado com sucesso.",
      });

      // Fecha o form de edição (opcional). Mantemos por padrão aberto para mostrar sucesso.
      // setEditingPatient(null);
    } catch (err) {
      console.error("Erro ao atualizar paciente:", err);
      const message =
        err?.response?.data?.erro ||
        err?.response?.statusText ||
        err?.message ||
        "Erro ao atualizar paciente";
      setUpdateStatus({ type: "error", text: message });
    } finally {
      setUpdating(false);
    }
  }

  // Handler para abrir o form de edição e preencher os campos
  function handleStartEdit(p) {
    // Clona os dados e converte para strings quando necessário
    setEditingPatient({
      _id: getIdOf(p),
      nome: p.nome ?? p.name ?? "",
      cpf: p.cpf ?? "",
      celular: p.celular ?? "",
      idade: p.idade !== undefined ? String(p.idade) : "",
    });
    setUpdateStatus(null);
  }

  // Handler para cancelar edição
  function handleCancelEdit() {
    setEditingPatient(null);
    setUpdateStatus(null);
  }

  // Handler para submit do form de edição
  async function handleSubmitEdit(e) {
    e.preventDefault();
    if (!editingPatient) return;

    // Validação simples (similar ao exemplo anterior)
    const nome = (editingPatient.nome || "").trim();
    const cpfNumbers = (editingPatient.cpf || "").replace(/\D/g, "");
    const celularNums = (editingPatient.celular || "").replace(/\D/g, "");
    const idadeNum = Number(editingPatient.idade);

    if (!nome) {
      setUpdateStatus({ type: "error", text: "Nome é obrigatório." });
      return;
    }
    if (!cpfNumbers || cpfNumbers.length !== 11) {
      setUpdateStatus({ type: "error", text: "CPF deve ter 11 dígitos." });
      return;
    }
    if (!celularNums || celularNums.length < 10) {
      setUpdateStatus({ type: "error", text: "Celular inválido." });
      return;
    }
    if (editingPatient.idade === "" || Number.isNaN(idadeNum) || !Number.isInteger(idadeNum) || idadeNum < 0 || idadeNum > 130) {
      setUpdateStatus({ type: "error", text: "Idade inválida." });
      return;
    }

    const payload = {
      nome,
      cpf: cpfNumbers,
      celular: celularNums,
      idade: idadeNum,
    };

    await updatePatient(editingPatient._id, payload);
  }

  // Handler para atualizar editingPatient fields
  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditingPatient((prev) => ({ ...prev, [name]: value }));
  }

  // Filtered list
  const filtered = patients.filter((p) =>
    (p.nome ?? p.name ?? "").toString().toLowerCase().includes(displayQuery.toLowerCase())
  );

  return (
    <div className="patient-query">
      <h2>Consultar pacientes</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          aria-label="Buscar pacientes por nome"
        />

        <button className="btn" onClick={loadPatients} disabled={loading}>
          {loading ? "Carregando..." : "Recarregar"}
        </button>
      </div>

      {error && <div className="error">Erro ao carregar pacientes: {String(error)}</div>}

      {!loading && patients.length === 0 && !error && (
        <div className="muted">Nenhum paciente encontrado.</div>
      )}

      {patients.length > 0 && (
        <>
          {filtered.length === 0 && !loading ? (
            <div className="muted">Nenhum paciente corresponde à busca.</div>
          ) : (
            <ul className="patient-list">
              {filtered.map((p, idx) => {
                const id = getIdOf(p) ?? String(idx);
                const name = p.nome ?? p.name ?? "—";
                const cpf = p.cpf ?? "—";
                const celular = p.celular ?? "—";
                const idade = p.idade ?? p.age ?? "—";

                return (
                  <li key={id} className="patient-item">
                    <div className="patient-main">
                      <strong className="patient-name">{name}</strong>
                      <div className="patient-meta">
                        CPF: {cpf} — Celular: {celular} — Idade: {idade}
                      </div>
                    </div>

                    <div className="patient-item-actions">
                      <button
                        className="btn ghost edit-btn"
                        onClick={() => handleStartEdit(p)}
                        aria-label={`Editar paciente ${name}`}
                        title="Editar"
                      >
                        ✏️
                      </button>

                      <button
                        className="btn ghost delete-btn"
                        onClick={() => {
                          if (!getIdOf(p)) {
                            window.alert("ID do paciente não disponível.");
                            return;
                          }
                          if (window.confirm(`Confirma exclusão do paciente ${name}?`)) {
                            deletePatient(getIdOf(p));
                          }
                        }}
                        disabled={deletingId === getIdOf(p)}
                        aria-label={`Excluir paciente ${name}`}
                        title="Excluir"
                      >
                        {deletingId === getIdOf(p) ? "..." : "🗑"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
      <h3>Consulta indivual</h3>
      {/* Edição: aparece abaixo da lista quando editingPatient não é null */}
      {editingPatient && (
        <section className="edit-section card" aria-labelledby="editTitle">
          <h3 id="editTitle">Editando paciente: {editingPatient.nome}</h3>

          <form onSubmit={handleSubmitEdit} className="edit-form" noValidate>
            <div className="form-row">
              <label>
                Nome
                <input
                  name="nome"
                  value={editingPatient.nome}
                  onChange={handleEditChange}
                  type="text"
                  required
                />
              </label>

              <label>
                CPF
                <input
                  name="cpf"
                  value={editingPatient.cpf}
                  onChange={handleEditChange}
                  type="text"
                  inputMode="numeric"
                  placeholder="00000000000"
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Celular
                <input
                  name="celular"
                  value={editingPatient.celular}
                  onChange={handleEditChange}
                  type="text"
                  inputMode="tel"
                  placeholder="(11) 9xxxx-xxxx"
                  required
                />
              </label>

              <label>
                Idade
                <input
                  name="idade"
                  value={editingPatient.idade}
                  onChange={handleEditChange}
                  type="text"
                  min="0"
                  max="130"
                  required
                />
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={updating}>
                {updating ? "Atualizando..." : "Atualizar cadastro"}
              </button>

              <button type="button" className="btn" onClick={handleCancelEdit}>
                Cancelar
              </button>
            </div>

            {updateStatus && (
              <div
                className={`update-status ${updateStatus.type === "error" ? "error" : "success"}`}
                role="status"
                aria-live="polite"
              >
                {updateStatus.text}
              </div>
            )}
          </form>
        </section>
      )}
    </div>
  );
}
