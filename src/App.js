import React, { useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Controller from "./Controller";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

function App() {
  useEffect(() => {
    function isStandalone() {
      return !!navigator.standalone || window.matchMedia("(display-mode: standalone)").matches;
    }
    function exitsOnBack() {
      let userAgent = navigator.userAgent.toLowerCase();
      let isAndroid = userAgent.indexOf("android") > -1;
      console.log(isAndroid);
      return isStandalone() && isAndroid;
    }

    window.addEventListener("popstate", () => {
      let path = window.location.pathname;
      if (path === "/material" || path === "/") {
        if (exitsOnBack()) {
          window.location.reload();
        }
      }
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
