import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { makeStyles } from "@mui/styles";
import theme from "../theme";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
});

const DetailLearnPages = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <Box className={classes.container}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography variant="h6">{state.title}</Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <img
          alt="abc"
          src={state.image}
          sx={{ width: "100%", height: 250, objectFit: "cover" }}
        />
        <Typography
          sx={{
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
            textAlign: "justify",
          }}
        >
          Saya suka makan nasi
        </Typography>
      </Box>
    </Box>
  );
};

export default DetailLearnPages;
