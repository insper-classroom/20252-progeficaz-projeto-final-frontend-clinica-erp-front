// src/pages/Doctors/DoctorForm.jsx
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";


export default function DoctorForm({ initial = {}, onSubmit, onCancelEdit }) {
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      nome: initial?.nome || "",
      cpf: initial?.cpf || "",
      crm: initial?.crm || "",
      especialidade: initial?.especialidade || "",
    },
  });

  // quando `initial` mudar (ex.: entra/ sai modo edição), atualiza/reset do form
  useEffect(() => {
    reset({
      nome: initial?.nome || "",
      cpf: initial?.cpf || "",
      crm: initial?.crm || "",
      especialidade: initial?.especialidade || "",
    });
  }, [initial, reset]);

  function submit(data) {
    onSubmit && onSubmit(data);
    // se estamos no modo edição, não reset automático — o pai decide.
    // se for criação (initial sem _id) podemos resetar:
    if (!initial?._id) reset();
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="form-grid">
        <label>
          Nome
          <input {...register("nome", { required: true })} type="text" placeholder="Nome completo" aria-label="nome" />
        </label>

        <label>
          CPF
          <input {...register("cpf")} type="text" placeholder="123.456.789-00" aria-label="cpf" />
        </label>

        <label>
          CRM
          <input {...register("crm")} type="text" placeholder="CRM12345" aria-label="crm" />
        </label>

        <label>
          Especialidade
          <input {...register("especialidade")} type="text" placeholder="Cardiologia" aria-label="especialidade" />
        </label>
      </div>

      <div className="actions" style={{ marginTop: 8, gap: 12 }}>
        <button type="submit" className="btn">
          {initial?._id ? "Atualizar médico" : "Salvar médico"}
        </button>

        {initial?._id && (
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              // limpa campos do form
              reset({
                nome: "",
                cpf: "",
                crm: "",
                especialidade: "",
              });
              // rola para o topo (opcional)
              window.scrollTo({ top: 0, behavior: "smooth" });
              // avisa o pai para sair do modo edição
              onCancelEdit && onCancelEdit();
            }}
          >
            Cancelar edição
          </button>
        )}
      </div>
    </form>
  );
}