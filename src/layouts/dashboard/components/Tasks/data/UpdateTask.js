import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTask, updateTask } from "../../../../../api"; // Assurez-vous que ces fonctions API existent

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

// Material Dashboard 2 React layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Spinner component
import Spinner from "examples/Spinner";

function UpdateTask() {
  const { id } = useParams(); // Récupérer l'ID de la tâche depuis l'URL
  const navigate = useNavigate();

  const [task, setTask] = useState({
    name: "",
    description: "",
    status: "En attente",
    priority: "Moyenne",
    deadline: "",
    projectId: "", // Projet associé à la tâche
  });

  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Mettre à jour la Tâche";
  }, []);

  // Récupérer les détails de la tâche lors du chargement du composant
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await getTask(id);
        setTask(taskData);
      } catch (err) {
        setError("Erreur lors de la récupération des détails de la tâche");
      } finally {
        setLoading(false); // Arrêter le chargement une fois les données récupérées
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(id, task); // Mettre à jour la tâche via l'API
      alert("Tâche mise à jour avec succès !");
      navigate(`/projects/${task.projectId}`); // Rediriger vers la page du projet associé
    } catch (err) {
      setError("Erreur lors de la mise à jour de la tâche");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3} px={3} mx="auto" maxWidth="800px">
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Mettre à jour la Tâche
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            {loading ? ( // Afficher le spinner si les données sont en cours de chargement
              <Spinner />
            ) : (
              <form onSubmit={handleSubmit}>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    name="name"
                    label="Nom de la tâche"
                    fullWidth
                    value={task.name}
                    onChange={handleChange}
                    required
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="text"
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    value={task.description}
                    onChange={handleChange}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <FormControl fullWidth>
                    <InputLabel>Priorité</InputLabel>
                    <Select name="priority" value={task.priority} onChange={handleChange}>
                      <MenuItem value="Basse">Basse</MenuItem>
                      <MenuItem value="Moyenne">Moyenne</MenuItem>
                      <MenuItem value="Haute">Haute</MenuItem>
                    </Select>
                  </FormControl>
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="date"
                    name="deadline"
                    label="Date limite"
                    fullWidth
                    value={task.deadline}
                    onChange={handleChange}
                  />
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" fullWidth type="submit">
                    Mettre à jour
                  </MDButton>
                </MDBox>
              </form>
            )}
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default UpdateTask;
