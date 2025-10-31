import React from 'react';
import axios from '../../api/axiosInstance';
import PatientForm from './PatientForm';
import "./index.css"

export default function Patients() {
  async function handleSavePatient(basic) {
    const payload = {
      nome: basic.nome,
      cpf: basic.cpf,
      celular: basic.celular,
      idade: basic.idade,
    };
    try {
      const { data } = await axios.post('/pacientes', payload);

      const newId = data?.id || data?._id || null;

      const created = {
        _id: newId,
        nome: payload.nome,
        cpf: payload.cpf,
        celular: payload.celular,
        idade: payload.idade,
      };

      window.alert('Paciente criado com sucesso.');
    } catch (err) {
      console.error('Erro ao criar paciente:', err);
      const message = err?.erro || err?.message || 'Erro ao criar paciente';
      window.alert(message);
    }
  }
  
  return (
    <div>
      <h1>Pacientes</h1>
      <PatientForm onSubmit={handleSavePatient} />
    </div>
  );
}
