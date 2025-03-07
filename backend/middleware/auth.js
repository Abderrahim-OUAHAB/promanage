const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Vérifier si le token est valide
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Accès interdit, token manquant' });
  }
  try {
    const decoded = jwt.verify(token, 'secretkey'); // Utiliser la même clé secrète que lors de la création du token
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

// Vérifier si l'utilisateur est un administrateur
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Accès interdit, utilisateur non administrateur' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Erreur lors de la vérification de l\'utilisateur' });
  }
};

module.exports = { verifyToken, isAdmin };
