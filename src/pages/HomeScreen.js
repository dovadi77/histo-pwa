import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LearnTab from "./home/LearnTab";
import ProfileTab from "./home/ProfileTab";
import GameTab from "./home/GameTab";

const HomeScreen = () => {
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState("Materi");

  useEffect(() => {
    if (value === 0) {
      setTitle("Materi");
    } else if (value === 1) {
      setTitle("Game");
    } else {
      setTitle("Profile");
    }
  }, [value]);

  const LoadPage = () => {
    if (value === 0) {
      return <LearnTab />;
    } else if (value === 1) {
      return <GameTab />;
    } else {
      return <ProfileTab />;
    }
  };
  return (
    <Box>
      <AppBar position="static">
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
      <LoadPage />
      <BottomNavigation
        className="navbar"
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
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default HomeScreen;
