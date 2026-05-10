# UAV Monitoring Platform Starter

A browser-accessible, desktop-style UAV ground monitoring and supervisory control starter built with React, TypeScript, Tailwind CSS, React Router, Leaflet, and Recharts.

This is a **software-only simulated platform**. It does not connect to physical UAV hardware. The application simulates telemetry, derives subsystem health, generates warnings/advisories, logs frames/events, and provides starter screens for mission display, replay, and post-mission analysis.

## Features included

- Vite + React + TypeScript + Tailwind CSS project setup
- Route-based application structure
- Professional dark dashboard layout
- Main flight display with attitude, compass, metrics, warnings, and command panel
- Mission map page using React Leaflet
- Telemetry model and simulation engine
- Scenario switching: normal, low battery, GPS degradation, communication loss, propulsion issue, emergency return-home
- Rule-based warnings and subsystem health evaluation
- Logging store for telemetry frames and events
- Replay page starter
- Analysis page with Recharts trends
- Payload and datalink page starter
- Modular folder structure ready for expansion

## Requirements

Use a recent Node.js version supported by Vite. Vite's current docs recommend Node.js 20.19+ or 22.12+.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

## Build for deployment

```bash
npm run build
npm run preview
```

The production output will be generated in `dist/` and can be deployed to Vercel, Netlify, GitHub Pages, or any static hosting provider.

## Project structure

```text
src/
  app/                 Router and shell layout
  components/          Reusable UI, flight, health, map, warning, chart, and control components
  data/                Static route/mission data
  hooks/               Application hooks
  pages/               Route-level screens
  simulation/          Simulation engine, scenarios, warning rules, health rules
  state/               Telemetry provider and global state
  styles/              Tailwind entry CSS
  types/               Telemetry, mission, warning, and health TypeScript models
  utils/               Formatting and geospatial helpers
```

## Next implementation steps

1. Replace starter map route with your actual mission area.
2. Expand scenario definitions and fault injections.
3. Add real mission log persistence using IndexedDB or a backend API.
4. Implement complete replay controls using recorded frames.
5. Add supervisor-ready deployment with Vercel or Netlify.
6. Add automated tests for the telemetry engine and health/warning rules.

## Validation completed in this starter package

The generated starter was validated with:

```bash
npm run typecheck
npm run build
```

Both commands completed successfully before packaging. The production build warning about bundle size is expected because Leaflet and Recharts are included in the starter; code splitting can be added later when the application grows.
