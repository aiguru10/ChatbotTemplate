import React from "react";
import Typography from "@mui/material/Typography";
import { CHAT_HEADER_TITLE, HEADER_TEXT_GRADIENT } from "../utilities/constants";
import { Container } from "@mui/material";

function ChatHeader() {
  return (
    <>
      <Container>
        <Typography variant="h4" className="chatHeaderText" sx={{ background: HEADER_TEXT_GRADIENT }}>
          {CHAT_HEADER_TITLE}
        </Typography>
      </Container>
    </>
  );
}

export default ChatHeader;
