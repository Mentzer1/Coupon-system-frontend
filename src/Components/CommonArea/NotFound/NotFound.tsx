import "./NotFound.css";
import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';


export function NotFound(): JSX.Element {
    return (
        <div className="NotFound">
			<Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h2" sx={{ marginBottom: 2 }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 3 }}>
        Looks like you're trying to find something that doesn't exist.
        <br />
        Maybe it's hiding, or maybe it's on vacation. Who knows?
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ padding: '10px 20px' }}
      >
        Go Home
      </Button>
    </Box>
        </div>
    );
}
