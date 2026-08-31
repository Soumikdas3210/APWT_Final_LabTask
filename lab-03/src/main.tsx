import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { StudentProvider } from './context/StudentContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <StudentProvider>
        <App />
      </StudentProvider>
    </ThemeProvider>
  </React.StrictMode>
);