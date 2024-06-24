import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Box, Button, ButtonGroup, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const LandingPage = ({ onLanguageSelect }) => {
  const [language, setLanguage] = useState('EN');
  const [, setCookie] = useCookies(['language']);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleSaveLanguage = () => {
    setCookie('language', language, { path: '/' });
    onLanguageSelect(language);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4" gutterBottom>
        Choose language:
      </Typography>
      <RadioGroup value={language} onChange={handleLanguageChange}>
        <FormControlLabel value="EN" control={<Radio />} label="English" />
        <FormControlLabel value="ES" control={<Radio />} label="Español" />
      </RadioGroup>
      <Button variant="contained" onClick={handleSaveLanguage}>
        Save and Continue
      </Button>
    </Box>
  );
};

export default LandingPage;
