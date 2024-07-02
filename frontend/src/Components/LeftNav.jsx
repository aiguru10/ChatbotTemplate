// src/components/LeftNav.js
import React from "react";
import { Grid } from "@mui/material";
import closeIcon from "../Assets/close.svg"; // Assuming close.svg is an image
import arrowRightIcon from "../Assets/arrow_right.svg"; // Assuming arrow_right.svg is an image
import PdfPreview from "./PdfPreview"; // Import the PdfPreview component
import InfoSections from "./InfoSections"; // Import the InfoSections component
import Avatar from "./Avatar"; // Import the Avatar component

const ALLOW_AVATAR_BOT = true; // Set this to false to disable the avatar bot

function LeftNav({ showLeftNav = true, setLeftNav, uploadedFile, fileType }) {
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
                  onClick={() => setLeftNav(false)}
                />
              </Grid>
              {uploadedFile && (fileType === "application/pdf" || fileType === "video/mp4") ? (
                <PdfPreview uploadedFile={uploadedFile} fileType={fileType} />
              ) : (
                <>
                  {ALLOW_AVATAR_BOT ? (
                    <Avatar /> // Show the Avatar component if ALLOW_AVATAR_BOT is true
                  ) : (
                    <InfoSections /> // Otherwise, show the InfoSections component
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <Grid item container direction="column" justifyContent="flex-start" alignItems="flex-end">
                <img
                  src={arrowRightIcon}
                  alt="Open Panel"
                  onClick={() => setLeftNav(true)}
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
