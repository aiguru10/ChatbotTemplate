import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { CHAT_HEADER_TITLE } from "../utilities/constants";
import { Container } from "@mui/material";

function ChatHeader() {
  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4" className="chatHeaderText">
          {CHAT_HEADER_TITLE}
        </Typography>
      </Container>
    </>
  );
}

export default ChatHeader;
