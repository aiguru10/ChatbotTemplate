import React from 'react';
import { useLanguage } from '../utilities/LanguageContext'; // Adjust the import path
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function BasicButtonGroup() {
  const { language, setLanguage } = useLanguage();

  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button
        onClick={(e) => {
          e.preventDefault();
          setLanguage('EN');
        }}
        variant={language === 'EN' ? 'contained' : 'outlined'}
      >
        En
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          setLanguage('ES');
        }}
        variant={language === 'ES' ? 'contained' : 'outlined'}
      >
        Es
      </Button>
    </ButtonGroup>
  );
}
