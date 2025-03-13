import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProject, updateProject } from "../../../../../api";

// Material Dashboard 2 React components
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React layout components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Spinner component
import Spinner from "examples/Spinner";

function UpdateProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", description: "", deadline: "" });
  const [loading, setLoading] = useState(true); // État pour gérer le chargement

  useEffect(() => {
    document.title = "Modifier le Projet";
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProject(id);
        setFormData({
          ...response,
          deadline: response.deadline
            ? new Date(response.deadline).toISOString().split("T")[0]
            : "",
        });
      } catch (err) {
        alert("Erreur lors du chargement du projet");
      } finally {
        setLoading(false); // Arrêter le chargement une fois les données récupérées
      }
    };
    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await updateProject(id, formData, token);
      if (response.error) {
        alert("Erreur lors de la mise à jour du projet : " + response.error);
        return;
      }
      alert("Projet mis à jour avec succès !");
      navigate("/dashboard"); // Rediriger vers le dashboard après la mise à jour
    } catch (err) {
      alert("Erreur lors de la mise à jour du projet");
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
              Modifier le Projet
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

export default UpdateProject;
