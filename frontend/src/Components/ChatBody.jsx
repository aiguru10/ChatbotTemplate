import React, { useState, useRef, useEffect } from "react";
import { Container, Typography, TextField, Grid, Avatar, IconButton } from "@mui/material";
import { APP_ASSISTANT_NAME } from "../utilities/constants";
import UserAvatar from "../Assets/UserAvatar.svg";
import BotAvatar from "../Assets/BotAvatar.svg";
import SendIcon from "@mui/icons-material/Send";

import createMessageBlock from "../utilities/createMessageBlock";

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
      getBotResponse(setMessageList, setProcessing);
    } else {
      setHelperText("Cannot send empty message");
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid container spacing={3} direction="row" justifyContent="flex-end" alignItems="stretch" item xs={12} className="chatScrollContainer">
          {messageList.map((msg, index) => (
            <Grid item xs={12} key={index}>
              {msg.sentBy === "USER" ? <UserReply message={msg.message} state={msg.state} /> : <BotReply message={msg.message} state={msg.state} />}
            </Grid>
          ))}
          <div ref={messagesEndRef} />
        </Grid>
        <Grid item xs="12" container direction="row" justifyContent="flex-start" alignItems="center" className="sendMessageContainer">
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
              onClick={(e) => {
                handleSendMessage();
              }}
            >
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatBody;

function BotReply({ message }) {
  return (
    <>
      <Grid container direction="row" justifyContent="flex-start" alignItems="flex-end">
        <Grid item>
          <Avatar alt={APP_ASSISTANT_NAME} src={BotAvatar} />
        </Grid>
        <Grid item className="botMessage">
          {message}
        </Grid>
      </Grid>
    </>
  );
}

function UserReply({ message }) {
  return (
    <>
      <Grid container direction="row" justifyContent="flex-end" alignItems="flex-end">
        <Grid item className="userMessage">
          {message}
        </Grid>
        <Grid item>
          <Avatar alt={"User Profile Pic"} src={UserAvatar} />
        </Grid>
      </Grid>
    </>
  );
}

const getBotResponse = (setMessageList, setProcessing) => {
  setProcessing(true);
  const botMessageBlock = createMessageBlock("Processing your request...", "BOT", "TEXT", "PROCESSING");
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
