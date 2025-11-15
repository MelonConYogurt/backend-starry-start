const express = require("express");
const rutaRouter = express.Router();
const Ruta = require("../../models/ruta");

// GET todas las rutas
rutaRouter.get("/", async (req, res) => {
  try {
    const rutas = await Ruta.find();
    res.json(rutas);
  } catch (error) {
    res.status(500).send("Error al obtener rutas");
  }
});

// GET por ID
rutaRouter.get("/:id", async (req, res) => {
  try {
    const ruta = await Ruta.findById(req.params.id);
    if (!ruta) return res.status(404).send("Ruta no encontrada");
    res.json(ruta);
  } catch (error) {
    res.status(500).send("Error al buscar ruta");
  }
});

// POST crear ruta
rutaRouter.post("/", async (req, res) => {
  try {
    const ruta = new Ruta(req.body);
    const saved = await ruta.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT actualizar ruta
rutaRouter.put("/:id", async (req, res) => {
  try {
    const updated = await Ruta.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE lógico (estado = false)
rutaRouter.delete("/:id", async (req, res) => {
  try {
    const ruta = await Ruta.findByIdAndUpdate(
      req.params.id,
      { estado: false },
      { new: true }
    );
    res.json(ruta);
  } catch (error) {
    res.status(400).send("Error al eliminar ruta");
  }
});

// PATCH activar ruta
rutaRouter.patch("/:id/activate", async (req, res) => {
  try {
    const ruta = await Ruta.findByIdAndUpdate(
      req.params.id,
      { estado: true },
      { new: true }
    );
    res.json(ruta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = rutaRouter;
