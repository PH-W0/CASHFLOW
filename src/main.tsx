import React from 'react';
import { createRoot } from 'react-dom/client';
import "./global.css";
import App from './App';
import "./firebase/firebaseConfig";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);
