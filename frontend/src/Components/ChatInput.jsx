import React, { useState, useRef, useEffect } from "react";
import { TextField, Grid, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useLanguage } from "../contexts/LanguageContext";
import { TEXT } from "../utilities/constants";
import { useTranscript } from "../contexts/TranscriptContext";

function ChatInput({ onSendMessage, processing }) {
  const [message, setMessage] = useState("");
  const [helperText, setHelperText] = useState("");
  const { language } = useLanguage();
  const { transcript, setTranscript, isListening } = useTranscript();

  const [finalTranscript, setFinalTranscript] = useState("");

  const isAppendingRef = useRef(false);

  useEffect(() => {
    if (isListening && transcript) {
      setFinalTranscript(transcript);
    }

    if (!isListening && transcript) {
      if (!isAppendingRef.current) {
        isAppendingRef.current = true;
        setMessage(prevMessage => prevMessage ? `${prevMessage} ${finalTranscript}` : finalTranscript);
        setTranscript(""); // Clear the transcript buffer
        setFinalTranscript(""); // Clear the final transcript
        isAppendingRef.current = false;
      }
    }
  }, [isListening, transcript, finalTranscript, setTranscript]);

  // useEffect(() => {
  //   if (!isListening && transcript) {
  //     console.log("Use Effect", `${message} ${transcript}`)
  //     console.log("Use Effect - transcript:",isListening, transcript);
  //     setMessage(prevMessage => prevMessage ? `${prevMessage} ${transcript}` : transcript);
  //     setTranscript(""); // Clear the transcript buffer
  //   }
  // }, [isListening, transcript, setTranscript]);

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

  const getMessage = (message, transcript, isListening) => {
    if (isListening) {
      if (transcript.length) {
        // console.log("Get message", message.length ? `${message} ${transcript}` : transcript)
        return message.length ? `${message} ${transcript}` : transcript;
      }
    }
    return message;
  };

  return (
    <Grid container item xs={12} alignItems="center" className="sendMessageContainer">
      <Grid item xs={11.5}>
        <TextField
          multiline
          maxRows={4}
          fullWidth
          disabled={isListening}
          placeholder={TEXT[language].CHAT_INPUT_PLACEHOLDER}
          id="USERCHATINPUT"
          value={getMessage(message, transcript, isListening)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !processing) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          onChange={handleTyping}
          helperText={isListening ? TEXT[language].SPEECH_RECOGNITION_HELPER_TEXT : helperText}
          sx={{ "& fieldset": { border: "none" } }}
        />
      </Grid>
      <Grid item xs={0.5}>
        <IconButton
          aria-label="send"
          disabled={processing || isListening}
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
