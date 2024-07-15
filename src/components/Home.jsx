import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 4,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mt: 10,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Welcome to the Student Management System
        </Typography>
        <Button variant="contained" component={RouterLink} to="/dashboard">
          Go to Dashboard
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
