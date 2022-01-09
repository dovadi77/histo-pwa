import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Toolbar,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import LearnTab from "./home/LearnTab";
import ProfileTab from "./home/ProfileTab";
import GameTab from "./home/GameTab";
import useAPI from "../hooks/useAPI";
import { getDataFromAPI } from "../utils/API";

const HomeScreen = ({ token, setToken }) => {
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState("Materi");
  const { response, setConfig } = useAPI();
  const [user, setUser] = useState({});

  let navigate = useNavigate();

  // update profile from API response
  useEffect(() => {
    if (response) {
      setUser(response.data);
      console.log(user);
    }
  }, [response, user]);

  // set parameter for API and call it
  useEffect(() => {
    setConfig(getDataFromAPI("user/me", token));
  }, [setConfig, token]);

  useEffect(() => {
    if (value === 0) {
      setTitle("Materi");
      navigate("/home");
    } else if (value === 1) {
      setTitle("Game");
      navigate("/home/games");
    } else {
      setTitle("Identitas Pejuang");
      navigate("/home/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Box>
      <div className="navbar-container">
        <AppBar position="static" className="navbar">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ textAlign: "center", flexGrow: 1 }}
            >
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Container sx={{ pb: 7, pt: 7 }}>
        <SnackbarProvider maxSnack={3}>
          <Routes>
            <Route
              index
              element={<LearnTab setToken={setToken} token={token} />}
            />
            <Route
              path="games"
              element={<GameTab setToken={setToken} token={token} />}
            />
            <Route
              path="profile"
              element={
                <ProfileTab setToken={setToken} token={token} user={user} />
              }
            />
          </Routes>
        </SnackbarProvider>
      </Container>
      <Paper className="bottom-navbar-container" elevation={0}>
        <BottomNavigation
          className="bottom-navbar"
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Materi" icon={<LocalLibraryIcon />} />
          <BottomNavigationAction
            label="Permainan"
            icon={<SportsEsportsIcon />}
          />
          <BottomNavigationAction
            label="Profile"
            icon={<AccountCircleIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default HomeScreen;
