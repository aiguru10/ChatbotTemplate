// src/components/Avatar.js
import React from "react";
import { Box } from "@mui/material";

const Avatar = () => {
  return (
    <Box>
      {/* Embed the avatar application using an iframe */}
      <iframe
        src="https://staging.d30i3i4vq1dm84.amplifyapp.com/chatbotDemo_LexV2.html"
        width="100%"
        height="600px"
        style={{ border: "none" }}
        title="Interactive Avatar"
        allow="microphone"
      />
    </Box>
  );
};

export default Avatar;
