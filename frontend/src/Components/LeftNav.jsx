import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useLanguage } from "../utilities/LanguageContext"; // Adjust the import path
import { ABOUT_US_HEADER_BACKGROUND, ABOUT_US_TEXT, FAQ_HEADER_BACKGROUND, FAQ_TEXT, TEXT } from "../utilities/constants"; // Adjust the import path
import closeIcon from "../Assets/close.svg"; // Assuming close.svg is an image
import arrowRightIcon from "../Assets/arrow_right.svg"; // Assuming arrow_right.svg is an image

function LeftNav({ showLeftNav = true, setLeftNav, uploadedFile, fileType}) {
  const { language } = useLanguage();

  return (
    <>
      <Grid className="appHeight100" >
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
              <Grid item >
                <Typography variant="h6" sx={{fontWeight:"bold"}} color={ABOUT_US_HEADER_BACKGROUND}>{TEXT[language].ABOUT_US_TITLE}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" color={ABOUT_US_TEXT} >{TEXT[language].ABOUT_US}</Typography>
              </Grid>
              {uploadedFile && (fileType === "application/pdf" || fileType === "video/mp4") && (
                  <Grid item>
                  <Typography variant="h6" color={ABOUT_US_TEXT} sx={{fontWeight:"bold"}}>{TEXT[language].FILE_PREVIEW}</Typography>
                  <Typography sx={{marginBottom:2}} variant="subtitle1" color={ABOUT_US_TEXT}>{uploadedFile.name}</Typography>
                  {fileType === "application/pdf" && (
                    <embed src={URL.createObjectURL(uploadedFile)} width="100%" height="450px" type="application/pdf" />
                  )}
                  {fileType === "video/mp4" && (
                    <video width="100%" controls>
                      <source src={URL.createObjectURL(uploadedFile)} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </Grid>
                )}
              <Grid item>
                <Typography variant="h6" sx={{fontWeight:"bold"}} color={FAQ_HEADER_BACKGROUND}>{TEXT[language].FAQ_TITLE}</Typography>
                <ul >
                  {TEXT[language].FAQS.map((question, index) => (
                    <li key={index}>
                      <Typography variant="subtitle1" color={FAQ_TEXT}>{question}</Typography>
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
