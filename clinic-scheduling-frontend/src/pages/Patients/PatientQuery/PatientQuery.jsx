import React, { useEffect, useState } from "react";
import axios from "../../../api/axiosInstance";

export default function PatientQuery() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        // carrega automaticamente ao montar
        loadPatients();
    }, []);

    return (
        <div className="patient-query">
            <h2>Consultar pacientes</h2>

            <div style={{ marginBottom: 12 }}>
                <button className="btn" onClick={loadPatients} disabled={loading}>
                    {loading ? 'Carregando...' : 'Recarregar pacientes'}
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

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {patients.map((p) => (
                    <li key={p._id ?? p.cpf ?? Math.random()} style={{ padding: 10, borderRadius: 8, marginBottom: 8, border: '1px solid rgba(255,255,255,0.03)' }}>
                        <strong style={{ display: 'block' }}>{p.nome || p.name || '—'}</strong>
                        <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                            CPF: {p.cpf || '—'} — Celular: {p.celular || '—'} — Idade: {p.idade ?? p.age ?? '—'}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
