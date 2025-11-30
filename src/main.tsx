import React from 'react';
import { createRoot } from 'react-dom/client';
import "./global.css";
import App from './App';
import { AuthProvider } from  "./hooks/useAuth";
import "./firebase/firebaseConfig";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);