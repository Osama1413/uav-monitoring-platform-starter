import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './styles/index.css';
import { router } from './app/router';
import { TelemetryProvider } from './state/TelemetryProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TelemetryProvider>
      <RouterProvider router={router} />
    </TelemetryProvider>
  </React.StrictMode>,
);
