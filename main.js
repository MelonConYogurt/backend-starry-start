
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

// Routers
const profiles = require("./routers/perfil/router");
const personas = require("./routers/persona/router");
const usuarios = require("./routers/usuario/router");

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

//  RUTAS PÚBLICAS (sin middleware)
app.get("/health", (req, res) => res.send("ok"));
app.use("/api/perfiles", profiles); // para el registro (sin token)
app.use("/api/usuarios/register", usuarios); // registro libre

//  Aplicar middleware DESPUÉS de las rutas públicas
app.use("/", middleware);

//  RUTAS PROTEGIDAS (ya necesitan token)
app.use("/api/personas", personas);
app.use("/api/usuarios", usuarios); 

app.listen(port, () =>
  console.log(`Servidor corriendo en http://localhost:${port}`)
);
