import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#363636",
      contrastText: "#FBFAFC",
    },
    secondary: {
      main: "#FEEDE2",
      contrastText: "#000000",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

theme = responsiveFontSizes(theme);
export default theme;
