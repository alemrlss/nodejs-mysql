import { Router } from "express";
import {
  getHabilidadesPorEmpleado,
  postAsignarHabilidadAEmpleado,
} from "../controllers/empleados_habilidades.controller.js";

const router = Router();

router.get("/empleado/habilidades/:id", getHabilidadesPorEmpleado);
router.post("/asignar", postAsignarHabilidadAEmpleado);

export default router;
