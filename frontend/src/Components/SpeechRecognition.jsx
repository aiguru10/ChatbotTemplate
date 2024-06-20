import React, { useState, useEffect, useRef } from "react";
import IconButton from '@mui/material/IconButton';
import MicIcon from '@mui/icons-material/Mic';
import { styled, keyframes } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { useLanguage } from '../utilities/LanguageContext'; // Adjust the import path as needed
import { TEXT } from '../utilities/constants'; // Adjust the import path as needed
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(231, 176, 12, 0.4);
  }
  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 10px rgba(231, 176, 12, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(231, 176, 12, 0);
  }
`;

const MicButton = styled(IconButton)(({ theme, listening }) => ({
  borderRadius: '50%',
  marginLeft: '8px',
  padding: '0.5rem',
  height: '3.5rem',
  width: '3.5rem',
  minWidth: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
  '& .MuiSvgIcon-root': {
    animation: listening ? `${pulse} 1.5s infinite` : 'none',
    color: listening ? theme.palette.primary.main : theme.palette.text.primary,
  },
}));

function SpeechRecognitionComponent({ setMessage, getMessage }) {
  const { language } = useLanguage(); // Use the language context
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef(""); // To accumulate final transcripts

  useEffect(() => {
    if (!SpeechRecognition) {
      console.error("SpeechRecognition API not supported in this browser.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language === 'ES' ? 'es-ES' : 'en-US'; // Set language based on context

    recognition.onresult = (event) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += transcript + " ";
          const currentMessage = getMessage();
          setMessage(currentMessage + finalTranscriptRef.current.trim());
        } else {
          interimTranscript += transcript;
        }
      }

      console.log("Interim Transcript: ", interimTranscript);
      console.log("Final Transcript: ", finalTranscriptRef.current);
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in recognition: " + event.error);
      setListening(false); // Reset listening state on error
    };

    recognition.onend = () => {
      console.log("Recognition ended");
    };

    return () => {
      recognition.stop();
    };
  }, [setMessage, getMessage, language]); // Reinitialize on language change

  const toggleListen = () => {
    const recognition = recognitionRef.current;

    if (!recognition) {
      return;
    }

    if (listening) {
      recognition.stop();
      console.log("Recognition stopped");
      finalTranscriptRef.current = ""; // Reset final transcript on stop
    } else {
      finalTranscriptRef.current = ""; // Reset final transcript on start
      recognition.start();
      console.log("Recognition started");
    }
    setListening(!listening);
  };

  useEffect(() => {
    // Reset finalTranscriptRef when message is cleared
    if (!getMessage()) {
      finalTranscriptRef.current = "";
    }
  }, [getMessage]);

  return (
    <Tooltip title={listening ? TEXT[language].SPEECH_RECOGNITION_STOP : TEXT[language].SPEECH_RECOGNITION_START}>
      <MicButton
        listening={listening ? 1 : 0}
        onClick={toggleListen}
      >
        <MicIcon />
      </MicButton>
    </Tooltip>
  );
}

export default SpeechRecognitionComponent;
