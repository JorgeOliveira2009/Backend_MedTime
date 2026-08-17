// src/routes/remedio-routes.ts
import { Router } from "express";
import * as controller from "../controller/remedio-controller";
import { authMiddleware } from "../middlewares/auth-middlewares";
import { validate } from "../middlewares/validate-middleware";
import { criarRemedioSchema, atualizarRemedioSchema } from "../schemas/remedio.schema";

const router = Router();

// todas as rotas de remédio são protegidas
router.post("/",          authMiddleware, validate(criarRemedioSchema),      controller.criar);
router.get("/",           authMiddleware,                                     controller.listar);
router.get("/:id",        authMiddleware,                                     controller.buscarPorId);
router.put("/:id",        authMiddleware, validate(atualizarRemedioSchema),  controller.atualizar);
router.delete("/:id",     authMiddleware,                                     controller.deletar);
router.patch("/:id/tomado", authMiddleware,                                   controller.marcarTomado);

export default router;