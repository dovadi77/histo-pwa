import { AppBar, BottomNavigation, BottomNavigationAction, Toolbar, Typography, Paper, Container } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import LearnTab from "./home/LearnTab";
import ProfileTab from "./home/ProfileTab";
import GameTab from "./home/GameTab";
import Cookie from "../utils/Cookies";

const Home = ({ token, setToken }) => {
  const { checkCookie } = Cookie();
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState("Materi");
  const [back, setBack] = useState(false);

  let navigate = useNavigate();

  const setGoBack = (val) => {
    setBack(val);
  };

  const setNewTitle = (val) => {
    setTitle(val);
  };

  useEffect(() => {
    let check = setInterval(() => {
      if (!checkCookie("token")) {
        clearInterval(check);
        setToken(null);
      }
    }, 5000);
    return () => clearInterval(check);
  }, [checkCookie, setToken]);

  useEffect(() => {
    if (value === 0) {
      setTitle("Materi");
      navigate("/material");
    } else if (value === 1) {
      setTitle("Game");
      navigate("/games");
    } else {
      navigate("/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Box>
      <div className="navbar-container">
        <AppBar position="static" className="navbar">
          <Toolbar>
            {back && (
              <div style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
                {"<"}
              </div>
            )}
            <Typography variant="h6" component="div" sx={{ textAlign: "center", flexGrow: 1 }}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Container sx={{ pb: back ? 1 : 7, pt: 7 }}>
        <Routes>
          <Route path="/material/*" element={<LearnTab token={token} setToken={setToken} setBack={setGoBack} setTitle={setNewTitle} />} />
          <Route path="/games/*" element={<GameTab token={token} setToken={setToken} setBack={setGoBack} setTitle={setNewTitle} />} />
          <Route path="/profile/*" element={<ProfileTab token={token} setToken={setToken} setBack={setGoBack} setTitle={setNewTitle} />} />
          <Route path="*" element={<Navigate to="/material" />} />
        </Routes>
      </Container>
      <Paper className="bottom-navbar-container" elevation={0} hidden={back}>
        <BottomNavigation
          className="bottom-navbar"
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            setBack(false);
          }}
        >
          <BottomNavigationAction label="Materi" icon={<LocalLibraryIcon />} />
          <BottomNavigationAction label="Permainan" icon={<SportsEsportsIcon />} />
          <BottomNavigationAction label="Profil" icon={<AccountCircleIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Home;
