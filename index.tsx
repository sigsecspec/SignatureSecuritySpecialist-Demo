
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { MissionProvider } from './context/MissionContext';
import { NotificationProvider } from './context/NotificationContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <NotificationProvider>
      <AuthProvider>
        <MissionProvider>
          <App />
        </MissionProvider>
      </AuthProvider>
    </NotificationProvider>
  </React.StrictMode>
);