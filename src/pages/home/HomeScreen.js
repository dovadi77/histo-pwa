import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Toolbar,
    Typography,
  } from "@mui/material";
  import { makeStyles } from "@mui/styles";
  import { Box } from "@mui/system";
  import React, { useState } from "react";
  import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
  import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
  import AccountCircleIcon from "@mui/icons-material/AccountCircle";
  import LearnTab from "./home/LearnTab";
  import ProfileTab from "./home/ProfileTab";
  import GameTab from "./home/GameTab";
  
  const useStyles = makeStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      height: "100vh",
    },
  });
  const HomeScreen = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [title, setTitle] = useState("Materi");
  
    const LoadPage = () => {
      if (value === 0) {
        setTitle("Materi");
        return <LearnTab />;
      } else if (value === 1) {
        setTitle("Game");
        return <GameTab />;
      } else {
        setTitle("Profile");
        return <ProfileTab />;
      }
    };
    return (
      <Box className={classes.container}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <LoadPage />
        </Box>
  
        <BottomNavigation
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
  