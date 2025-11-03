import React, { useEffect, useState } from "react";
import axios from "../../../api/axiosInstance";
import "./PatientQuery.css";

export default function PatientQuery() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');

    async function loadPatients() {
        setLoading(true);
        setError(null);
        try {
            const resp = await axios.get("/pacientes");
            // backend pode devolver { pacientes: [...] } ou um array direto
            const pacientes = resp?.data?.pacientes ?? resp?.data ?? [];
            setPatients(Array.isArray(pacientes) ? pacientes : []);
        } catch (err) {
            console.error("Erro ao carregar pacientes:", err);
            setError(err);
            setPatients([]);
        } finally {
            setLoading(false);
        }
    }

    async function deletePatient(id) {
        try {
            const resp = await axios.delete(`/pacientes/${id}`);
            window.alert('Paciente deletado com sucesso.');
            loadPatients();
        } catch (err) {
            console.error("Erro ao deletar paciente:", err);
            window.alert('Erro ao deletar paciente.');
        }
    }

    useEffect(() => {
        // carrega automaticamente ao montar
        loadPatients();
    }, []);

    return (
        <div className="patient-query">
            <h2>Consultar pacientes</h2>

            <div style={{ marginBottom: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Buscar por nome..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ padding: 8, borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)', flex: 1 }}
                />

                <button className="btn" onClick={loadPatients} disabled={loading}>
                    {loading ? 'Carregando...' : 'Recarregar'}
                </button>
            </div>

            {error && (
                <div style={{ color: 'crimson', marginBottom: 12 }}>
                    Erro ao carregar pacientes: {String(error?.response?.statusText || error?.message || error)}
                </div>
            )}

            {!loading && patients.length === 0 && !error && (
                <div style={{ color: 'var(--muted)' }}>Nenhum paciente encontrado.</div>
            )}

            {/* filtro local por nome */}
            {patients.length > 0 && (
                (() => {
                    const filtered = patients.filter((p) => {
                        const name = (p.nome || p.name || '').toString().toLowerCase();
                        return name.includes(query.toLowerCase());
                    });

                    if (!loading && filtered.length === 0) {
                        return <div style={{ color: 'var(--muted)' }}>Nenhum paciente corresponde à busca.</div>;
                    }

                    return (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {filtered.map((p) => (
                                        <li key={p._id ?? p.cpf ?? Math.random()} className="patient-item">
                                            <div className="patient-main">
                                                <strong className="patient-name">{p.nome || p.name || '—'}</strong>
                                                <div className="patient-meta">CPF: {p.cpf || '—'} — Celular: {p.celular || '—'} — Idade: {p.idade ?? p.age ?? '—'}</div>
                                            </div>

                                            <div className="patient-item-actions">
                                                <button
                                                    className="btn ghost delete-btn"
                                                    onClick={() => {
                                                        const id = p._id || p.id;
                                                        if (!id) {
                                                            window.alert('ID do paciente não disponível.');
                                                            return;
                                                        }
                                                        if (window.confirm(`Confirma exclusão do paciente ${p.nome || p.name || id}?`)) {
                                                            deletePatient(id);
                                                        }
                                                    }}
                                                >
                                                    🗑
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                        </ul>
                    );
                })()
            )}
        </div>
    );
}
