const mongoose = require("mongoose");

const sitioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
  },

  tipoActividad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TipoActividad",
    required: [true, "El tipo de actividad es obligatorio"],
  },

  coordenadas: {
    lat: {
      type: Number,
      required: [true, "La latitud es obligatoria"],
    },
    lng: {
      type: Number,
      required: [true, "La longitud es obligatoria"],
    },
  },

  imagen: {
    type: String,
    required: false,
  },

  video: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Sitio", sitioSchema, "sitios");
