import { useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Route, Routes } from "react-router";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import HomeScreen from "./pages/HomeScreen";
import theme from "./theme";
import DetailLearnPages from "./pages/DetailLearnPages";
import LeaderBoardScreen from "./pages/LeaderBoardScreen";

const useStyles = makeStyles({
  container: {
    backgroundColor: theme.siteBackgroundColor,
    margin: "0 auto",
    minHeight: "100vh",
  },
});

const AppRoutes = () => {
  const bigSizeScreen = useMediaQuery("(min-width:600px)");
  const classes = useStyles();

  return (
    <div
      className={classes.container}
      style={
        bigSizeScreen
          ? { maxWidth: theme.containerWidth }
          : { width: "100%", minWidth: 300 }
      }
    >
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/detail-learn" element={<DetailLearnPages />} />
        <Route path="/leader-board" element={<LeaderBoardScreen />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
