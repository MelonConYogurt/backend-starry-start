const express = require("express");
const middleware = express.Router();
const admin = require("./firabase");

middleware.use((req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const idToken = authHeader.split("Bearer ")[1];
      const decodedToken = admin.auth().verifyIdToken(idToken);
      if (decodedToken) {
        next();
      } else {
        res.status(401).send("Unauthorized");
        console.log(error);
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    res.status(500).send("Error in the server");
  }
});

module.exports = middleware;
