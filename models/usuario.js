const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: [true, "El UID de Firebase es obligatorio"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      match: [/\S+@\S+\.\S+/, "Debe ser un correo válido"],
    },
    passwordHash: { type: String, required: true },
    personaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Persona",
      required: true,
      unique: true,
    },
    perfilId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Perfil",
      required: true,
    },
    estado: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", usuarioSchema, "usuarios");
