# Software Development Plan

## Phase 1 — Foundation

- Confirm the UI structure and route list.
- Finalize the telemetry data model in `src/types/telemetry.ts`.
- Expand the mission route in `src/data/mission.ts` to match the demonstration area.
- Keep the simulation engine deterministic enough for supervisor demonstrations.

## Phase 2 — Simulation Engine

- Improve phase transitions and waypoint behavior.
- Add configurable route files.
- Add richer fault injection definitions.
- Add deterministic seed support for repeatable demonstrations.

## Phase 3 — Dashboard and Operator Interface

- Improve flight instrument visuals.
- Add dedicated warning counters and active alert filtering.
- Add screen mode switching.
- Improve responsive behavior for projector and laptop screens.

## Phase 4 — Map and Mission

- Add mission trail history.
- Add route editing or route upload.
- Add map layer selector.
- Add no-internet fallback with a schematic map.

## Phase 5 — Logging and Replay

- Store mission logs in IndexedDB or backend storage.
- Implement true replay mode where all UI screens read from recorded frames.
- Add play, pause, step, restart, and speed controls.
- Add log import/export using JSON and CSV.

## Phase 6 — Analysis

- Add warning/event timeline chart.
- Add min/max/average summary statistics.
- Add waypoint completion report.
- Add downloadable post-mission report.

## Phase 7 — Deployment

- Build the production bundle with `npm run build`.
- Deploy to Vercel, Netlify, GitHub Pages, or university hosting.
- Add project report screenshots from the deployed version.
