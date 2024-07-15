import React from "react";
import { Typography, Breadcrumbs, Link, Box } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import Home from "./src/components/Home";
import StudentTable from "./src/components/StudentTable";

function BreadcrumbsNav() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs sx={{ my: 1 }}>
      <Link component={RouterLink} to="/" style={{ textDecoration: "none" }}>
        Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography key={to}>{value}</Typography>
        ) : (
          <Link
            key={to}
            component={RouterLink}
            to={to}
            style={{ textDecoration: "none" }}
          >
            {value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

function App() {
  return (
    <Router>
      <Box sx={{ px: 2 }}>
        <BreadcrumbsNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<StudentTable />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
