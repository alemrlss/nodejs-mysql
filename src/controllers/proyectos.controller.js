import { pool } from "../db.js";

export const getProyectos = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM proyectos");
  res.json(result);
};

export const getProyecto = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query(
    "SELECT * FROM proyectos WHERE ID_Proyecto = ?",
    [id]
  );

  if (result.length === 0) {
    return res.status(404).json({ message: "Proyecto no encontrado" });
  }

  res.json(result);
};

export const postProyectos = async (req, res) => {
  const { nombre, fecha_inicio, fecha_fin } = req.body;
  const [result] = await pool.query(
    "INSERT INTO proyectos (Nombre, Fecha_Inicio, Fecha_Fin) VALUES (?, ?, ?)",
    [nombre, fecha_inicio, fecha_fin]
  );

  res.json({
    id: result.insertId,
    ...req.body,
  });
};

export const updateProyectos = async (req, res) => {
  const { id } = req.params;
  const { nombre, fecha_inicio, fecha_fin } = req.body;
  const [result] = await pool.query(
    "UPDATE proyectos SET Nombre = IFNULL(? ,nombre), Fecha_Inicio = IFNULL(?, fecha_inicio), Fecha_Fin = IFNULL(?, fecha_fin) WHERE ID_Proyecto = ?",
    [nombre, fecha_inicio, fecha_fin, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Proyecto no encontrado" });
  }

  res.json({ message: "Proyecto actualizado" });
};

export const deleteProyectos = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query(
    "DELETE FROM proyectos WHERE ID_Proyecto = ?",
    [id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Proyecto no encontrado" });
  }

  res.json({ message: "Proyecto eliminado" });
};
