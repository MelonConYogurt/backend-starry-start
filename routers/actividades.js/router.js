const express = require("express");
const tipoRouter = express.Router();
const TipoActividad = require("../../models/actividades");

// GET todos
tipoRouter.get("/", async (req, res) => {
  try {
    const tipos = await TipoActividad.find();
    res.json(tipos);
  } catch (error) {
    res.status(500).send("Error al obtener tipos de actividad");
  }
});

// GET por ID
tipoRouter.get("/:id", async (req, res) => {
  try {
    const tipo = await TipoActividad.findById(req.params.id);
    if (!tipo) return res.status(404).send("Tipo de actividad no encontrado");
    res.json(tipo);
  } catch (error) {
    res.status(500).send("Error al buscar tipo de actividad");
  }
});

// POST crear
tipoRouter.post("/", async (req, res) => {
  try {
    const tipo = new TipoActividad(req.body);
    const saved = await tipo.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT actualizar
tipoRouter.put("/:id", async (req, res) => {
  try {
    const updated = await TipoActividad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE lógico (estado = false)
tipoRouter.delete("/:id", async (req, res) => {
  try {
    const tipo = await TipoActividad.findByIdAndUpdate(
      req.params.id,
      { estado: false },
      { new: true }
    );
    res.json(tipo);
  } catch (error) {
    res.status(400).send("Error al eliminar tipo de actividad");
  }
});

// PATCH activar (estado = true)
tipoRouter.patch("/:id/activate", async (req, res) => {
  try {
    const tipo = await TipoActividad.findByIdAndUpdate(
      req.params.id,
      { estado: true },
      { new: true }
    );
    res.json(tipo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = tipoRouter;
