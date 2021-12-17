import React, { useEffect, useState } from "react";
import { Paper, Box, Container, Button } from "@mui/material";
import { PhotoCameraBackOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Input from "../../components/Input";
import useAPI from "../../hooks/useAPI";
import { updateDataToAPI, postDataToAPI } from "../../utils/API";
import Modal, { closeModal, openModal } from "../../components/Modal";
import ImageCropper, { getCroppedImage } from "../../components/ImageCropper";

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

  const saveImage = () => {
    if (getCroppedImage()) {
      closeModal();
      let formdata = new FormData();
      formdata.append("image", getCroppedImage());
      console.log(formdata.getAll("image"));
      setConfig(postDataToAPI("user/me?_method=put", formdata, token, false));
    }
    console.log("clicked");
  };

  return (
    <>
      <div className="profile-img">
        <Paper elevation={3} className="profile-img-container" onClick={() => openModal("Ubah foto profile", <ImageCropper />, true, saveImage)}>
          <img className="img-fluid" alt="Profile" src={user.image + "?" + Date.now()} />
          <Box
            sx={{
              position: "absolute",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PhotoCameraBackOutlined />
          </Box>
        </Paper>
      </div>
      <div style={{ padding: "7vh 0 2vh 0" }}>
        <Container className="form-update">
          <Box component="form" onSubmit={handleSubmit} className="form-update-input">
            {forms.map((input) => {
              return <Input key={input[0]} input={input} type={"update"} setValid={setIsValid} oldValue={user[input[0]]} />;
            })}
            <div className="btn-bottom">
              <Button fullWidth variant="outlined" size="large" sx={{ mt: 1, mb: 1 }} onClick={() => navigate("/profile/change-pass")}>
                Ubah Kata Sandi
              </Button>
              <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 1, mb: 2 }} disabled={isValid ? false : true}>
                Simpan
              </Button>
            </div>
          </Box>
        </Container>
        <Modal />
      </div>
    </>
  );
}

export default Update;
