import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import theme from "../theme";
import { Button, Paper, TextField, Typography } from "@mui/material";
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

const LoginScreen = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [login, setLogin] = useState({ email: "", password: "" });

  const handleBtnLogin = () => {
    navigate("/home");
  };
  const handleBtnRegister = () => {
    navigate("/register");
  };
  return (
    <Box className={classes.container}>
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
              <TextField
                label="Email"
                variant="filled"
                onChange={(event) =>
                  setLogin({ ...login, email: event.target.value })
                }
              />
              <TextField
                label="Password"
                variant="filled"
                type="password"
                sx={{ marginTop: theme.spacing(0) }}
                onChange={(event) =>
                  setLogin({ ...login, password: event.target.value })
                }
              />

              <Button
                variant="contained"
                sx={{ marginTop: theme.spacing(10) }}
                onClick={() => handleBtnLogin()}
              >
                Masuk
              </Button>
              <Button
                variant="outlined"
                sx={{ marginTop: theme.spacing(4) }}
                onClick={() => handleBtnRegister()}
              >
                Register
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginScreen;
