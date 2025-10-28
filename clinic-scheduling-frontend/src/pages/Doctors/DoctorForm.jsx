// src/pages/Doctors/DoctorForm.jsx
import React from "react";
import { useForm } from "react-hook-form";

/**
 * Props:
 *  - initial: objeto com valores iniciais (opcional)
 *  - onSubmit: função(data) quando o form for submetido
 */
export default function DoctorForm({ initial = {}, onSubmit }) {
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      nome: initial.nome || "",
      cpf: initial.cpf || "",
      crm: initial.crm || "",
      especialidade: initial.especialidade || "",
    },
  });

  function submit(data) {
    onSubmit && onSubmit(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="form-grid">
        <label>
          Nome
          <input
            {...register("nome", { required: true })}
            type="text"
            placeholder="Nome completo"
            aria-label="nome"
          />
        </label>

        <label>
          CPF
          <input
            {...register("cpf")}
            type="text"
            placeholder="123.456.789-00"
            aria-label="cpf"
          />
        </label>

        <label>
          CRM
          <input
            {...register("crm")}
            type="text"
            placeholder="CRM12345"
            aria-label="crm"
          />
        </label>

        <label>
          Especialidade
          <input
            {...register("especialidade")}
            type="text"
            placeholder="Cardiologia"
            aria-label="especialidade"
          />
        </label>
      </div>

      <div className="actions" style={{ marginTop: 8 }}>
        <button type="submit" className="btn" aria-disabled={formState.isSubmitting}>
          Salvar médico
        </button>
      </div>
    </form>
  );
}
