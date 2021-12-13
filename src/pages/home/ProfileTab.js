import { Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import theme from "../../theme";
import image2 from "../../assets/b.png";


const useStyles = makeStyles({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  boxInput: {
    display: "flex",
    textAlign: "left",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  roundedImage: {
    height: 80,
    width: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#f5c242",
  },
});

const ProfileTab = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box>
        <AccountCircleIcon
          sx={{
            width: 100,
            height: 100,
            marginTop: theme.spacing(10),
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <Box sx={{ marginBottom: 2 }}>
          <Paper
            elevation={3}
            sx={{
              margin: theme.spacing(4),
              padding: theme.spacing(2),
            }}
          >
            <Typography>
              <Box className={classes.boxInput}>
                <Typography variant="h6" component="div">
                  Nama
                </Typography>
                <Typography variant="body">PoponKT</Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ marginTop: theme.spacing(1) }}
                >
                  Email
                </Typography>
                <Typography variant="body">kevdam@gmail.com</Typography>
              </Box>
            </Typography>
          </Paper>
        </Box>
        <Typography variant="h6">Penghargaan</Typography>
        <Grid container spacing={2} sx={{ marginTop: theme.spacing(3) }}>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Box className={classes.roundedImage}>
                <img alt="abc" src={image2} style={{ width: 50, height: 50 }} />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Box className={classes.roundedImage}>
                <img alt="abc" src={image2} style={{ width: 50, height: 50 }} />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Box className={classes.roundedImage}>
                <img alt="abc" src={image2} style={{ width: 50, height: 50 }} />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Box className={classes.roundedImage}>
                <img alt="abc" src={image2} style={{ width: 50, height: 50 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfileTab;
