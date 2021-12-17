import React, { useEffect, useState } from "react";
import { Box, Container, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import Input from "../../components/Input";
import useAPI from "../../hooks/useAPI";
import { updateDataToAPI } from "../../utils/API";

const forms = [
  ["old_password", "Password Lama", "password"],
  ["password", "Password Baru", "password"],
  ["confirm_password", "Konfirmasi Password Baru", "password"],
];

function ChangePass({ user, setToken, setBack, setTitle, token }) {
  const [isValid, setIsValid] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { response, setConfig } = useAPI();

  const snackbar = (msg, type = "error") => {
    enqueueSnackbar(msg, {
      variant: type,
    });
  };

  useEffect(() => {
    setBack(true);
    setTitle("Ubah Kata Sandi");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (data.old_password === "") {
      snackbar("Password tidak boleh kosong !!!");
    } else {
      setConfig(
        updateDataToAPI(
          "user/change-pass",
          {
            old_password: data.old_password,
            password: data.password,
            confirm_password: data.confirm_password,
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
      <div>
        <Container className="form-update" style={{ height: "73vh" }}>
          <Box component="form" onSubmit={handleSubmit} className="form-update-input">
            {forms.map((input) => {
              return <Input key={input[0]} input={input} type={"update"} setValid={setIsValid} />;
            })}
            <div className="btn-bottom">
              <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 1, mb: 2 }} disabled={isValid ? false : true}>
                Simpan
              </Button>
            </div>
          </Box>
        </Container>
      </div>
    </>
  );
}

export default ChangePass;
