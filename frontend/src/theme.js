// theme.js
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
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
