const mongoose = require("mongoose");

const perfilSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre del perfil es obligatorio"],
      unique: true,
      trim: true,
    },

    estado: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Perfil", perfilSchema, "perfiles");
