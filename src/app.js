import express from "express";
import empleadosRoutes from "./routes/empleados.routes.js";
import departamentoRoutes from "./routes/departamentos.routes.js";
import habilidadesRoutes from "./routes/habilidades.routes.js";
import proyectosRoutes from "./routes/proyectos.routes.js";
import asignacionesRoutes from "./routes/asignaciones.routes.js";
import empleados_habilidadesRoutes from "./routes/empleados_habilidades.routes.js";
import indexRoutes from "./routes/index.routes.js";
const app = express();

app.use(express.json());

app.use("/api", empleadosRoutes);
app.use("/api", departamentoRoutes);
app.use("/api", habilidadesRoutes);
app.use("/api", proyectosRoutes);
app.use("/api", asignacionesRoutes);
app.use("/api", empleados_habilidadesRoutes);
app.use(indexRoutes);

app.use(express.json());

export default app;
