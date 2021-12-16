import React, { useEffect, useState } from "react";
import { Paper, Box, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Input from "../../components/Input";
import useAPI from "../../hooks/useAPI";
import { updateDataToAPI } from "../../utils/API";

const forms = [
  ["name", "Nama", "text", false],
  ["username", "Nickname", "text"],
];

function Update({ user, setToken, setBack, setTitle, setUpdateUser, token }) {
  const [isValid, setIsValid] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { response, setConfig } = useAPI();

  let navigate = useNavigate();

  const snackbar = (msg, type = "error") => {
    enqueueSnackbar(msg, {
      variant: type,
    });
  };

  useEffect(() => {
    setBack(true);
    setTitle("Ubah Identitas");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (data.username === "") {
      snackbar("Nickname tidak boleh kosong !!!");
    } else {
      setConfig(
        updateDataToAPI(
          "user/me",
          {
            username: data.username,
            name: data.name,
          },
          token
        )
      );
    }
  };

  useEffect(() => {
    const checkRes = (res) => {
      if (res.success) {
        snackbar(res.message, "success");
        setIsValid(false);
        setUpdateUser(Math.random());
      } else {
        if (res.message === "Unauthorized") {
          setToken(null);
        } else {
          snackbar(res.message);
        }
      }
    };
    if (response) {
      return checkRes(response);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      <div className="profile-img">
        <Paper elevation={3} className="profile-img-container">
          <img className="img-fluid" alt="Profile" src={user.image} />
        </Paper>
      </div>
      <div style={{ padding: "7vh 0 2vh 0" }}>
        <Container className="form-update">
          <Box component="form" onSubmit={handleSubmit}>
            {forms.map((input) => {
              return <Input key={input[0]} input={input} type={"update"} setValid={setIsValid} oldValue={user[input[0]]} />;
            })}
          </Box>
          <div className="btn-bottom">
            <Button fullWidth variant="outlined" size="large" sx={{ mt: 1, mb: 1 }} onClick={() => navigate("/profile/change-pass")}>
              Ubah Kata Sandi
            </Button>
            <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 1, mb: 2 }} disabled={isValid ? false : true}>
              Simpan
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Update;
