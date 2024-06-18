import React, { useState } from "react";
import { TextField, Grid, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "../utilities/constants.js";
import { CHAT_INPUT_PLACEHOLDER } from "../utilities/constants.js";

function ChatInput({ onSendMessage, processing }) {
  const [message, setMessage] = useState("");
  const [helperText, setHelperText] = useState("");

  // Function to handle typing event
  const handleTyping = (event) => {
    if (helperText) {
      setHelperText("");
    }
    setMessage(event.target.value);
  };

  // Function to handle send message
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    } else {
      setHelperText("Cannot send empty message");
    }
  };

  return (
    <Grid container item xs={12} alignItems="center" className="sendMessageContainer">
      <Grid item xs={11.5}>
        <TextField
          multiline
          maxRows={4}
          fullWidth
          placeholder={CHAT_INPUT_PLACEHOLDER}
          id="USERCHATINPUT"
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Prevents a newline from being added
              handleSendMessage();
            }
          }}
          onChange={handleTyping}
          helperText={helperText}
          sx={{
            "& fieldset": { border: "none" },
          }}
        />
      </Grid>
      <Grid item xs={0.5}>
        <IconButton
          aria-label="send"
          disabled={processing}
          onClick={handleSendMessage}
          // iconColor
          color={message.trim() !== "" ? "primary" : "default"}
        >
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default ChatInput;
