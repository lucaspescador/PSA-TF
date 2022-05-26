import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';

import Router from './routes';
import appTheme from './theme';
import Header from './components/Header';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Container>
          <Router />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
