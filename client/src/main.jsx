import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import('preline')
import { ThemeProvider } from "@material-tailwind/react";
import AppContext from './Context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <ThemeProvider>
      <AppContext>

      <App />
      </AppContext>
    </ThemeProvider>
    </BrowserRouter>
    
);


