const mongoose = require("mongoose");

const personaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    apellido: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      trim: true,
    },
    correo: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Debe ser un correo válido"],
    },
    telefono: {
      type: String,
      match: [/^\d{10}$/, "El teléfono debe tener 10 dígitos"],
    },
    direccion: {
      type: String,
      trim: true,
      default: "No especificada",
    },
    estado: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Persona", personaSchema, "personas");
