const express = require('express');
const Task = require('../models/Task');
const { verifyToken, isAdmin } = require('../middleware/auth');
const Project = require('../models/Project');
const router = express.Router();

// Créer une tâche (Admin uniquement)
router.post('/create', verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, description, status, priority, deadline, projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({ message: 'L’ID du projet est requis pour créer une tâche' });
    }

    const task = new Task({ name, description, status, priority, deadline, projectId });

    await task.save();

    await Project.findByIdAndUpdate(projectId, { $push: { tasks: task._id } });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création de la tâche', error: err.message });
  }
});


// Récupérer les tâches d'un projet
router.get('/:projectId', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches' });
  }
});

// Mettre à jour une tâche
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche' });
  }
});

// Supprimer une tâche
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    // Find the task to be deleted
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    // Remove the task ID from the associated project's tasks array
    await Project.findByIdAndUpdate(task.projectId, {
      $pull: { tasks: task._id },
    });

    // Delete the task from the Task collection
    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: 'Tâche supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche', error: err.message });
  }
});

router.get('/getById/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la tâche' });
  }
});


// Assign a task to a user
router.post('/assign-task', verifyToken, isAdmin, async (req, res) => {
  try {
    const { taskId, userId, projectId } = req.body;
    
    if (!taskId || !userId || !projectId) {
      return res.status(400).json({ message: 'ID de la tâche, de l’utilisateur et du projet requis' });
    }

    // Update task with assigned user
    await Task.findByIdAndUpdate(taskId, { assignedTo: userId });

    // Add user to project members if not already there
    await Project.findByIdAndUpdate(projectId, { $addToSet: { members: userId } });

    res.json({ message: 'Tâche assignée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'assignation de la tâche' });
  }
});

// Update task status
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Le statut est requis' });
  }

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du statut' });
  }
});

module.exports = router;
