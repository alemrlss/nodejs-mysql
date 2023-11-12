import { pool } from "../db.js";

export const getAsignaciones = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM asignaciones");
  res.json(result);
};

export const getAsignacion = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query(
    "SELECT * FROM asignaciones WHERE ID_Asignacion = ?",
    [id]
  );

  if (result.length === 0) {
    return res.status(404).json({ message: "Asignacion no encontrada" });
  }

  res.json(result);
};

export const postAsignaciones = async (req, res) => {
  const { empleado_id, proyecto_id, fecha_asignacion } = req.body;
  const [result] = await pool.query(
    "INSERT INTO asignaciones (empleado_id, proyecto_id, fecha_asignacion) VALUES (?, ?, ?)",
    [empleado_id, proyecto_id, fecha_asignacion]
  );

  res.json({
    id: result.insertId,
    ...req.body,
  });
};

export const updateAsignaciones = async (req, res) => {
  const { id } = req.params;
  const { empleado_id, proyecto_id, fecha_asignacion } = req.body;
  const [result] = await pool.query(
    "UPDATE asignaciones SET empleado_id = IFNULL(? ,empleado_id), proyecto_id = IFNULL(?, proyecto_id) WHERE ID_Asignacion = ?",
    [empleado_id, proyecto_id, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Asignacion no encontrada" });
  }

  res.json({ message: "Asignacion actualizada" });
};

export const deleteAsignaciones = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query(
    "DELETE FROM asignaciones WHERE ID_Asignacion = ?",
    [id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Asignacion no encontrada" });
  }

  res.json({ message: "Asignacion eliminada" });
};
