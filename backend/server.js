const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/project");
const app = express();
const PORT = 5000;
const User = require("./models/User");
const taskRoutes = require("./routes/task");
require("dotenv").config();
const MONGODB_URL = process.env.MONGODB_URL;
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    // Vérifier si un utilisateur admin existe déjà
    const existingAdmin = await User.findOne({ email: "admin@promanage.com" });
    if (existingAdmin) {
      console.log("Admin déjà existant");
      return;
    }

    // Création de l'utilisateur admin
    const adminUser = new User({
      name: "promanage",
      email: "promanage@gmail.com",
      password: "wahhab",
      isAdmin: true,
    });

    // Sauvegarder l'utilisateur dans la base de données
    await adminUser.save();
    console.log("Admin créé avec succès");
    console.log("Utilisateur admin :", adminUser);
  })
  .catch((err) => console.error("Erreur de connexion MongoDB :", err));

// Routes d'authentification
app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur le port ${PORT}`);
});
