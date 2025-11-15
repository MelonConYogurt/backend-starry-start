const mongoose = require("mongoose");

const rutaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
  },
  duracion: {
    type: Number,
    required: [true, "La duración es obligatoria"],
  },
  observacion: {
    type: String,
    default: "",
  },
  valor: {
    type: Number,
    default: 0,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Ruta", rutaSchema, "rutas");
