import React, { useState } from "react";
import { TextField, Grid, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatInput({ onSendMessage, processing }) {
  const [message, setMessage] = useState("");
  const [helperText, setHelperText] = useState("");
  const [iconColor, setIconColor] = useState('primary'); // Initial custom color

  // Function to handle typing event
  const handleTyping = (event) => {
    if (helperText) {
      setHelperText("");
      
    }
    setMessage(event.target.value);
    setIconColor('secondary');
  };

  // Function to handle send message
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
      setIconColor('primary'); // Revert back to initial color
    } else {
      setHelperText("Cannot send empty message");
    }
  };

  return (
    <Grid container item xs={10} alignItems="center" className="sendMessageContainer">
      <Grid item xs={11.5}>
        <TextField
          multiline
          maxRows={4}
          fullWidth
          id="USERCHATINPUT"
          value={message}
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
          style={{ color: iconColor }} // Use custom color
        >
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default ChatInput;
