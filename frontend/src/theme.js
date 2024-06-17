// theme.js
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E7B00C", // Kelvin yellow
      50: "#FFFFF0",
      70: "#FFFFFF",
    },
    background: {
      default: "#E7B00C",
    },
    secondary: {
      main: "#000000",
    },
  },
});

export default theme;
