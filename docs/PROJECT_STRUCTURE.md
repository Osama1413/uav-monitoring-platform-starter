# Project Structure

```text
uav-monitoring-platform-starter/
  index.html
  package.json
  vite.config.ts
  tsconfig.json
  eslint.config.js
  src/
    main.tsx
    app/
      AppShell.tsx
      router.tsx
    components/
      charts/TrendChart.tsx
      controls/CommandPanel.tsx
      flight/AttitudeIndicator.tsx
      flight/Compass.tsx
      flight/FlightDataStrip.tsx
      health/HealthGrid.tsx
      layout/Sidebar.tsx
      layout/TopBar.tsx
      map/MissionMap.tsx
      ui/Gauge.tsx
      ui/MetricCard.tsx
      ui/Panel.tsx
      ui/StatusPill.tsx
      warnings/WarningList.tsx
    data/
      mission.ts
    hooks/
      useTelemetry.ts
    pages/
      MainFlightDisplay.tsx
      MapMissionPage.tsx
      WarningsPage.tsx
      HealthPage.tsx
      SystemsPage.tsx
      PayloadDatalinkPage.tsx
      ReplayPage.tsx
      AnalysisPage.tsx
      NotFound.tsx
    simulation/
      scenarios.ts
      telemetryEngine.ts
      health.ts
      warnings.ts
    state/
      TelemetryProvider.tsx
    styles/
      index.css
    types/
      telemetry.ts
    utils/
      format.ts
      geo.ts
```

## Route map

- `/flight` — Main flight display
- `/mission` — Map and mission display
- `/warnings` — Warnings, cautions, advisories, and event history
- `/health` — Subsystem health summary
- `/systems` — Engineering/detail system panels
- `/payload-datalink` — Payload and datalink status
- `/replay` — Logging and replay starter
- `/analysis` — Post-mission analysis charts and summary

## Core data flow

1. `TelemetryProvider` stores active scenario, elapsed time, command mode, log frames, and events.
2. `generateTelemetryFrame()` creates one simulated telemetry frame per second.
3. `evaluateWarnings()` converts telemetry conditions into warning/caution/advisory messages.
4. `evaluateHealth()` converts telemetry conditions into subsystem health states.
5. Page components consume the shared telemetry state through `useTelemetry()`.
