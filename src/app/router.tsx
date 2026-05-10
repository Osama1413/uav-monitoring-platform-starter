import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './AppShell';
import { MainFlightDisplay } from '@/pages/MainFlightDisplay';
import { MapMissionPage } from '@/pages/MapMissionPage';
import { WarningsPage } from '@/pages/WarningsPage';
import { HealthPage } from '@/pages/HealthPage';
import { SystemsPage } from '@/pages/SystemsPage';
import { PayloadDatalinkPage } from '@/pages/PayloadDatalinkPage';
import { ReplayPage } from '@/pages/ReplayPage';
import { AnalysisPage } from '@/pages/AnalysisPage';
import { NotFound } from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/flight" replace /> },
      { path: 'flight', element: <MainFlightDisplay /> },
      { path: 'mission', element: <MapMissionPage /> },
      { path: 'warnings', element: <WarningsPage /> },
      { path: 'health', element: <HealthPage /> },
      { path: 'systems', element: <SystemsPage /> },
      { path: 'payload-datalink', element: <PayloadDatalinkPage /> },
      { path: 'replay', element: <ReplayPage /> },
      { path: 'analysis', element: <AnalysisPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
