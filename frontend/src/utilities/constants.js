// --------------------------------------------------------------------------------------------------------//
// Primary color constants for the theme
export const PRIMARY_MAIN = "#E7B00C"; // The main primary color used for buttons, highlights, etc.

// Background color constants
export const SECONDARY_MAIN = "#FFFFF0"; // The main secondary color used for less prominent elements

// Chat component background colors
export const CHAT_BODY_BACKGROUND = "#FFFFFF"; // Background color for the chat body area
export const CHAT_LEFT_PANEL_BACKGROUND = "#E7B00C"; // Background color for the left panel in the chat
export const HEADER_BACKGROUND = "#FFFFFF"; // Background color for the header
export const HEADER_TEXT_GRADIENT = "linear-gradient(89.84deg, #000000 6.14%, #E7B00C 36.64%);";
// Message background colors
export const BOTMESSAGE_BACKGROUND = "#F5F5F5"; // Background color for messages sent by the bot
export const USERMESSAGE_BACKGROUND = "#FFEFCA"; // Background color for messages sent by the user

// --------------------------------------------------------------------------------------------------------//
// --------------------------------------------------------------------------------------------------------//

// Text Constants
export const TEXT = {
    EN: {
      APP_NAME: "Kelvyn Park",
      APP_ASSISTANT_NAME: "Kelvyn Park GenAI Bot",
      ABOUT_US_TITLE: "About us",
      ABOUT_US: "Welcome to the Kelvyn Park GenAI chat bot! We're here to assist to quickly access relevant information.",
      FAQ_TITLE: "Frequently Asked Questions",
      FAQS: [
        "What are the school hours?",
        "What core values does the school have?",
        "What academic programs are offered?",
        "What sports are offered at the school?",
        "How do I get involved in the school?"
      ],
      CHAT_HEADER_TITLE: "Kelvyn Park AI Chat Assistant",
      CHAT_INPUT_PLACEHOLDER: "Type a Query...",
      HELPER_TEXT: "Cannot send empty message",
    },
    ES: {
      APP_NAME: "Kelvyn Park",
      APP_ASSISTANT_NAME: "Bot GenAI de Kelvyn Park",
      ABOUT_US_TITLE: "Acerca de nosotros",
      ABOUT_US: "¡Bienvenido al chatbot GenAI de Kelvyn Park! Estamos aquí para ayudarle a acceder rápidamente a la información relevante.",
      FAQ_TITLE: "Preguntas frecuentes",
      FAQS: [
        "¿Cuáles son los horarios escolares?",
        "¿Cuáles son los valores fundamentales de la escuela?",
        "¿Qué programas académicos se ofrecen?",
        "¿Qué deportes se ofrecen en la escuela?",
        "¿Cómo puedo involucrarme en la escuela?"
      ],
      CHAT_HEADER_TITLE: "Asistente de Chat AI de Kelvyn Park",
      CHAT_INPUT_PLACEHOLDER: "Escribe una consulta...",
      HELPER_TEXT: "No se puede enviar un mensaje vacío",
    }
  };
  
// --------------------------------------------------------------------------------------------------------//
// --------------------------------------------------------------------------------------------------------//

// API endpoints
export const CHAT_API = "https://v1npsugq9g.execute-api.us-west-2.amazonaws.com/dev/upload"; // URL for the chat API endpoint
export const WEBSOCKET_API = "wss://p41tv6njhg.execute-api.us-west-2.amazonaws.com/production/"; // URL for the WebSocket API endpoint

// --------------------------------------------------------------------------------------------------------//
// --------------------------------------------------------------------------------------------------------//

// Features
export const ALLOW_FILE_UPLOAD = true;
