// src/components/PdfPreview.js
import React from "react";
import { Typography, Grid } from "@mui/material";
import { useLanguage } from "../utilities/LanguageContext"; // Adjust the import path
import { ABOUT_US_TEXT, TEXT } from "../utilities/constants"; // Adjust the import path

function PdfPreview({ uploadedFile, fileType }) {
  const { language } = useLanguage();

  return (
    <Grid item>
      <Typography variant="h6" color={ABOUT_US_TEXT} sx={{ fontWeight: "bold" }}>
        {TEXT[language].FILE_PREVIEW}
      </Typography>
      <Typography sx={{ marginBottom: 2 }} variant="subtitle1" color={ABOUT_US_TEXT}>
        {uploadedFile.name}
      </Typography>
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
  );
}

export default PdfPreview;
