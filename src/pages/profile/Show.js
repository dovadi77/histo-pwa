import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Box, Container, TextField, Button } from "@mui/material";
import Cookies from "../../utils/Cookies";

function Show({ user, setToken, setBack, setTitle }) {
  const { setCookie } = Cookies();
  let navigate = useNavigate();

  const logout = () => {
    setCookie("token", null, 0, true);
    setToken(null);
    setTimeout(() => {
      if (!!navigator.standalone || window.matchMedia("(display-mode: standalone)").matches) window.location.reload();
    }, 500);
  };

  useEffect(() => {
    setBack(false);
    setTitle("Identitas Pejuang");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="profile-img">
        <Paper elevation={3} className="profile-img-container">
          <img className="img-fluid" alt="Profile" src={user.image + "?" + Date.now()} />
        </Paper>
      </div>
      <div style={{ padding: "7vh 0 2vh 0" }}>
        <Container>
          <Box>
            <TextField margin="normal" fullWidth id="name" label="Nama" name="name" type="text" value={user.name ?? "-"} disabled />
            <TextField margin="normal" fullWidth id="username" label="Nickname" name="username" type="text" value={user.username ?? "-"} disabled />
            <TextField margin="normal" fullWidth id="email" label="Email" name="email" type="email" value={user.email ?? "-"} disabled />
            <Button fullWidth variant="contained" size="large" sx={{ mt: 3, mb: 2 }} onClick={() => navigate("update")}>
              Ubah Profile
            </Button>
          </Box>
          {/* <Box>
            <h4>Penghargaan</h4>
            <Grid container spacing={1} justifyContent={"center"} style={{ textAlign: "center" }}>
              {user.achievements &&
                user.achievements.map((a) => (
                  <Grid item key={a.id}>
                    <Paper elevation={2} className="img-container">
                      <img className="img-fluid" alt="Achievement" src={a.achievement.image} />
                    </Paper>
                    <h5>{a.achievement.name}</h5>
                  </Grid>
                ))}
            </Grid>
          </Box> */}
          <Button fullWidth variant="outlined" size="small" sx={{ mt: 3, mb: 2 }} onClick={logout}>
            Logout
          </Button>
        </Container>
      </div>
    </>
  );
}

export default Show;
