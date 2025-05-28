const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Book = require("./models/Book");

mongoose
  .connect(
    "mongodb+srv://emmaf:26p34FA2@projet-6.njviy3m.mongodb.net/?retryWrites=true&w=majority&appName=Projet-6",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

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

app.post("../frontend/public/data/data.json", (req, res, next) => {
  delete req.body._id;
  const book = new Book({
    ...req.body,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Livre enregistré" }))
    .catch(error > res.status(400).json({ error: error }));
});

/*
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
*/

module.exports = app;
