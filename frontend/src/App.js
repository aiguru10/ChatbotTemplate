import React, { useState } from "react";
import "./styles.js";
import theme from "./theme"; // Import your theme
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider

import Grid from "@mui/material/Grid";
import AppHeader from "./Components/AppHeader";
import LeftNav from "./Components/LeftNav";
import ChatHeader from "./Components/ChatHeader";
import ChatBody from "./Components/ChatBody";
import Logo from "./Assets/Logo.svg";

function App() {
  const [showLeftNav, setLeftNav] = useState(true);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container direction="column" justifyContent="center" alignItems="stretch" className="appHeight100 appHideScroll">
          <Grid item>
            <AppHeader />
          </Grid>
          <Grid item container direction="row" justifyContent="flex-start" alignItems="stretch" className="appFixedHeight100">
            <Grid item xs={showLeftNav ? 3 : 0.5} sx={{ backgroundColor: (theme) => theme.palette.background.default }}>
              <LeftNav showLeftNav={showLeftNav} setLeftNav={setLeftNav} />
            </Grid>
            <Grid container item xs={showLeftNav ? 9 : 11.5} direction="column" justifyContent="flex-start" alignItems="stretch" className="appWidth100" sx={{ padding: "1.5rem" }}>
              <Grid item>
                <ChatHeader />
              </Grid>
              <Grid container item direction="row" alignItems="flex-end">
                <Grid item xs={10} md={10}>
                  <ChatBody />
                </Grid>     
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default App;
