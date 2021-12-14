import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const emailRegex =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const passRegex = /^(?=.*\d)(?=.*[a-z])/i;

export default function Input({ input, setValid, type }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const checkValue = (event) => {
    if (input[0] === "email") {
      if (event.target.value.length > 2) {
        if (!emailRegex.test(event.target.value)) {
          setError("Format email tidak cocok");
          setValid(false);
        } else {
          setError(null);
          setValid(true);
        }
      } else {
        setError(null);
        setValid(false);
      }
    }
    if (type === "register") {
      if (input[2] === "password") {
        if (event.target.value.length > 7) {
          if (!passRegex.test(event.target.value)) {
            setError("Password harus memiliki kombinasi huruf dan angka");
            setValid(false);
          } else {
            setError(null);
            setValid(true);
          }
        } else {
          setError("Minimal 8 karakter");
          setValid(false);
        }
      }
    }
    if (input[0] === "username") {
      if (event.target.value.length > 3) {
        setError(null);
        setValid(true);
      } else {
        setError("Nickname harus diisi, minimal 4 karakter");
        setValid(false);
      }
    }
    setValue(event.target.value);
  };
  return (
    <TextField
      margin="normal"
      required={input[3] ?? true}
      fullWidth
      id={input[0]}
      label={input[1]}
      name={input[0]}
      autoComplete={input[0]}
      type={input[2]}
      autoFocus={input[0] === "email" ? true : false}
      defaultValue={value}
      error={error ? true : false}
      helperText={error ? error : null}
      onChange={checkValue}
    />
  );
}
