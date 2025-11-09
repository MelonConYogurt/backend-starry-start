
const express = require("express");
const middleware = express.Router();
const admin = require("./firabase");

middleware.use(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("No autorizado: token no proporcionado");
    }

    const idToken = authHeader.split("Bearer ")[1];

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (!decodedToken) {
      return res.status(401).send("No autorizado: token inválido");
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error de autenticación:", error);
    res.status(401).send("Token inválido o expirado");
  }
});

module.exports = middleware;
