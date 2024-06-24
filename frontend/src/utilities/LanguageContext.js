import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['language']);
  const [language, setLanguage] = useState(cookies.language || 'null');

  useEffect(() => {
    setCookie('language', language, { path: '/' });
  }, [language, setCookie]);

  const value = { language, setLanguage };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
