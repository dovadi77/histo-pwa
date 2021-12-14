import React, { useState, useEffect } from "react";
import swal from "sweetalert2";
import useAPI from "../hooks/useAPI";
import Cookies from "../utils/Cookies";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toast from "../components/Toast";
import Input from "../components/Input";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
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
    ["username", "Nickname", "text"],
    ["email", "Email", "email"],
    ["password", "Password", "password"],
    ["confirm_password", "Konfirmasi Password", "password"],
  ],
};

export default function AuthScreen({ setToken, type }) {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("warning");
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const setOpenIt = (val) => {
    setOpen(val);
  };

  const setValid = (val) => {
    setIsValid(val);
  };

  const { setCookie, checkCookie } = Cookies();
  const { response, setConfig } = useAPI();

  let session = checkCookie("token");
  let navigate = useNavigate();

  // check token valid or not (redirect to login page)
  if (session && type === "login") {
    let sessionResponse = JSON.parse(session);
    // if token null then clear token
    if (!sessionResponse.token) {
      setCookie("token", null, 0, true);
      swal.fire({
        title: "Login Kembali",
        text: "Sesi sudah tidak valid, silahkan login kembali",
        showCloseButton: true,
        showConfirmButton: false,
        icon: "error",
        timer: 3000,
      });
    }
  }

  if (type === "login") {
    // if route redirect to login then clear token
    setCookie("token", null, 0, true);
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
        setMessage("Email / Password tidak boleh kosong !!!");
        setColor("error");
        setOpen(true);
      } else {
        setConfig(
          postDataToAPI("user/login", {
            email: data.email,
            password: data.password,
          })
        );
      }
    } else {
      if (
        data.email === "" ||
        data.password === "" ||
        data.confirmPassword === "" ||
        data.username === ""
      ) {
        setMessage(
          "Nickname / Email / Password / Konfirmasi Password tidak boleh kosong !!!"
        );
        setColor("error");
        setOpen(true);
      } else {
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

  useEffect(() => {
    const checkRes = (res) => {
      if (res.success) {
        setToken(res.data);
      } else {
        setMessage(res.message);
        setColor("error");
        setOpen(true);
      }
    };
    if (response) {
      return checkRes(response);
    }
  }, [response, setToken]);
  return (
    <div>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="centerTitle"
          style={{
            height: type === "login" ? "30vh" : "18vh",
            justifyContent: type === "login" ? "center" : "flex-end",
          }}
        >
          <Typography component="h1" variant="h1" fontWeight="800">
            HISTO
          </Typography>
          <div style={{ transform: "translate(0,-1em)" }}>
            <Typography component="h2" variant="h4">
              Jasmerah
            </Typography>
          </div>
        </div>
        <div
          className="userForm"
          style={{ height: type === "login" ? "70vh" : "82vh" }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, px: 6 }}
          >
            <div style={{ textAlign: "center", margin: "2em 0" }}>
              <Typography component="h3" variant="h5" fontWeight="500">
                {type === "login" ? "Selamat Datang," : "Daftarkan Dirimu,"}
              </Typography>
              <Typography component="h3" variant="h5" fontWeight="500">
                {type === "login"
                  ? "Para Pejuang!"
                  : "Menjadi Seorang Pejuang!"}
              </Typography>
            </div>
            {inputFieldList[type].map((input) => {
              return (
                <Input
                  key={input[0]}
                  input={input}
                  type={type}
                  setValid={setValid}
                />
              );
            })}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={isValid ? false : true}
            >
              {type === "login" ? "Masuk >" : "Daftar >"}
            </Button>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() =>
                    navigate(`${type === "login" ? "/register" : "/login"}`)
                  }
                >
                  {type === "login"
                    ? "Belum memiliki akun? Daftar"
                    : "Sudah memiliki akun? Masuk"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 2 }} />
          <Toast
            color={color}
            message={message}
            openIt={open}
            setOpenIt={setOpenIt}
          />
        </div>
      </Box>
    </div>
  );
}
