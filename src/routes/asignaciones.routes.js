import { Router } from "express";
import {
  getAsignaciones,
  getAsignacion,
  postAsignaciones,
  updateAsignaciones,
  deleteAsignaciones,
} from "../controllers/asignaciones.controller.js";

const router = Router();

router.get("/asignaciones", getAsignaciones);
router.get("/asignaciones/:id", getAsignacion);
router.post("/asignaciones", postAsignaciones);
router.patch("/asignaciones/:id", updateAsignaciones);
router.delete("/asignaciones/:id", deleteAsignaciones);

export default router;
