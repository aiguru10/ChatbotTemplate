// theme.js
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00205A", // Banner Health blue
      50: "#BFD5FE",
      70: "#E6EFFE",
    },
    background: {
      default: "#F5F8FE",
    },
    secondary: {
      main: "#8DC7E8",
    },
  },
});

export default theme;
