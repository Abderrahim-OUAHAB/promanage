const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['En attente', 'En cours', 'Terminé'], default: 'En attente' },
  priority: { type: String, enum: ['Basse', 'Moyenne', 'Haute'], default: 'Moyenne' },
  deadline: { type: Date },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User',default: null },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
});

module.exports = mongoose.model('Task', TaskSchema);
