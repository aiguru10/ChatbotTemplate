import React, { useState, useRef, useEffect } from "react";
import { Container, TextField, Grid, Avatar, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import createMessageBlock from "../utilities/createMessageBlock";
import Attachment from "./Attachment";
import BotFileCheckReply from "./BotFileCheck";
import UserAvatar from "../Assets/UserAvatar.svg";

function ChatBody() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [helperText, setHelperText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessageBlock = createMessageBlock(message, "USER", "TEXT", "SENT");
      setMessageList([...messageList, newMessageBlock]);
      setMessage("");
      getBotResponse(setMessageList, setProcessing, message);
    } else {
      setHelperText("Cannot send empty message");
    }
  };

  const handleFileUploadComplete = (file) => {
    const fileSizeLimit = 5 * 1024 * 1024; // 5 MB limit
    const fileStatus = file.size <= fileSizeLimit ? "File page limit check succeeded." : "File size limit exceeded.";
    
    const newMessageBlock = createMessageBlock(
      "File uploaded: " + file.name,
      "USER",
      "FILE",
      "SENT",
      file.name,
      fileStatus
    );
    setMessageList((prevList) => [...prevList, newMessageBlock]);

    setTimeout(() => {
      const botMessageBlock = createMessageBlock(
        fileStatus === "File page limit check succeeded." 
          ? "Checking file size."
          : "File size limit exceeded. Please upload a smaller file.",
        "BOT",
        "FILE",
        "RECEIVED",
        file.name,
        fileStatus
      );
      setMessageList((prevList) => [...prevList, botMessageBlock]);
    }, 1000);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="flex-end"
          alignItems="stretch"
          item
          xs={12}
          className="chatScrollContainer"
        >
          {messageList.map((msg, index) => (
            <Grid item xs={12} key={index}>
              {msg.sentBy === "USER" ? (
                <UserReply message={msg.message} state={msg.state} />
              ) : (
                <BotFileCheckReply
                  message={msg.message}
                  fileName={msg.fileName}
                  fileStatus={msg.fileStatus}
                  messageType={msg.sentBy === "USER" ? "user_doc_upload" : "bot_response"}
                />
              )}
            </Grid>
          ))}
          <div ref={messagesEndRef} />
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid container item xs={2} sx={{ mt: 2 }}>
            <Attachment onFileUploadComplete={handleFileUploadComplete} />
          </Grid>
          <Grid container item xs={10} alignItems="center" className="sendMessageContainer">
            <Grid item xs={11.5}>
              <TextField
                multiline
                maxRows={4}
                fullWidth
                id="USERCHATINPUT"
                value={message}
                onChange={(event) => {
                  if (helperText) {
                    setHelperText("");
                  }
                  setMessage(event.target.value);
                }}
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
              >
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatBody;

function UserReply({ message }) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="flex-end"
    >
      <Grid item className="userMessage">
        {message}
      </Grid>
      <Grid item>
        <Avatar alt={"User Profile Pic"} src={UserAvatar} />
      </Grid>
    </Grid>
  );
}

const getBotResponse = (setMessageList, setProcessing, message) => {
  setProcessing(true);
  const botMessageBlock = createMessageBlock(
    "Processing your request...",
    "BOT",
    "TEXT",
    "PROCESSING"
  );
  setMessageList((prevList) => [...prevList, botMessageBlock]);
  setTimeout(() => {
    setMessageList((prevList) => {
      const updatedList = [...prevList];
      const lastMessageIndex = updatedList.length - 1;
      updatedList[lastMessageIndex] = {
        ...updatedList[lastMessageIndex],
        message: "Here's the information you requested.",
        state: "RECEIVED",
      };
      setProcessing(false);
      return updatedList;
    });
  }, 3000);
};
