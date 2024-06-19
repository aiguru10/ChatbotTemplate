import React from "react";
import { Grid, AppBar } from "@mui/material";
import { useLanguage } from "../utilities/LanguageContext"; // Adjust the import path
import { TEXT } from "../utilities/constants"; // Adjust the import path
import Logo from "../Assets/header_logo.svg";
import UserAvatar from "../Assets/UserAvatar.svg";
import Switch from "./Switch.jsx";

function AppHeader() {
  const { language } = useLanguage(); // Use the language context

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: (theme) => theme.palette.background.header,
        height: "5rem",
        boxShadow: "none",
        borderBottom: (theme) => `1px solid ${theme.palette.primary[50]}`,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: "0 4rem" }}
        className="appHeight100"
      >
        <Grid item>
          <img src={Logo} alt={`${TEXT[language].APP_NAME} Logo`} height={48} />
        </Grid>
        <Grid item>
          <Grid container alignItems="center" justifyContent="space-evenly" spacing={1}>
            <Grid item>
              <Switch />
            </Grid>
            <Grid item>
              <img src={UserAvatar} alt="Profile Icon" height={36} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default AppHeader;
