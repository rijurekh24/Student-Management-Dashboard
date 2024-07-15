import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  TablePagination,
  TableSortLabel,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import studentsData from "../../students.json";

const StudentTable = () => {
  const [students, setStudents] = useState(studentsData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("first_name");
  const [open, setOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = () => {
    setStudents((prevStudents) =>
      prevStudents.filter((_, i) => i !== deleteIndex)
    );
    setSnackbarOpen(true);
    handleClose();
  };

  const handleClickOpen = (index) => {
    setDeleteIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteIndex(null);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleSnackbarClose = (ev) => {
    if (ev === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const filteredStudents = students.filter((student) => {
    return (
      (student["first_name"].toLowerCase().includes(search.toLowerCase()) ||
        student["last_name"].toLowerCase().includes(search.toLowerCase())) &&
      (filter === "" || student["stream"] === filter)
    );
  });

  const sortedStudents = filteredStudents.sort((a, b) => {
    if (orderBy === "last year percentage ") {
      return order === "asc"
        ? a[orderBy] - b[orderBy]
        : b[orderBy] - a[orderBy];
    } else {
      if (order === "asc") {
        return a[orderBy] < b[orderBy] ? -1 : 1;
      }
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });

  const displayedStudents = sortedStudents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box
      sx={{
        // width: "100%",
        overflow: "hidden",
        boxShadow: 4,
        px: 2,
        borderRadius: "10px",
        mb: 3,
        pt: 2,
        mt: 3,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            sx={{ mr: 2, mb: 2, width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            label="Filter"
            value={filter}
            onChange={handleFilter}
            sx={{ width: "100%", mb: 2 }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="Commerce">Commerce</MenuItem>
            <MenuItem value="Arts">Arts</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Box
        style={{
          maxHeight: "420px",
          overflowY: "auto",
          overflowX: "auto",
          border: "1px solid #ddd",
        }}
      >
        <Table sx={{ border: "1px solid #ccc", minWidth: "400px" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  bgcolor: "#ccc",
                  color: "black",
                  fontWeight: 700,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <TableSortLabel
                  active={orderBy === "first_name"}
                  direction={orderBy === "first_name" ? order : "asc"}
                  onClick={() => handleRequestSort("first_name")}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: "#ccc",
                  color: "black",
                  fontWeight: 700,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                Last Name
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: "#ccc",
                  color: "black",
                  fontWeight: 700,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <TableSortLabel
                  active={orderBy === "class"}
                  direction={orderBy === "class" ? order : "asc"}
                  onClick={() => handleRequestSort("class")}
                >
                  Class
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: "#ccc",
                  color: "black",
                  fontWeight: 700,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                Stream
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: "#ccc",
                  color: "black",
                  fontWeight: 700,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <TableSortLabel
                  active={orderBy === "last year percentage "}
                  direction={
                    orderBy === "last year percentage " ? order : "asc"
                  }
                  onClick={() => handleRequestSort("last year percentage ")}
                >
                  Last Year Percentage
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  bgcolor: "#ccc",
                  color: "black",
                  fontWeight: 700,
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedStudents.map((student, index) => (
              <TableRow role="checkbox" tabIndex={-1} key={index}>
                <TableCell>{student["first_name"]}</TableCell>
                <TableCell>{student["last_name"]}</TableCell>
                <TableCell>{student["class"]}</TableCell>
                <TableCell>{student["stream"]}</TableCell>
                <TableCell>{student["last year percentage "]}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Visibility />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleClickOpen(index)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={filteredStudents.length}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[25, 50, 100, 1000]}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Do you really want to delete this record?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The record will be deleted permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          The record was deleted successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentTable;
