[Accéder à l'application](https://promanage-j4w4.vercel.app/) 
# Gestion de Projet - MERN Full Stack App  

## Description  
Cet outil web permet la gestion de projets et de tâches pour les équipes de travail. Il offre aux administrateurs la possibilité de créer des projets, d’assigner des tâches aux membres de l’équipe et de suivre l’avancement du travail en temps réel.  

## Fonctionnalités  

### 1. Authentification et Autorisation  
- Inscription et connexion des utilisateurs avec email et mot de passe  
- Gestion des rôles :  
  - **Admin** : création et gestion de projets, attribution des tâches  
  - **Utilisateur** : consultation et mise à jour des tâches assignées  

### 2. Gestion des Projets (Admin)  
- Création de projets avec nom, description et échéances  
- Attribution de membres à un projet  
- Tableau de bord affichant l'état du projet et les tâches associées  

### 3. Gestion des Tâches  
- Création et modification des tâches  
- Assignation des tâches aux membres d’équipe  
- Mise à jour du statut des tâches : **En attente, En cours, Terminée**  

### 4. Suivi des Tâches et Échéances  
- Barre de progression pour visualiser l’avancement  
- Liste des tâches avec détails (nom, date limite, assigné, statut)  
- Notifications pour les tâches en retard ou prioritaires  

## Technologies Utilisées  

### Frontend  
- **React.js** : framework pour une interface utilisateur dynamique  
- **Material-UI** : bibliothèque de composants UI modernes  
- **React Router** : gestion de la navigation  

### Backend  
- **Node.js + Express** : serveur API RESTful  
- **JWT (JSON Web Tokens)** : authentification sécurisée  

### Base de Données  
- **MongoDB Atlas** : stockage des utilisateurs, projets et tâches  
- **Mongoose** : ORM pour la gestion des données  

### Hébergement  
- **Frontend** : Vercel  
- **Backend** : Vercel  
- **Base de données** : MongoDB Atlas  
