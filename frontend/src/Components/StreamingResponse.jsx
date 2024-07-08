import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grid, Avatar, Typography } from "@mui/material";
import BotAvatar from "../Assets/BotAvatar.svg";
import { WEBSOCKET_API } from "../utilities/constants";
import { useMessage } from "../contexts/MessageContext";
import createMessageBlock from "../utilities/createMessageBlock";

const StreamingMessage = ({ initialMessage, processing, setProcessing }) => {
  const [responses, setResponses] = useState([]);
  const ws = useRef(null);
  const messageBuffer = useRef("");
  const { messageList, addMessage } = useMessage();

  useEffect(() => {
    ws.current = new WebSocket(WEBSOCKET_API);

    ws.current.onopen = () => {
      console.log("WebSocket Connected");
      ws.current.send(
        JSON.stringify({
          action: "sendMessage",
          prompt: initialMessage,
          history: messageList,
        })
      );
      console.log("Initial message sent to bot");
      console.log("Message list: ", messageList);
    };

    ws.current.onmessage = (event) => {
      try {
        messageBuffer.current += event.data;
        const parsedData = JSON.parse(messageBuffer.current);

        if (parsedData.type === "end") {
          setProcessing(false);
          console.log("End of conversation");
        }

        if (parsedData.type === "delta") {
          setResponses((prev) => [...prev, parsedData.text]);
        }

        messageBuffer.current = "";
      } catch (e) {
        if (e instanceof SyntaxError) {
          console.log("Received incomplete JSON, waiting for more data...");
        } else {
          console.error("Error processing message: ", e);
          messageBuffer.current = "";
        }
      }
    };

    ws.current.onerror = (error) => {
      console.log("WebSocket Error: ", error);
    };

    ws.current.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `WebSocket closed cleanly, code=${event.code}, reason=${event.reason}`
        );
      } else {
        console.log("WebSocket Disconnected unexpectedly");
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [initialMessage, setProcessing]);

  useEffect(() => {
    if (!processing) {
      const finalMessage = responses.join("");
      const botMessageBlock = createMessageBlock(
        finalMessage,
        "BOT",
        "TEXT",
        "SENT"
      );
      addMessage(botMessageBlock);
      console.log("Bot message added to message list");
      console.log("Message list: ", messageList);
    }
  }, [processing]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-end"
    >
      <Grid item>
        <Avatar alt="Bot Avatar" src={BotAvatar} />
      </Grid>
      <Grid
        item
        className="botMessage"
        sx={{ backgroundColor: (theme) => theme.palette.background.botMessage }}
      >
        <Typography variant="body2">{responses.join("")}</Typography>
      </Grid>
    </Grid>
  );
};

export default StreamingMessage;
