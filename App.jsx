import React from "react";
import { Container, Typography, Breadcrumbs, Link, Box } from "@mui/material";
import StudentTable from "./src/components/StudentTable";

function App() {
  return (
    <Box sx={{ p: 1 }}>
      <Breadcrumbs sx={{ my: 1 }}>
        <Link style={{ textDecoration: "none" }} href="/">
          Home
        </Link>
        <Typography>Student List</Typography>
      </Breadcrumbs>
      <Typography sx={{ mb: 2, fontSize: "30px", textAlign: "center" }}>
        Student Management
      </Typography>
      <StudentTable />
    </Box>
  );
}

export default App;
