// src/middlewares/remedio-validate.middleware.ts
import { Request, Response, NextFunction } from "express";
import { criarRemedioSchema, atualizarRemedioSchema } from "../schemas/remedio.schema";
import { ZodError } from "zod";

export const validarCriarRemedio = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = await criarRemedioSchema.parseAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const primeiraMensagem = error.issues[0]?.message || "Dados inválidos";
            return res.status(400).json({ sucesso: false, message: primeiraMensagem });
        }
        next(error);
    }
};

export const validarAtualizarRemedio = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = await atualizarRemedioSchema.parseAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const primeiraMensagem = error.issues[0]?.message || "Dados inválidos";
            return res.status(400).json({ sucesso: false, message: primeiraMensagem });
        }
        next(error);
    }
};