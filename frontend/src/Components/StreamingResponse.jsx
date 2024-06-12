import React, { useState, useEffect, useRef } from 'react';
import { Grid, Avatar, Typography, CircularProgress } from '@mui/material';
import BotAvatar from '../Assets/BotAvatar.svg';
import { websocket_API } from '../utilities/constants';

const StreamingMessage = ({ initialMessage }) => {
  const [responses, setResponses] = useState([]);
  const [completed, setCompleted] = useState(false);
  const ws = useRef(null);
  const messageBuffer = useRef('');  // Buffer to hold incomplete JSON strings

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket(websocket_API);

    ws.current.onopen = () => {
      console.log('WebSocket Connected');
      // Send initial message
      ws.current.send(JSON.stringify({ action: "sendMessage", prompt: initialMessage }));
    };

    ws.current.onmessage = (event) => {
      try {
        messageBuffer.current += event.data; // Append new data to buffer
        const parsedData = JSON.parse(messageBuffer.current); // Try to parse the full buffer
        if (parsedData.type === 'delta') {
          setResponses(prev => [...prev, parsedData.text]);
        }
        messageBuffer.current = ''; // Clear buffer on successful parse
      } catch (e) {
        if (e instanceof SyntaxError) {
          console.log('Received incomplete JSON, waiting for more data...');
        } else {
          console.error('Error processing message:', e);
          messageBuffer.current = ''; // Clear buffer if error is not related to JSON parsing
        }
      }
    };

    ws.current.onerror = (error) => {
      console.log('WebSocket Error: ', error);
    };

    ws.current.onclose = () => {
      console.log('WebSocket Disconnected');
      setCompleted(true);
    };

    return () => {
      ws.current.close();
    };
  }, [initialMessage]);

  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="center">
      <Grid item>
        <Avatar alt="Bot Avatar" src={BotAvatar} />
      </Grid>
      <Grid item className="botMessage" >
        <Typography>
          {responses.join('')}
        </Typography>
        {!completed && <CircularProgress size={24} className="loading" />}
      </Grid>
    </Grid>
  );
};

export default StreamingMessage;
