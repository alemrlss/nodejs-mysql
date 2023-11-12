import { Router } from "express";
import {
  deleteHabilidades,
  getHabilidad,
  getHabilidades,
  postHabilidades,
  updateHabilidad,
} from "../controllers/habilidades.controller.js";

const router = Router();

router.get("/habilidades", getHabilidades);
router.get("/habilidades/:id", getHabilidad);
router.post("/habilidades", postHabilidades);
router.patch("/habilidades/:id", updateHabilidad);
router.delete("/habilidades/:id", deleteHabilidades);

export default router;
