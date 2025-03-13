import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects, deleteProject } from "../../../../../api";

// Import des composants du template
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDInput from "components/MDInput"; // Importez MDInput pour le champ de recherche

// Spinner component
import Spinner from "examples/Spinner";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]); // Projets filtrés
  const [searchQuery, setSearchQuery] = useState(""); // État pour la recherche
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    document.title = "Liste des Projets";
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let res = await getProjects();
        if (role === "user") {
          res = res.filter((project) =>
            project.members.some((member) => member._id === localStorage.getItem("userId"))
          );
        }
        // Trier les projets par échéance la plus proche
        const sortedProjects = res.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        setProjects(sortedProjects || []);
        setFilteredProjects(sortedProjects || []); // Initialiser les projets filtrés
      } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
      } finally {
        setLoading(false);
      }
    };

    const checkAdmin = () => {
      const role = localStorage.getItem("role");
      setIsAdmin(role === "admin");
    };
    checkAdmin();
    fetchProjects();
  }, [role]);

  // Filtrer les projets en fonction de la recherche
  useEffect(() => {
    const filtered = projects.filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchQuery, projects]);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce projet ?")) {
      try {
        await deleteProject(id);
        setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
      } catch (error) {
        alert("Erreur lors de la suppression du projet");
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-project/${id}`);
  };

  const handleViewTasks = (id) => {
    navigate(`/projects/${id}`);
  };

  // Configuration des colonnes du tableau
  const columns = [
    { Header: "Nom du projet", accessor: "name", align: "left" },
    { Header: "Échéance", accessor: "deadline", align: "center" },
    { Header: "Actions", accessor: "actions", align: "center" },
  ];

  // Formatage des données pour le tableau
  const rows = filteredProjects.map((project) => ({
    name: <MDTypography variant="caption">{project.name}</MDTypography>,
    deadline: (
      <MDTypography variant="caption">
        {new Date(project.deadline).toLocaleDateString()}
      </MDTypography>
    ),
    actions: (
      <MDBox display="flex" justifyContent="center" gap={1}>
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="info"
          fontWeight="medium"
          onClick={() => handleViewTasks(project._id)}
        >
          Voir les tâches
        </MDTypography>
        {isAdmin && (
          <>
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="warning"
              fontWeight="medium"
              onClick={() => handleUpdate(project._id)}
            >
              Mettre à jour
            </MDTypography>
            <MDTypography
              component="a"
              href="#"
              variant="caption"
              color="error"
              fontWeight="medium"
              onClick={() => handleDelete(project._id)}
            >
              Supprimer
            </MDTypography>
          </>
        )}
      </MDBox>
    ),
  }));

  return (
    <MDBox pt={3}>
      {loading ? ( // Afficher le spinner si les données sont en cours de chargement
        <Spinner />
      ) : (
        <>
          {/* Champ de recherche */}
          <MDBox mb={3}>
            <MDInput
              fullWidth
              placeholder="Rechercher un projet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </MDBox>

          {/* Tableau des projets */}
          <DataTable
            table={{ columns, rows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
        </>
      )}
    </MDBox>
  );
}

export default ProjectList;
