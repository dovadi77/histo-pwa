import React, { useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Controller from "./Controller";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Swal from "sweetalert2";

function App() {
  useEffect(() => {
    function isStandalone() {
      return !!navigator.standalone || window.matchMedia("(display-mode: standalone)").matches;
    }
    window.addEventListener("popstate", () => {
      let path = window.location.pathname;
      if (path === "/material") {
        if (isStandalone()) {
          window.location.reload();
        }
      }
    });
    window.addEventListener("offline", () => {
      Swal.fire("Tidak Ada Koneksi", "Mohon periksa koneksi internet anda !", "error");
    });
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <BrowserRouter>
            <Controller />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
