import React, { useState, useEffect } from "react";
import { TextField, Grid, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useLanguage } from "../utilities/LanguageContext"; // Adjust the import path
import { TEXT } from "../utilities/constants"; // Adjust the import path

function ChatInput({ onSendMessage, processing, message, setMessage }) {
  const [helperText, setHelperText] = useState("");
  const { language } = useLanguage();

  const handleTyping = (event) => {
    if (helperText) {
      setHelperText("");
    }
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    } else {
      setHelperText(TEXT[language].HELPER_TEXT);
    }
  };

  useEffect(() => {
    console.log("Updated message: ", message);
  }, [message]);

  return (
    <Grid container item xs={12} alignItems="center" className="sendMessageContainer">
      <Grid item xs={11.5}>
        <TextField
          multiline
          maxRows={4}
          fullWidth
          placeholder={TEXT[language].CHAT_INPUT_PLACEHOLDER}
          id="USERCHATINPUT"
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
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
          color={message.trim() !== "" ? "primary" : "default"}
        >
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default ChatInput;
