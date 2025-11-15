const mongoose = require("mongoose");

const actividadSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
  },
  imagen: {
    type: String,
    required: false,
  },
  observaciones: {
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

module.exports = mongoose.model("Actividad", actividadSchema, "actividades");
