const express = require("express");
const personaRouter = express.Router();
const Persona = require("../../models/persona");

//  GET todas las personas
personaRouter.get("/", async (req, res) => {
  try {
    const personas = await Persona.find();
    res.json(personas);
  } catch (error) {
    res.status(500).send("Error al obtener personas");
  }
});

//  GET por ID
personaRouter.get("/:id", async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id);
    if (!persona) return res.status(404).send("Persona no encontrada");
    res.json(persona);
  } catch (error) {
    res.status(500).send("Error al buscar persona");
  }
});

//  POST crear persona
personaRouter.post("/", async (req, res) => {
  try {
    // Si no viene dirección, asignamos un valor por defecto
    const data = { ...req.body };
    if (!data.direccion || data.direccion.trim() === "") {
      data.direccion = "No especificada";
    }

    const persona = new Persona(data);
    const saved = await persona.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//  PUT actualizar persona
personaRouter.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (!updateData.direccion || updateData.direccion.trim() === "") {
      updateData.direccion = "No especificada";
    }

    const updated = await Persona.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).send("Persona no encontrada");
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//  DELETE lógico (cambia estado a false)
personaRouter.delete("/:id", async (req, res) => {
  try {
    const persona = await Persona.findByIdAndUpdate(
      req.params.id,
      { estado: false },
      { new: true }
    );
    if (!persona) return res.status(404).send("Persona no encontrada");
    res.json(persona);
  } catch (error) {
    res.status(400).send("Error al eliminar persona");
  }
});

module.exports = personaRouter;
