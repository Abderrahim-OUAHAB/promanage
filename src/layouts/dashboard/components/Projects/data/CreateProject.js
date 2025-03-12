import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../../../../api";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Card from "@mui/material/Card";

// Material Dashboard 2 React layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function CreateProject() {
  const [formData, setFormData] = useState({ name: "", description: "", deadline: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await createProject(formData, token);
      if (response.error) {
        alert("Erreur lors de la création du projet : " + response.error);
        return;
      }
      alert("Projet créé avec succès !");
      navigate("/dashboard"); // Rediriger vers le dashboard après la création
    } catch (err) {
      alert("Erreur lors de la création du projet");
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
              Créer un Projet
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <form onSubmit={handleSubmit}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  name="name"
                  label="Nom du projet"
                  fullWidth
                  value={formData.name}
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
                  value={formData.description}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="date"
                  name="deadline"
                  label="Date limite"
                  fullWidth
                  value={formData.deadline}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true, // Pour que le label ne chevauche pas la valeur
                  }}
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

export default CreateProject;
