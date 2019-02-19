import React, { Component } from 'react';
import './styles.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../../theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../../routes/Layout';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <div className="app-wrapper">
    <div className="login-wrapper" />
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </MuiThemeProvider>
  </div>
);

export default App;
