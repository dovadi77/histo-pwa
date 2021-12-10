import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import theme from "../theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  AppBar,
  Button,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100vh",
  },
  boxInput: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(10),
  },
});

const RegisterScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography variant="h6">Register</Typography>
        </Toolbar>
      </AppBar>
      <Box>
        <AccountCircleIcon
          sx={{
            width: 100,
            height: 100,
            marginTop: theme.spacing(15),
          }}
        />
        <Typography variant="h5">Selamat Datang</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ marginBottom: 5 }}>
          <Paper
            elevation={3}
            sx={{
              margin: theme.spacing(4),
              padding: theme.spacing(2),
            }}
          >
            <Box className={classes.boxInput}>
              <TextField label="Nama" variant="filled" />
              <TextField
                label="Email"
                variant="filled"
                sx={{ marginTop: theme.spacing(0) }}
              />

              <Button variant="contained" sx={{ marginTop: theme.spacing(10) }}>
                Daftar
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterScreen;
