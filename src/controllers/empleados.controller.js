import { pool } from "../db.js";

export const getEmpleados = async (req, res) => {
  const [result] = await pool.query(
    "SELECT empleados.*, departamentos.Nombre as NombreDepartamento FROM empleados JOIN departamentos ON empleados.Departamento_ID = departamentos.ID_Departamento"
  );
  res.json(result);
};

export const getEmpleado = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query(
    "SELECT empleados.*, departamentos.Nombre as NombreDepartamento, habilidades.Nombre as NombreHabilidad FROM empleados JOIN departamentos ON empleados.Departamento_ID = departamentos.ID_Departamento LEFT JOIN empleado_habilidades ON empleados.ID_Empleado = empleado_habilidades.ID_Empleado LEFT JOIN habilidades ON empleado_habilidades.ID_Habilidad = habilidades.ID_Habilidad WHERE empleados.ID_Empleado = ?",
    [id]
  );

  if (result.length === 0) {
    return res.status(404).json({ message: "Empleado no encontrado" });
  }

  const data = {
    ID_Empleado: result[0].ID_Empleado,
    Nombre: result[0].Nombre,
    Apellido: result[0].Apellido,
    Fecha_Nacimiento: result[0].Fecha_Nacimiento,
    Departamento_ID: result[0].Departamento_ID,
    NombreDepartamento: result[0].NombreDepartamento,
    Habilidades: result.map((row) => ({
      ID_Habilidad: row.ID_Habilidad,
      NombreHabilidad: row.NombreHabilidad,
    })),
  };

  res.json(data);
};

export const postEmpleados = async (req, res) => {
  console.log(req.body);
  const { nombre, apellido, fecha_nacimiento, departamento_id } = req.body;
  const [result] = await pool.query(
    "INSERT INTO empleados (Nombre, Apellido, Fecha_Nacimiento, Departamento_ID) VALUES (?,?,?,?)",
    [nombre, apellido, fecha_nacimiento, departamento_id]
  );
  res.json({
    id: result.insertId,
    ...req.body,
  });
};

export const updateEmpleados = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, fecha_nacimiento, departamento_id } = req.body;
  const [result] = await pool.query(
    "UPDATE empleados SET Nombre = IFNULL(? ,nombre), Apellido = IFNULL(?, apellido), Fecha_Nacimiento = IFNULL(?, fecha_nacimiento), Departamento_ID = IFNULL(?, departamento_id) WHERE ID_Empleado = ?",
    [nombre, apellido, fecha_nacimiento, departamento_id, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Empleado no encontrado" });
  }

  res.json({ message: "Empleado actualizado" });
};

export const deleteEmpleados = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query(
    "DELETE FROM empleados WHERE ID_Empleado = ?",
    [id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Empleado no encontrado" });
  }

  res.json({ message: "Empleado eliminado" });
};
