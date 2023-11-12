-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS GestorTareasDB;

-- Seleccionar la base de datos
USE GestorTareasDB;


CREATE TABLE IF NOT EXISTS Empleados (
  ID_Empleado INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(50),
  Apellido VARCHAR(50),
  Fecha_Nacimiento DATE,
  Departamento_ID INT, 
  FOREIGN KEY (Departamento_ID) REFERENCES Departamentos(ID_Departamento)
);

CREATE TABLE IF NOT EXISTS Departamentos (
  ID_Departamento INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(50),
  Ubicacion VARCHAR(50)
);

-- Crear la tabla de Proyectos
CREATE TABLE IF NOT EXISTS Proyectos (
  ID_Proyecto INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(50),
  Fecha_Inicio DATE,
  Fecha_Fin DATE
);

-- Crear tabla de Asignaciones
CREATE TABLE IF NOT EXISTS Asignaciones (
  ID_Asignacion INT PRIMARY KEY AUTO_INCREMENT,
  Empleado_ID INT,
  Proyecto_ID INT,
  Fecha_Asignacion DATE,
  FOREIGN KEY (Empleado_ID) REFERENCES Empleados(ID_Empleado),
  FOREIGN KEY (Proyecto_ID) REFERENCES Proyectos(ID_Proyecto)
);

CREATE TABLE IF NOT EXISTS Habilidades (
  ID_Habilidad INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Empleado_Habilidades (
  ID_Empleado_Habilidad INT PRIMARY KEY AUTO_INCREMENT,
  ID_Empleado INT,
  ID_Habilidad INT,
  FOREIGN KEY (ID_Empleado) REFERENCES Empleados(ID_Empleado),
  FOREIGN KEY (ID_Habilidad) REFERENCES Habilidades(ID_Habilidad)
);


