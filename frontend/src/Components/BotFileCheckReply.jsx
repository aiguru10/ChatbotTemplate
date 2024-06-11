import React, { useState, useEffect } from 'react';
import { Grid, Avatar, Typography, CircularProgress } from '@mui/material';
import BotAvatar from '../Assets/BotAvatar.svg';
import PdfIcon from '../Assets/pdf_logo.svg';

function BotFileCheckReply({ message, fileName, fileStatus, messageType }) {
  const messageAlignment = 'flex-start';
  const messageBgColor = '#E1EBFF';

  const [animationState, setAnimationState] = useState('checking');

  useEffect(() => {
    let timeout;
    if (animationState === 'checking' && fileStatus === 'File page limit check succeeded.') {
      timeout = setTimeout(() => setAnimationState('success'), 1000);
    }
    return () => clearTimeout(timeout);
  }, [animationState, fileStatus]);

  const isFileUploadSuccess = fileStatus === 'File page limit check succeeded.';

  return (
    <Grid container direction="row" justifyContent={messageAlignment} alignItems="center">
      <Grid item>
        <Avatar alt="Bot Avatar" src={BotAvatar} />
      </Grid>
      <Grid item style={{ background: messageBgColor, borderRadius: 20, padding: 10, marginLeft: 5 }}>
        {fileStatus ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src={PdfIcon} alt="PDF Icon" style={{ width: 40, height: 40, borderRadius: '50%' }} />
              <Typography>{fileName}</Typography>
            </div>
            <div className={`file-status-box ${animationState === 'success' ? 'success' : ''}`}>
              <Typography>
                {animationState === 'checking' ? 'Checking file size...' : 'File page limit check succeeded.'}
              </Typography>
              {animationState === 'checking' && <CircularProgress size={24} className="loading" />}
            </div>
            {isFileUploadSuccess && animationState === 'success' && (
              <Typography style={{ marginTop: '4px'}}>
                File uploaded successfully
              </Typography>
            )}
          </div>
        ) : (
          <Typography>{message}</Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default BotFileCheckReply;
