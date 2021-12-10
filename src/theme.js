import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#ff8A37",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FEEDE2",
      contrastText: "#000000",
    },
  },
  spacing: 4,
  containerWidth: 450,
  siteBackgroundColor: "#FFE7D7",
});

theme = responsiveFontSizes(theme);
export default theme;
