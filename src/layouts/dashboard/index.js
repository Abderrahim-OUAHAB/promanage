import React, { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";

// API
import { getProjects, getTasks, getUsers } from "api";

// Navigation
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // États pour gérer les projets, les tâches et les utilisateurs
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [projectTasks, setProjectTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les projets et sélectionner un projet aléatoire au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);

        // Sélectionner un projet aléatoire
        if (projectsData.length > 0) {
          const randomProject = projectsData[Math.floor(Math.random() * projectsData.length)];
          setSelectedProject(randomProject._id);
        }

        const usersData = await getUsers();
        setUsers(usersData);
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Charger les tâches du projet sélectionné
  useEffect(() => {
    const fetchTasks = async () => {
      if (selectedProject) {
        try {
          const tasksData = await getTasks(selectedProject);
          setProjectTasks(tasksData);
        } catch (err) {
          console.error("Erreur lors de la récupération des tâches :", err);
        }
      }
    };

    fetchTasks();
  }, [selectedProject]);

  // Calculer les statistiques des tâches
  const totalTasks = projectTasks.length;
  const completedTasks = projectTasks.filter((task) => task.status === "Terminée").length;
  const inProgressTasks = projectTasks.filter((task) => task.status === "En cours").length;

  // Données pour la répartition des tâches par priorité
  const taskPriorityData = {
    labels: ["Basse", "Moyenne", "Haute"],
    datasets: {
      label: "Tâches par priorité",
      data: [
        projectTasks.filter((task) => task.priority === "Basse").length,
        projectTasks.filter((task) => task.priority === "Moyenne").length,
        projectTasks.filter((task) => task.priority === "Haute").length,
      ],
    },
  };

  // Données pour la répartition des tâches par utilisateur
  const taskAssignmentData = {
    labels: users.map((user) => user.name),
    datasets: {
      label: "Tâches assignées",
      data: users.map((user) => projectTasks.filter((task) => task.assignedTo === user._id).length),
    },
  };

  // Filtrer les projets récents (3 derniers)
  const recentProjects = projects.slice(-3);

  // Filtrer les tâches en retard
  const overdueTasks = projectTasks.filter(
    (task) => new Date(task.deadline) < new Date() && task.status !== "Terminé"
  );

  // Filtrer les tâches à haute priorité
  const highPriorityTasks = projectTasks.filter((task) => task.priority === "Haute");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Carte pour créer un projet */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="add_task"
                title="Créer un Projet"
                count="Nouveau"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Cliquez pour commencer",
                }}
                onClick={() => navigate("/create-project")}
              />
            </MDBox>
          </Grid>

          {/* Carte pour créer une tâche */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="task"
                title="Créer une Tâche"
                count="Nouvelle"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Cliquez pour commencer",
                }}
                onClick={() => navigate("/create-task")}
              />
            </MDBox>
          </Grid>

          {/* Sélection du projet */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <MDTypography variant="h6" gutterBottom>
                Choisir un projet
              </MDTypography>
              <Select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                fullWidth
              >
                {projects.map((project) => (
                  <MenuItem key={project._id} value={project._id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </MDBox>
          </Grid>
        </Grid>

        {/* Statistiques clés */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <ComplexStatisticsCard
                color="success"
                icon="task"
                title="Tâches totales"
                count={totalTasks.toString()}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Tâches dans ce projet",
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ComplexStatisticsCard
                color="info"
                icon="check_circle"
                title="Tâches terminées"
                count={completedTasks.toString()}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Tâches terminées",
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ComplexStatisticsCard
                color="warning"
                icon="pending_actions"
                title="Tâches en cours"
                count={inProgressTasks.toString()}
                percentage={{
                  color: "warning",
                  amount: "",
                  label: "Tâches en cours",
                }}
              />
            </Grid>
          </Grid>
        </MDBox>

        {/* Graphiques */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Tâches par priorité"
                  description="Répartition des tâches par niveau de priorité"
                  date="Mis à jour à l'instant"
                  chart={taskPriorityData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="success"
                  title="Tâches par utilisateur"
                  description="Répartition des tâches assignées par utilisateur"
                  date="Mis à jour à l'instant"
                  chart={taskAssignmentData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        {/* Projets et aperçu des tâches */}
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <CardHeader
                  title={
                    <MDTypography variant="h6" fontWeight="medium">
                      Aperçu des projets et tâches
                    </MDTypography>
                  }
                />
                <CardContent>
                  {/* Projets récents */}
                  <MDBox mb={3}>
                    <MDTypography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Projets récents
                    </MDTypography>
                    <List>
                      {recentProjects.length > 0 ? (
                        recentProjects.map((project) => (
                          <ListItem key={project._id}>
                            <ListItemText
                              primary={project.name}
                              secondary={project.description || "Aucune description"}
                            />
                          </ListItem>
                        ))
                      ) : (
                        <MDTypography variant="body2">Aucun projet récent.</MDTypography>
                      )}
                    </List>
                  </MDBox>

                  <Divider />

                  {/* Tâches en retard */}
                  <MDBox mb={3}>
                    <MDTypography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Tâches en retard
                    </MDTypography>
                    <List>
                      {overdueTasks.length > 0 ? (
                        overdueTasks.map((task) => (
                          <ListItem key={task._id}>
                            <ListItemText
                              primary={task.name}
                              secondary={`Date limite: ${new Date(
                                task.deadline
                              ).toLocaleDateString()}`}
                            />
                          </ListItem>
                        ))
                      ) : (
                        <MDTypography variant="body2">Aucune tâche en retard.</MDTypography>
                      )}
                    </List>
                  </MDBox>

                  <Divider />

                  {/* Tâches à haute priorité */}
                  <MDBox mb={3}>
                    <MDTypography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Tâches à haute priorité
                    </MDTypography>
                    <List>
                      {highPriorityTasks.length > 0 ? (
                        highPriorityTasks.map((task) => (
                          <ListItem key={task._id}>
                            <ListItemText
                              primary={task.name}
                              secondary={`Statut: ${task.status}`}
                            />
                          </ListItem>
                        ))
                      ) : (
                        <MDTypography variant="body2">Aucune tâche à haute priorité.</MDTypography>
                      )}
                    </List>
                  </MDBox>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
