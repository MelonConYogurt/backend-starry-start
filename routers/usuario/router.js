const express = require("express");
const usuarioRouter = express.Router();
const Usuario = require("../../models/usuario");
const Persona = require("../../models/persona");
const Perfil = require("../../models/perfil");

//  GET todos los usuarios
usuarioRouter.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find()
      .populate("personaId")
      .populate("perfilId");
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

//  GET por ID
usuarioRouter.get("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).populate(
      "personaId perfilId"
    );
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar usuario" });
  }
});

//  PUT actualizar usuario
usuarioRouter.put("/:id", async (req, res) => {
  try {
    const updated = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//  DELETE lógico
usuarioRouter.delete("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { estado: false },
      { new: true }
    );
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar usuario" });
  }
});


//  REGISTRO (Firebase + Mongo)
usuarioRouter.post("/register", async (req, res) => {
  try {
    const { firebaseUid, email, passwordHash, persona, perfilId } = req.body;

    // Validar que la persona no tenga usuario asociado
    const personaExistente = await Persona.findOne({ correo: persona.correo });
    if (personaExistente) {
      const usuarioExistente = await Usuario.findOne({
        personaId: personaExistente._id,
      });
      if (usuarioExistente) {
        return res
          .status(400)
          .json({ error: "Esta persona ya tiene un usuario registrado" });
      }
    }

    // Crear persona si no existe
    const personaGuardada =
      personaExistente || (await new Persona(persona).save());

    // Validar perfil
    const perfil = await Perfil.findById(perfilId);
    if (!perfil) return res.status(400).json({ error: "Perfil no válido" });

    // Crear usuario vinculado con Firebase UID
    const nuevoUsuario = new Usuario({
      firebaseUid,
      email,
      passwordHash,
      personaId: personaGuardada._id,
      perfilId,
      estado: true,
    });

    const usuarioGuardado = await nuevoUsuario.save();

    res.status(201).json({
      message: "Usuario registrado correctamente",
      usuario: usuarioGuardado,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener usuario por Firebase UID
usuarioRouter.get("/byFirebaseUid/:uid", async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ firebaseUid: req.params.uid })
      .populate("personaId")
      .populate("perfilId");

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = usuarioRouter;
