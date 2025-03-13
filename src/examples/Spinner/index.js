import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "components/MDBox";

function Spinner() {
  return (
    <MDBox display="flex" justifyContent="center" alignItems="center" minHeight="100px">
      <CircularProgress color="info" />
    </MDBox>
  );
}

export default Spinner;
