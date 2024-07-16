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
  const [dltIndx, setDltIndx] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // set sorted data by ascending or descending
  const handleRequestSort = (Hdfield) => {
    const isAsc = orderBy === Hdfield && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(Hdfield);
  };

  // for pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // how many rows per page user wants to see
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // delete functionality for user removal
  const handleDelete = () => {
    setStudents((prevStudents) => prevStudents.filter((_, i) => i !== dltIndx));
    setSnackbarOpen(true);
    handleClose();
  };

  // delete pop up
  const handleClickOpen = (indx) => {
    setDltIndx(indx);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDltIndx(null);
  };

  // searched user
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // filtered data user according to their streams
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  // deletion confirmation snackbar close
  const handleSnackbarClose = (e) => {
    if (e === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // filtering user according to their streams
  const filteredStudents = students.filter((student) => {
    return (
      (student["first_name"].toLowerCase().includes(search.toLowerCase()) ||
        student["last_name"].toLowerCase().includes(search.toLowerCase())) &&
      (filter === "" || student["stream"] === filter)
    );
  });

  // for sorting data by ascending or descending order
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
            {displayedStudents.map((student, indx) => (
              <TableRow key={indx}>
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
                    onClick={() => handleClickOpen(indx)}
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
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Record deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentTable;
