import React, { useState, useRef, useEffect } from "react";
import { Container, Grid, Avatar } from "@mui/material";
import Attachment from "./Attachment";
import ChatInput from "./ChatInput";
import BotFileCheckReply from "./BotFileCheckReply";
import UserAvatar from "../Assets/UserAvatar.svg";
import StreamingResponse from "./StreamingResponse"; // Import StreamingResponse component
import createMessageBlock from "../utilities/createMessageBlock";

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

  const handleFileUploadComplete = (file, fileStatus) => {
    const newMessageBlock = createMessageBlock(
      `File uploaded: ${file.name}`,
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
          : fileStatus === "File size limit exceeded."
          ? "File size limit exceeded. Please upload a smaller file."
          : "Network Error. Please try again later.",
        "BOT",
        "FILE",
        "RECEIVED",
        file.name,
        fileStatus
      );
      setMessageList((prevList) => [...prevList, botMessageBlock]);
    }, 1000); // Simulate processing time
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
                <UserReply message={msg.message} />
              ) : msg.sentBy === "BOT" && msg.state === "PROCESSING" ? (
                <StreamingResponse initialMessage={msg.message} />
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
  setProcessing(false);
  // WebSocket connection and handling will be done by the StreamingResponse component
};
