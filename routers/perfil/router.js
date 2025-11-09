const express = require("express");
const profileRouter = express.Router();
const Perfil = require("../../models/perfil");

//  GET todos los perfiles
profileRouter.get("/", async (req, res) => {
  try {
    const perfiles = await Perfil.find();
    res.json(perfiles);
  } catch (error) {
    res.status(500).send("Error al obtener perfiles");
  }
});

//  GET por ID
profileRouter.get("/:id", async (req, res) => {
  try {
    const perfil = await Perfil.findById(req.params.id);
    if (!perfil) return res.status(404).send("Perfil no encontrado");
    res.json(perfil);
  } catch (error) {
    res.status(500).send("Error al buscar perfil");
  }
});

//  POST crear perfil
profileRouter.post("/", async (req, res) => {
  try {
    const { nombre } = req.body;
    const perfil = new Perfil({ nombre });
    const saved = await perfil.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//  PUT actualizar perfil
profileRouter.put("/:id", async (req, res) => {
  try {
    const updated = await Perfil.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//  DELETE lógico (cambia estado)
profileRouter.delete("/:id", async (req, res) => {
  try {
    const perfil = await Perfil.findByIdAndUpdate(
      req.params.id,
      { estado: false },
      { new: true }
    );
    res.json(perfil);
  } catch (error) {
    res.status(400).send("Error al eliminar perfil");
  }
});

//  PATCH activar perfil (estado = true)
profileRouter.patch("/:id/activate", async (req, res) => {
  try {
    const perfil = await Perfil.findByIdAndUpdate(
      req.params.id,
      { estado: true },
      { new: true }
    );
    if (!perfil) return res.status(404).send("Perfil no encontrado");
    res.json({ message: "Perfil activado correctamente", perfil });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = profileRouter;
