// src/pages/Doctors/ScheduleGenerator.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { generateSlots } from "../../utils/generateSlots";

/**
 * Props:
 *  - onGenerate(horariosObject)
 *  - onSaveClick(horariosObject)  // opcional: função que salva no backend
 */
export default function ScheduleGenerator({ onGenerate, onSaveClick }) {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
      startTime: "08:00",
      endTime: "17:00",
      intervalMinutes: 30,
      includeSaturday: false,
      includeSunday: false,
    },
  });

  const [previewCount, setPreviewCount] = useState(0);
  const watched = watch();

  function onSubmit(values) {
    values.intervalMinutes = parseInt(values.intervalMinutes, 10) || 30;
    const horarios = generateSlots(values);
    const total = Object.values(horarios).reduce((acc, day) => acc + Object.keys(day).length, 0);
    setPreviewCount(total);
    onGenerate && onGenerate(horarios);
  }

  function handleClear() {
    reset();
    setPreviewCount(0);
    onGenerate && onGenerate({});
  }

  function handleSaveClickInternal() {
    // dispara a callback de salvar (o wrapper deve passá-la para realmente persistir)
    if (!onSaveClick) {
      window.alert(previewCount > 0 ? "Nenhum handler de salvar fornecido." : "Gere horários primeiro.");
      return;
    }
    // obtém os horários mais recentes: idealmente onGenerate já atualizou o estado no wrapper
    // aqui apenas chamamos a função passada (o wrapper conhece o preview atual)
    onSaveClick();
  }

  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: 8 }}>Gerar horários por expediente</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="generator-form">
        <div className="generator-grid">
          <label>
            Data início
            <input {...register("startDate")} type="date" />
          </label>

          <label>
            Data fim
            <input {...register("endDate")} type="date" />
          </label>

          <label>
            Início expediente
            <input {...register("startTime")} type="time" />
          </label>

          <label>
            Fim expediente
            <input {...register("endTime")} type="time" />
          </label>
        </div>

        <div className="interval-row">
          <label>
            Intervalo (min)
            <select {...register("intervalMinutes")} className="interval-select">
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
            </select>
          </label>

          <div className="days-checkboxes">
            <label style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <input {...register("includeSaturday")} type="checkbox" /> Incluir sábado
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <input {...register("includeSunday")} type="checkbox" /> Incluir domingo
            </label>
          </div>
        </div>

        <div className="generator-summary">
          {previewCount > 0
            ? `${previewCount} horários gerados`
            : `Geração de slots entre ${watched.startTime} e ${watched.endTime}, intervalo de ${watched.intervalMinutes} min.`}
        </div>

        <div className="generator-actions">
          <button type="submit" className="btn generate">Gerar horários</button>

          <button
            type="button"
            className="btn save"
            onClick={handleSaveClickInternal}
            title="Salvar horários (usa callback onSaveClick do wrapper)"
          >
            Salvar horários no médico
          </button>

          <button type="button" onClick={handleClear} className="btn clear">Limpar</button>
        </div>
      </form>
    </div>
  );
}
