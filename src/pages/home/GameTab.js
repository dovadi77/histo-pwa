import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import React from "react";
  import PersonIcon from "@mui/icons-material/Person";
  import GroupIcon from "@mui/icons-material/Group";
  import theme from "../../theme";
  import { useNavigate } from "react-router";
  
  const GameTab = () => {
    const navigate = useNavigate();
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          height: "100%",
          padding: theme.spacing(2),
          marginTop: theme.spacing(2),
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card onClick={() => navigate("/leader-board")}>
              <CardActionArea>
                <PersonIcon sx={{ width: 100, height: 100 }} />
                <CardContent>
                  <Typography>Individual</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardActionArea>
                <GroupIcon sx={{ width: 100, height: 100 }} />
                <CardContent>
                  <Typography>Versus</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default GameTab;
  