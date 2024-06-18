import React from "react";
import { APP_NAME } from "../utilities/constants";
import Logo from "../Assets/header_logo.svg";
import UserAvatar from "../Assets/UserAvatar.svg";
import { Grid, AppBar } from "@mui/material";
import Switch from "./Switch.jsx";

function AppHeader() {
  return (
    <AppBar position="static" sx={{ backgroundColor: (theme) => theme.palette.background.header, height: "5rem", boxShadow: "none", borderBottom: (theme) => `1px solid ${theme.palette.primary[50]}` }}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: "0 4rem" }} className="appHeight100">
        <Grid item>
          <img src={Logo} alt={`${APP_NAME} Logo`} height={48} />
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
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
