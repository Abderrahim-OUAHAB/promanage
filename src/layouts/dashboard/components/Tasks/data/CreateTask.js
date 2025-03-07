import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask, getProjects } from "../../../../../api";

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

function CreateTask() {
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    status: "En attente",
    priority: "Moyenne",
    deadline: "",
    projectId: "",
  });

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Créer une Tâche";
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getProjects();
        setProjects(res || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTask(taskData);
      if (response.error) {
        alert("Erreur lors de la création de la tâche : " + response.error);
        return;
      }
      alert("Tâche créée avec succès !");
      navigate("/dashboard"); // Rediriger vers le dashboard après la création
    } catch (err) {
      alert("Erreur lors de la création de la tâche");
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
              Créer une Tâche
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <form onSubmit={handleSubmit}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  name="name"
                  label="Nom de la tâche"
                  fullWidth
                  value={taskData.name}
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
                  value={taskData.description}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel>Projet</InputLabel>
                  <Select
                    name="projectId"
                    value={taskData.projectId}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="">Sélectionnez un projet</MenuItem>
                    {projects.map((project) => (
                      <MenuItem key={project._id} value={project._id}>
                        {project.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel>Statut</InputLabel>
                  <Select name="status" value={taskData.status} onChange={handleChange}>
                    <MenuItem value="En attente">En attente</MenuItem>
                    <MenuItem value="En cours">En cours</MenuItem>
                    <MenuItem value="Terminé">Terminé</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel>Priorité</InputLabel>
                  <Select name="priority" value={taskData.priority} onChange={handleChange}>
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
                  value={taskData.deadline}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth type="submit">
                  Créer
                </MDButton>
              </MDBox>
            </form>
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default CreateTask;
