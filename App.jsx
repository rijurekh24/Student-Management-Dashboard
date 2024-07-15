import React from "react";
import { Container, Typography, Breadcrumbs, Link, Box } from "@mui/material";
import StudentTable from "./src/components/StudentTable";

function App() {
  return (
    <Box sx={{ p: 2 }}>
      <Breadcrumbs sx={{ mt: 2, mb: 2 }}>
        <Link style={{ textDecoration: "none" }} href="/">
          Home
        </Link>
        <Typography>Student List</Typography>
      </Breadcrumbs>
      <Typography sx={{ mb: 3, fontSize: "30px", textAlign: "center", mt: 2 }}>
        Student Management
      </Typography>
      <StudentTable />
    </Box>
  );
}

export default App;
