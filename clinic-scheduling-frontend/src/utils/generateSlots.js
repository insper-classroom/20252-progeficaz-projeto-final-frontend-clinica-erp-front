// src/utils/generateSlots.js
import { format, addMinutes, parseISO, eachDayOfInterval } from "date-fns";

/**
 * Gera o objeto "horarios" no formato:
 * {
 *   "2025-10-25": {
 *     "08:00": { status: "disponível", paciente: "ne" },
 *     "08:30": { ... }
 *   },
 *   ...
 * }
 *
 * options:
 *  - startDate (YYYY-MM-DD)
 *  - endDate (YYYY-MM-DD)
 *  - startTime (HH:mm)
 *  - endTime (HH:mm)
 *  - intervalMinutes (number)
 *  - includeSaturday (bool)
 *  - includeSunday (bool)
 */
export function generateSlots({
  startDate,
  endDate,
  startTime,
  endTime,
  intervalMinutes = 30,
  includeSaturday = false,
  includeSunday = false,
}) {
  if (!startDate || !endDate || !startTime || !endTime) return {};

  // cria lista de datas inclusiva
  const days = eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  });

  const horarios = {};

  days.forEach((d) => {
    const weekday = d.getDay(); // 0 = domingo, 6 = sabado
    if (weekday === 6 && !includeSaturday) return;
    if (weekday === 0 && !includeSunday) return;

    // para cada dia, constrói horários
    // base ISO date: yyyy-mm-dd
    const dateKey = format(d, "yyyy-MM-dd");

    // parse times to full Date objects on that day
    const [hStart, mStart] = startTime.split(":").map(Number);
    const [hEnd, mEnd] = endTime.split(":").map(Number);

    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hStart, mStart);
    const dayEnd = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hEnd, mEnd);

    let cursor = dayStart;
    const slots = {};

    while (cursor <= dayEnd) {
      const timeKey = format(cursor, "HH:mm");
      slots[timeKey] = { status: "disponível", paciente: "ne" };
      cursor = addMinutes(cursor, intervalMinutes);
      // safety: avoid infinite loop
      if (intervalMinutes <= 0) break;
    }

    horarios[dateKey] = slots;
  });

  return horarios;
}
