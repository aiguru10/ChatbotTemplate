import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ABOUT_US, FAQS } from "../utilities/constants";
import closeIcon from "../Assets/close.svg"; // Assuming close.svg is an image
import arrowRightIcon from "../Assets/arrow_right.svg"; // Assuming arrow_right.svg is an image

function LeftNav({ showLeftNav = true, setLeftNav }) {
  return (
    <>
      <Grid className="appHeight100">
        <Grid container direction="column" justifyContent="flex-start" alignItems="stretch" padding={4} spacing={2}>
          {showLeftNav ? (
            <>
              <Grid item container direction="column" justifyContent="flex-start" alignItems="flex-end">
                <img
                  src={closeIcon}
                  alt="Close Panel"
                  onClick={() => setLeftNav(false)} // Removed extra parentheses
                />
              </Grid>
              <Grid item>
                <Typography variant="h6">About us</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{ABOUT_US}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">Frequently Asked Questions</Typography>
              </Grid>
              <Grid item>
                <ul>
                  {FAQS.map((question, index) => (
                    <li key={index}>
                      <Typography variant="subtitle1">{question}</Typography>
                    </li>
                  ))}
                </ul>
              </Grid>
            </>
          ) : (
            <>
              <Grid item container direction="column" justifyContent="flex-start" alignItems="flex-end">
                <img
                  src={arrowRightIcon}
                  alt="Open Panel"
                  onClick={() => setLeftNav(true)} // Removed extra parentheses
                />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default LeftNav;
