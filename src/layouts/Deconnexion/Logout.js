import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Supprimer les données de session
    localStorage.removeItem("token"); // Supprime le token d'authentification
    localStorage.removeItem("userId"); // Supprime l'ID de l'utilisateur
    localStorage.removeItem("role"); // Supprime le rôle de l'utilisateur
    localStorage.removeItem("user"); // Supprime le nom de l'utilisateur (si applicable)

    // Rediriger vers la page de connexion
    navigate("/authentication/sign-in"); // Remplacez par le chemin de votre page de connexion
  }, [navigate]);

  return (
    <div>
      <p>Déconnexion en cours...</p>
    </div>
  );
}

export default Logout;
