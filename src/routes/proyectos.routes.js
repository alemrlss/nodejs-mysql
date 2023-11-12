import { Router } from "express";
import {
  getProyectos,
  getProyecto,
  postProyectos,
  updateProyectos,
  deleteProyectos,
} from "../controllers/proyectos.controller.js";

const router = Router();

router.get("/proyectos", getProyectos);
router.get("/proyectos/:id", getProyecto);
router.post("/proyectos", postProyectos);
router.patch("/proyectos/:id", updateProyectos);
router.delete("/proyectos/:id", deleteProyectos);

export default router;
