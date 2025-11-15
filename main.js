const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

// Routers existentes
const profiles = require("./routers/perfil/router");
const personas = require("./routers/persona/router");
const usuarios = require("./routers/usuario/router");
const rutas = require("./routers/ruta/router");
const tiposActividad = require("./routers/actividades.js/router");
const sitios = require("./routers/sitio/router");

// Middleware de autenticación (Firebase)
const middleware = require("./middleware");

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión:", err));

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// RUTAS PÚBLICAS
app.get("/health", (req, res) => res.send("ok"));
app.use("/api/perfiles", profiles);
app.use("/api/usuarios/register", usuarios);

// Activar middleware
app.use("/", middleware);

// RUTAS PROTEGIDAS
app.use("/api/personas", personas);
app.use("/api/usuarios", usuarios);
app.use("/api/rutas", rutas);
app.use("/api/tipos-actividad", tiposActividad);
app.use("/api/sitios", sitios);

app.listen(port, () =>
  console.log(`Servidor corriendo en http://localhost:${port}`)
);
