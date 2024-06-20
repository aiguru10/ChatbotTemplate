import React, { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import MicIcon from '@mui/icons-material/Mic';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

function SpeechRecognitionComponent({ setMessage }) {
  const [listening, setListening] = useState(false);

  useEffect(() => {
    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      if (interimTranscript) {
        setMessage(interimTranscript);
      }

      if (finalTranscript) {
        setMessage(finalTranscript.trim());
      }

      console.log("Interim Transcript: ", interimTranscript);
      console.log("Final Transcript: ", finalTranscript);
    };

    recognition.onerror = (event) => {
      console.log("Error occurred in recognition: " + event.error);
    };

    recognition.onend = () => {
      console.log("Recognition ended");
      setListening(false); // Ensure listening state is updated correctly
    };
  }, [setMessage]);

  const toggleListen = () => {
    setListening((prevState) => {
      const newState = !prevState;
      handleListen(newState);
      return newState;
    });
  };

  const handleListen = (shouldListen) => {
    if (shouldListen) {
      recognition.start();
      console.log("Recognition started");
    } else {
      recognition.stop();
      console.log("Recognition stopped");
    }
  };

  return (
    <IconButton
      color={listening ? "secondary" : "primary"}
      onClick={toggleListen}
    >
      <MicIcon />
    </IconButton>
  );
}

export default SpeechRecognitionComponent;
