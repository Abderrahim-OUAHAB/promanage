const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");
const User = require("./models/User");
const MONGODB_URL = require("./env").MONGODB_URL;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connecté à MongoDB");

    // Vérifier si un utilisateur admin existe déjà
    const existingAdmin = await User.findOne({ email: "admin@promanage.com" });
    if (!existingAdmin) {
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
    } else {
      console.log("Admin déjà existant");
    }
  })
  .catch((err) => console.error("Erreur de connexion MongoDB :", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error("Erreur globale :", err);
  res.status(500).json({ message: "Erreur interne du serveur" });
});

// Export pour Vercel
module.exports = app;

// Lancement du serveur (uniquement en local)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Serveur backend lancé sur le port ${PORT}`);
  });
}
