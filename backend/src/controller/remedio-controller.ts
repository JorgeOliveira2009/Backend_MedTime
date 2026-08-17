import { Response } from "express";
import { AuthRequest } from "../middlewares/auth-middlewares";
import * as service from "../services/remedio-services";

export const criar = async (req: AuthRequest, res: Response) => {
    try {
        const usuarioId = req.user?.id;
        if (!usuarioId) return res.status(401).json({ sucesso: false, message: "Usuário não autenticado" });

        const resultado = await service.criarRemedio(usuarioId, req.body);
        res.status(201).json({ sucesso: true, data: resultado });
    } catch (error: any) {
        res.status(500).json({ sucesso: false, message: "Erro ao criar remédio" });
    }
};

export const listar = async (req: AuthRequest, res: Response) => {
    try {
        const usuarioId = req.user?.id;
        if (!usuarioId) return res.status(401).json({ sucesso: false, message: "Usuário não autenticado" });

        const resultado = await service.listarRemedios(usuarioId);
        res.json({ sucesso: true, data: resultado });
    } catch (error: any) {
        res.status(500).json({ sucesso: false, message: "Erro ao listar remédios" });
    }
};

export const buscarPorId = async (req: AuthRequest, res: Response) => {
    try {
        const usuarioId = req.user?.id;
        if (!usuarioId) return res.status(401).json({ sucesso: false, message: "Usuário não autenticado" });

        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ sucesso: false, message: "ID inválido" });

        const resultado = await service.buscarRemedioPorId(id, usuarioId);
        res.json({ sucesso: true, data: resultado });
    } catch (error: any) {
        if (error.message === "Remédio não encontrado") return res.status(404).json({ sucesso: false, message: error.message });
        if (error.message === "Sem permissão") return res.status(403).json({ sucesso: false, message: error.message });
        res.status(500).json({ sucesso: false, message: "Erro ao buscar remédio" });
    }
};

export const atualizar = async (req: AuthRequest, res: Response) => {
    try {
        const usuarioId = req.user?.id;
        if (!usuarioId) return res.status(401).json({ sucesso: false, message: "Usuário não autenticado" });

        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ sucesso: false, message: "ID inválido" });

        const resultado = await service.atualizarRemedio(id, usuarioId, req.body);
        res.json({ sucesso: true, data: resultado });
    } catch (error: any) {
        if (error.message === "Remédio não encontrado") return res.status(404).json({ sucesso: false, message: error.message });
        if (error.message === "Sem permissão") return res.status(403).json({ sucesso: false, message: error.message });
        res.status(500).json({ sucesso: false, message: "Erro ao atualizar remédio" });
    }
};

export const deletar = async (req: AuthRequest, res: Response) => {
    try {
        const usuarioId = req.user?.id;
        if (!usuarioId) return res.status(401).json({ sucesso: false, message: "Usuário não autenticado" });

        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ sucesso: false, message: "ID inválido" });

        const resultado = await service.deletarRemedio(id, usuarioId);
        res.json({ sucesso: true, ...resultado });
    } catch (error: any) {
        if (error.message === "Remédio não encontrado") return res.status(404).json({ sucesso: false, message: error.message });
        if (error.message === "Sem permissão") return res.status(403).json({ sucesso: false, message: error.message });
        res.status(500).json({ sucesso: false, message: "Erro ao deletar remédio" });
    }
};

export const marcarTomado = async (req: AuthRequest, res: Response) => {
    try {
        const usuarioId = req.user?.id;
        if (!usuarioId) return res.status(401).json({ sucesso: false, message: "Usuário não autenticado" });

        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ sucesso: false, message: "ID inválido" });

        const resultado = await service.marcarTomado(id, usuarioId);
        res.json({ sucesso: true, data: resultado });
    } catch (error: any) {
        if (error.message === "Remédio não encontrado") return res.status(404).json({ sucesso: false, message: error.message });
        if (error.message === "Sem permissão") return res.status(403).json({ sucesso: false, message: error.message });
        res.status(500).json({ sucesso: false, message: "Erro ao marcar remédio" });
    }
};