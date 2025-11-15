const express = require("express");
const sitioRouter = express.Router();
const Sitio = require("../../models/sitio");

// GET todos los sitios
sitioRouter.get("/", async (req, res) => {
  try {
    const sitios = await Sitio.find().populate("tipoActividad");
    res.json(sitos);
  } catch (error) {
    res.status(500).send("Error al obtener sitios");
  }
});

// GET por ID
sitioRouter.get("/:id", async (req, res) => {
  try {
    const sitio = await Sitio.findById(req.params.id).populate("tipoActividad");
    if (!sitio) return res.status(404).send("Sitio no encontrado");
    res.json(sitio);
  } catch (error) {
    res.status(500).send("Error al buscar sitio");
  }
});

// POST crear sitio
sitioRouter.post("/", async (req, res) => {
  try {
    const sitio = new Sitio(req.body);
    const saved = await sitio.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT actualizar sitio
sitioRouter.put("/:id", async (req, res) => {
  try {
    const updated = await Sitio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE físico porque sitios NO tienen campo estado
sitioRouter.delete("/:id", async (req, res) => {
  try {
    await Sitio.findByIdAndDelete(req.params.id);
    res.json({ message: "Sitio eliminado correctamente" });
  } catch (error) {
    res.status(500).send("Error al eliminar sitio");
  }
});

module.exports = sitioRouter;
