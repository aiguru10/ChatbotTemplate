import React, { useState } from "react";
import { Grid, Button, CircularProgress, Typography } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";
import { chat_API } from "../utilities/constants";

function Attachment({ onFileUploadComplete }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setUploadStatus("");

    try {
      const response = await axios.post(chat_API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("File uploaded successfully!");
      onFileUploadComplete(file);
    } catch (error) {
      setUploadStatus("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Grid container direction="column" alignItems="flex-end" justifyContent="center">
        <Grid item xs={12}>
          <Button component="label" className="attachmentButton">
            <AttachFileIcon />
            <input type="file" accept="application/pdf" hidden onChange={handleFileChange} />
            {uploading && <CircularProgress size={24} />}
          </Button>
        </Grid>
        <Grid item xs={12}>
          {selectedFile && <Typography variant="body2">Selected file: {selectedFile.name}</Typography>}
          {uploadStatus && (
            <Typography variant="body2" color={uploadStatus.includes("successfully") ? "green" : "red"}>
              {uploadStatus}
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default Attachment;
