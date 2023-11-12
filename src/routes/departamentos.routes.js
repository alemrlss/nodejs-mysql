import { Router } from "express";
import {
  getDepartamentos,
  getDepartamento,
  postDepartamentos,
  updateDepartamento,
  deleteDepartamento,
} from "../controllers/departamentos.controller.js";

const router = Router();

router.get("/departamentos", getDepartamentos);
router.get("/departamentos/:id", getDepartamento);
router.post("/departamentos", postDepartamentos);
router.patch("/departamentos/:id", updateDepartamento);
router.delete("/departamentos/:id", deleteDepartamento);

export default router;
