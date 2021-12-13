import React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";
import BarChartIcon from "@mui/icons-material/BarChart";
import theme from "../theme";
import Paper from "@mui/material/Paper";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    height: "80vh",
    flexDirection: "column",
  },
  boxInput: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(10),
  },
});

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
};

const rows = [
  createData("1", 362, "Budi"),
  createData("2", 337, "Hendro"),
  createData("3", 262, "Yuda"),
  createData("4", 262, "Yudi"),
  createData("5", 262, "Yuda"),
  createData("6", 262, "Yuda"),
  createData("7", 262, "Yuda"),
  createData("8", 262, "Yuda"),
  createData("9", 262, "Yuda"),
  createData("10", 262, "Yuda"),
  createData("11", 262, "Yuda"),
  createData("12", 262, "Yuda"),
];

const LeaderBoardScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography variant="h6">Peringkat</Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <BarChartIcon sx={{ width: 100, height: 100 }} />
        <Typography variant="h6">Peringkat</Typography>
      </Box>
      <Paper
        sx={{
          width: "90%",
          marginTop: theme.spacing(7),
        }}
      >
        <TableContainer
          sx={{
            maxHeight: 400,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan="3">
                  Rank
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.calories}</TableCell>
                  <TableCell align="left">{row.fat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Button
        variant="contained"
        sx={{
          marginTop: theme.spacing(10),
          width: "90%",
        }}
      >
        <Typography>Play</Typography>
      </Button>
    </Box>
  );
};

export default LeaderBoardScreen;
