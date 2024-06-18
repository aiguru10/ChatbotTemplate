import React, { useState, useRef, useEffect } from "react";
import { Container, Grid, Avatar, Typography } from "@mui/material";
import ChatInput from "./ChatInput";
import UserAvatar from "../Assets/UserAvatar.svg";
import createMessageBlock from "../utilities/createMessageBlock"; 
import StreamingResponse from "./StreamingResponse"; 
function ChatBody() {
  const [messageList, setMessageList] = useState([]);
  const [processing, setProcessing] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = (message) => {
    const newMessageBlock = createMessageBlock(message, "USER", "TEXT", "SENT");
    setMessageList([...messageList, newMessageBlock]);
    getBotResponse(setMessageList, setProcessing, message);
  };

  return (
    <Container maxWidth="md" className="appHeight100">
      <Grid container spacing={2} justifyContent={"space-between"} className="appHeight100" sx={{ mt: 4 }}>
        <Grid
          container
          spacing={3}
          direction="row"
          item
          xs={12}
          className="chatScrollContainer"
        >
          {messageList.map((msg, index) => (
            <Grid item xs={12} key={index}>
              {msg.sentBy === "USER" ? (
                <UserReply message={msg.message} state={msg.state} />
              ) : (
                <StreamingResponse initialMessage={msg.message} />
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
          justifyContent="flex-end"
          alignItems="end"
          sx={{ mb: 10 }}
        >
          <ChatInput onSendMessage={handleSendMessage} processing={processing} />
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
        <Typography variant='body2'>{message}</Typography>
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
    message,
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
        message: message,
        state: "RECEIVED",
      };
      setProcessing(false);
      return updatedList;
    });
  }, 3000);
};
