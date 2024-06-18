import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EnglishIcon from '../Assets/EnglishIcon.svg'; // Ensure this path is correct
import SpanishIcon from '../Assets/SpanishIcon.svg'; // Ensure this path is correct
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url(${SpanishIcon})`,
        backgroundSize: '16px', // Adjust size
        backgroundPosition: 'center', // Center the icon
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#6D6D6D',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#E7B00C',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '16px', // Adjust size
      backgroundImage: `url(${EnglishIcon})`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#6D6D6D',
    borderRadius: 20 / 2,
  },
}));

export default function CustomizedSwitches() {
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" p={2}>
      <Typography sx={{ mx: 1 }}>English</Typography>
      <MaterialUISwitch defaultChecked />
      <Typography sx={{ mx: 1 }}>Spanish</Typography>
    </Box>
  );
}
