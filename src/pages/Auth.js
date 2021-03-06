import React, { useState, useEffect } from "react";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link, Grid, Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import Input from "../components/Input";
import useAPI from "../hooks/useAPI";
import Cookies from "../utils/Cookies";
import Title from "../components/Title";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="#">
        Histo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const inputFieldList = {
  login: [
    ["email", "Email", "email"],
    ["password", "Password", "password"],
  ],
  register: [
    ["name", "Nama", "text", false],
    ["username", "Nama Pengguna", "text"],
    ["email", "Email", "email"],
    ["password", "Password", "password"],
    ["confirm_password", "Konfirmasi Password", "password"],
  ],
};

export default function Auth({ setToken, token, type }) {
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const { setCookie, checkCookie } = Cookies();
  const { response, setConfig } = useAPI();

  let session = checkCookie("token");
  let navigate = useNavigate();

  const snackbar = (msg, type = "error") => {
    enqueueSnackbar(msg, {
      variant: type,
    });
  };

  // token is still exits
  if (session && type === "login") {
    // if token null then clear token
    if (!token) {
      setCookie("token", null, 0, true);
      // send message to re-login
      swal.fire({
        title: "Silahkan Login Kembali",
        text: "Sesi sudah tidak valid, silahkan login kembali",
        showCloseButton: true,
        showConfirmButton: false,
        icon: "error",
      });
    }
  }

  const postDataToAPI = (url, body) => {
    return {
      url: url,
      data: {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (type === "login") {
      if (data.email === "" || data.password === "") {
        snackbar("Email / Password tidak boleh kosong !!!");
      } else {
        setLoading(true);
        setConfig(
          postDataToAPI("user/login", {
            email: data.email,
            password: data.password,
          })
        );
      }
    } else {
      if (data.email === "" || data.password === "" || data.confirmPassword === "" || data.username === "") {
        snackbar("Nama Pengguna / Email / Password / Konfirmasi Password tidak boleh kosong !!!");
      } else {
        setLoading(true);
        setConfig(
          postDataToAPI("user/register", {
            email: data.email,
            password: data.password,
            confirm_password: data.confirm_password,
            username: data.username,
            name: data.name ?? null,
          })
        );
      }
    }
  };

  const redirecting = (e) => {
    e.preventDefault();
    navigate(`${type === "login" ? "/register" : "/login"}`);
  };

  useEffect(() => {
    const checkRes = (res) => {
      if (res.success) {
        setTimeout(() => {
          setToken(res.data.token);
          setLoading(false);
        }, 1000);
      } else {
        snackbar(res.message);
        setLoading(false);
      }
    };
    if (response) {
      return checkRes(response);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, setToken]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title type={type} />
        <div className="userForm" style={{ height: type === "login" ? "70vh" : "82vh" }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, px: 6 }}>
            <div style={{ textAlign: "center", margin: "2em 0" }}>
              <Typography component="h3" variant="h5" fontWeight="500">
                {type === "login" ? "Selamat Datang," : "Daftarkan Dirimu,"}
              </Typography>
              <Typography component="h3" variant="h5" fontWeight="500">
                {type === "login" ? "Para Pejuang!" : "Menjadi Seorang Pejuang!"}
              </Typography>
            </div>
            {inputFieldList[type].map((input) => {
              return <Input key={input[0]} input={input} type={type} setValid={setIsValid} />;
            })}
            <LoadingButton loading={loading} type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3, mb: 2 }} disabled={isValid ? false : true}>
              {type === "login" ? "Masuk >" : "Daftar >"}
            </LoadingButton>
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <Grid item>
                <Link variant="body2" href="#" onClick={redirecting}>
                  {type === "login" ? "Belum memiliki akun? Daftar" : "Sudah memiliki akun? Masuk"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 2 }} />
        </div>
      </Box>
    </div>
  );
}
