// src/schemas/remedio.schema.ts
import { z } from "zod";

export const criarRemedioSchema = z.object({
    nome: z.string()
        .min(2, "Nome deve ter pelo menos 2 caracteres")
        .max(100, "Nome muito longo"),
    horario: z.string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Horário inválido — use o formato HH:MM"),
    observacoes: z.string()
        .max(500, "Observações muito longas")
        .optional(),
});

export const atualizarRemedioSchema = z.object({
    nome: z.string()
        .min(2, "Nome deve ter pelo menos 2 caracteres")
        .max(100, "Nome muito longo")
        .optional(),
    horario: z.string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Horário inválido — use o formato HH:MM")
        .optional(),
    observacoes: z.string()
        .max(500, "Observações muito longas")
        .optional(),
}).refine(data => data.nome || data.horario || data.observacoes, {
    message: "Pelo menos um campo deve ser fornecido",
});