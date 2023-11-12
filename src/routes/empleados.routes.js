import { Router } from "express";
import {
  getEmpleados,
  getEmpleado,
  postEmpleados,
  updateEmpleados,
  deleteEmpleados,
} from "../controllers/empleados.controller.js";

const router = Router();

router.get("/empleados", getEmpleados);
router.get("/empleados/:id", getEmpleado);
router.post("/empleados", postEmpleados);
router.patch("/empleados/:id", updateEmpleados);
router.delete("/empleados/:id", deleteEmpleados);

export default router;
