import { pool } from "../db.js";

export const getDepartamentos = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM departamentos");
  res.json(result);
};

export const getDepartamento = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "SELECT Departamentos.ID_Departamento, Departamentos.Nombre AS NombreDepartamento, Empleados.ID_Empleado, Empleados.Nombre AS NombreEmpleado, Empleados.Apellido, Empleados.Fecha_Nacimiento FROM Departamentos JOIN Empleados ON Departamentos.ID_Departamento = Empleados.Departamento_ID WHERE Departamentos.ID_Departamento = ?",
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "Departamento no encontrado" });
    }

    const data = {
      ID_Departamento: result[0].ID_Departamento,
      NombreDepartamento: result[0].NombreDepartamento,
      Empleados: result.map((row) => ({
        ID_Empleado: row.ID_Empleado,
        NombreEmpleado: row.NombreEmpleado,
        Apellido: row.Apellido,
        Fecha_Nacimiento: row.Fecha_Nacimiento,
      })),
    };

    res.json(data);
  } catch (error) {
    console.error("Error al obtener empleados del departamento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const postDepartamentos = async (req, res) => {
  const { nombre, ubicacion } = req.body;
  const [result] = await pool.query(
    "INSERT INTO departamentos (Nombre, Ubicacion) VALUES (?, ?)",
    [nombre, ubicacion]
  );

  res.json({
    id: result.insertId,
    ...req.body,
  });
};

export const updateDepartamento = async (req, res) => {
  const { id } = req.params;
  const { nombre, ubicacion } = req.body;
  const [result] = await pool.query(
    "UPDATE departamentos SET Nombre = IFNULL(? ,nombre), Ubicacion = IFNULL(?, ubicacion) WHERE ID_Departamento = ?",
    [nombre, ubicacion, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Departamento no encontrado" });
  }

  res.json({ message: "Departamento actualizado" });
};

export const deleteDepartamento = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query(
    "DELETE FROM departamentos WHERE ID_Departamento = ?",
    [id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Departamento no encontrado" });
  }

  res.json({ message: "Departamento eliminado" });
};
