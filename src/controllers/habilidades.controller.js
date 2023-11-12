import { pool } from "../db.js";

export const getHabilidades = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM habilidades");
  res.json(result);
};

export const getHabilidad = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query(
    "SELECT * FROM habilidades WHERE ID_Habilidad = ?",
    [id]
  );
  if (result.length === 0) {
    return res.status(404).json({ message: "Habilidad no encontrada" });
  }
  res.json(result[0]);
};

export const postHabilidades = async (req, res) => {
  const { nombre } = req.body;
  const [result] = await pool.query(
    "INSERT INTO habilidades (Nombre) VALUES (?)",
    [nombre]
  );
  res.json({
    id: result.insertId,
    ...req.body,
  });
};

export const updateHabilidad = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const [result] = await pool.query(
    "UPDATE habilidades SET Nombre = IFNULL(? ,nombre) WHERE ID_Habilidad = ?",
    [nombre, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Habilidad no encontrada" });
  }

  res.json({ message: "Habilidad actualizada" });
};

export const deleteHabilidades = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query(
    "DELETE FROM habilidades WHERE ID_Habilidad = ?",
    [id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Habilidad no encontrada" });
  }

  res.json({ message: "Habilidad eliminada" });
};
