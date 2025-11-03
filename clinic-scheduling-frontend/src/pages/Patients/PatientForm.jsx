// src/pages/Patients/PatientForm.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function PatientForm({ initial = {}, onSubmit, onCancelEdit }) {
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      nome: initial?.nome || "",
      cpf: initial?.cpf || "",
      celular: initial?.celular || "",
      idade: initial?.idade || "",
    },
  });

  useEffect(() => {
    reset({
      nome: initial?.nome || "",
      cpf: initial?.cpf || "",
      celular: initial?.celular || "",
      idade: initial?.idade || "",
    });
  }, [initial, reset]);

  async function submit(data) {
    // se parent retornar promise, aguardamos
    if (onSubmit) {
      await onSubmit(data);
    }
    // se for criação (initial sem _id) resetamos o form
    if (!initial?._id) reset();
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
            placeholder="12345678900"
            aria-label="cpf"
          />
        </label>

        <label>
          Celular
          <input
            {...register("celular")}
            type="text"
            placeholder="(11) 9xxxx-xxxx"
            aria-label="celular"
          />
        </label>

        <label>
          Idade
          <input
            {...register("idade")}
            type="text"
            placeholder="Idade"
            aria-label="idade"
          />
        </label>
      </div>

      <div className="actions" style={{ marginTop: 8, gap: 12 }}>
        <button type="submit" className="btn">
          {initial?._id ? "Atualizar paciente" : "Salvar paciente"}
        </button>

        {initial?._id && (
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              reset({
                nome: "",
                cpf: "",
                celular: "",
                idade: "",
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
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
