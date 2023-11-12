import { pool } from "../db.js";

export const getHabilidadesPorEmpleado = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query(
    "SELECT habilidades.* FROM habilidades JOIN empleado_habilidades ON habilidades.ID_Habilidad = empleado_habilidades.ID_Habilidad WHERE empleado_habilidades.ID_Empleado = ?",
    [id]
  );
  res.json(result);
};

export const postAsignarHabilidadAEmpleado = async (req, res) => {
  const { id_empleado, id_habilidad } = req.body;
  const [result] = await pool.query(
    "INSERT INTO empleado_habilidades (ID_Empleado, ID_Habilidad) VALUES (?, ?)",
    [id_empleado, id_habilidad]
  );
  res.json({
    id: result.insertId,
    ...req.body,
  });
};
