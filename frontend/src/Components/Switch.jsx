import React from 'react';
import { useLanguage } from '../utilities/LanguageContext'; // Adjust the import path
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import { Box } from '@mui/material';
import Flag from 'react-world-flags';

export default function BasicButtonGroup() {
  const { language, setLanguage } = useLanguage();

  return (
    <Box>
      <ButtonGroup variant="contained" aria-label="Language button group">
        <Tooltip title="Language" arrow>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setLanguage('EN');
            }}
            variant={language === 'EN' ? 'contained' : 'outlined'}
          >
            <Flag code="GB" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            English
          </Button>
        </Tooltip>
        <Tooltip title="Language" arrow>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setLanguage('ES');
            }}
            variant={language === 'ES' ? 'contained' : 'outlined'}
          >
            <Flag code="ES" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            Español
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Box>
  );
}
