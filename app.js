const express = require("express");

const app = express();

const mongoose = require("mongoose");

app.use(express.json());

/*middleware headers*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// TODO: Routes post+get à ajouter partie 1 du cours => en attente de voir la gestion authentification

app.use((req, res, next) => {
  res.status(201);
  next();
});
app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue !" });
  next();
});
app.use((req, res) => {
  console.log("Réponse envoyée avec succès");
});

module.exports = app;
