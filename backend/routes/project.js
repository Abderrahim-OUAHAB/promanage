const express = require("express");
const Project = require("../models/Project");
const { verifyToken, isAdmin } = require("../middleware/auth");

const router = express.Router();

// Créer un projet (Admin uniquement)
router.post("/create", verifyToken, isAdmin, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création du projet" });
  }
});

// Récupérer tous les projets
router.get("/", verifyToken, async (req, res) => {
  try {
    const projects = await Project.find().populate("members", "name email");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des projets" });
  }
});

// Mettre à jour un projet
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du projet" });
  }
});

// Supprimer un projet
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Projet supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression du projet" });
  }
});
router.get("/getById/:id", verifyToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("members", "name email");
    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }
    res.json(project); // Send the project in the response
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération du projet" });
  }
});

module.exports = router;
