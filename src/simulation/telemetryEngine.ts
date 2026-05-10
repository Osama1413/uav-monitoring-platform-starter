import { HOME_POSITION, MISSION_WAYPOINTS, ROUTE_PATH } from '@/data/mission';
import type { FlightMode, MissionPhase, ScenarioId, SubsystemStatus, TelemetryFrame } from '@/types/telemetry';
import { bearingDegrees, clamp, distanceMeters, interpolatePoint, totalPathDistance } from '@/utils/geo';

export interface SimulationInput {
  elapsedSeconds: number;
  frameId: number;
  scenarioId: ScenarioId;
  commandMode?: FlightMode;
}

const MISSION_DURATION_SECONDS = 360;
const SEGMENT_COUNT = ROUTE_PATH.length - 1;
const SEGMENT_SECONDS = MISSION_DURATION_SECONDS / SEGMENT_COUNT;
const TOTAL_ROUTE_DISTANCE_M = totalPathDistance(ROUTE_PATH);

function phaseFromElapsed(elapsedSeconds: number, scenarioId: ScenarioId): MissionPhase {
  if (scenarioId === 'emergency-rth' && elapsedSeconds > 110 && elapsedSeconds < 310) return 'return-home';
  if (elapsedSeconds < 15) return 'pre-flight';
  if (elapsedSeconds < 45) return 'takeoff';
  if (elapsedSeconds < 75) return 'climb';
  if (elapsedSeconds < 230) return 'waypoint-tracking';
  if (elapsedSeconds < 270) return 'loiter';
  if (elapsedSeconds < 325) return 'return-home';
  if (elapsedSeconds < 350) return 'landing';
  return 'mission-complete';
}

function flightModeFromPhase(phase: MissionPhase, commandMode?: FlightMode): FlightMode {
  if (commandMode) return commandMode;

  switch (phase) {
    case 'pre-flight':
      return 'Assisted';
    case 'takeoff':
    case 'climb':
    case 'cruise':
    case 'waypoint-tracking':
    case 'loiter':
      return 'Mission';
    case 'return-home':
      return 'Return Home';
    case 'descent':
    case 'landing':
      return 'Landing';
    default:
      return 'Manual';
  }
}

function altitudeForPhase(elapsedSeconds: number, phase: MissionPhase): number {
  if (phase === 'pre-flight') return 0;
  if (phase === 'takeoff') return clamp((elapsedSeconds - 15) * 5.5, 0, 160);
  if (phase === 'climb') return clamp(160 + (elapsedSeconds - 45) * 4.6, 160, 300);
  if (phase === 'landing') return clamp(150 - (elapsedSeconds - 325) * 6, 0, 180);
  if (phase === 'mission-complete') return 0;
  if (phase === 'return-home') return 220 + Math.sin(elapsedSeconds / 8) * 12;
  return 290 + Math.sin(elapsedSeconds / 18) * 20;
}

function speedForPhase(elapsedSeconds: number, phase: MissionPhase): number {
  if (phase === 'pre-flight' || phase === 'mission-complete') return 0;
  if (phase === 'takeoff') return clamp((elapsedSeconds - 15) * 0.55, 0, 16);
  if (phase === 'landing') return clamp(18 - (elapsedSeconds - 325) * 0.55, 4, 18);
  if (phase === 'return-home') return 22 + Math.sin(elapsedSeconds / 9) * 1.8;
  return 24 + Math.sin(elapsedSeconds / 11) * 2.4;
}

function routePosition(elapsedSeconds: number, scenarioId: ScenarioId) {
  const effectiveElapsed = scenarioId === 'emergency-rth' && elapsedSeconds > 110 ? Math.min(320, elapsedSeconds + 70) : elapsedSeconds;
  const clampedElapsed = clamp(effectiveElapsed, 0, MISSION_DURATION_SECONDS - 1);
  const segmentIndex = Math.min(Math.floor(clampedElapsed / SEGMENT_SECONDS), SEGMENT_COUNT - 1);
  const segmentProgress = (clampedElapsed - segmentIndex * SEGMENT_SECONDS) / SEGMENT_SECONDS;
  const start = ROUTE_PATH[segmentIndex];
  const end = ROUTE_PATH[segmentIndex + 1];
  const position = interpolatePoint(start, end, segmentProgress);
  const headingDeg = bearingDegrees(position, end);
  const distanceToNextWaypointM = distanceMeters(position, end);
  const routeProgressPercent = clamp((clampedElapsed / MISSION_DURATION_SECONDS) * 100, 0, 100);

  return {
    position,
    headingDeg,
    waypointIndex: Math.min(segmentIndex + 1, MISSION_WAYPOINTS.length),
    routeProgressPercent,
    distanceToNextWaypointM,
  };
}

function scenarioBattery(elapsedSeconds: number, scenarioId: ScenarioId): number {
  const baseDrain = elapsedSeconds * 0.055;
  const extraDrain = scenarioId === 'low-battery' && elapsedSeconds > 90 ? (elapsedSeconds - 90) * 0.34 : 0;
  return clamp(100 - baseDrain - extraDrain, 3, 100);
}

function scenarioSignal(elapsedSeconds: number, scenarioId: ScenarioId): { signal: number; latencyMs: number } {
  let signal = 96 - elapsedSeconds * 0.035 + Math.sin(elapsedSeconds / 7) * 2;
  let latencyMs = 45 + Math.abs(Math.sin(elapsedSeconds / 13)) * 20;

  if (scenarioId === 'communication-loss' && elapsedSeconds > 80) {
    signal -= (elapsedSeconds - 80) * 0.55;
    latencyMs += (elapsedSeconds - 80) * 2.8;
  }

  return {
    signal: clamp(signal, 0, 100),
    latencyMs: Math.round(clamp(latencyMs, 40, 900)),
  };
}

function propulsionStatus(elapsedSeconds: number, scenarioId: ScenarioId): SubsystemStatus {
  if (scenarioId !== 'propulsion-issue' || elapsedSeconds < 95) return 'normal';
  if (elapsedSeconds > 165) return 'critical';
  return 'warning';
}

export function generateTelemetryFrame(input: SimulationInput): TelemetryFrame {
  const { elapsedSeconds, frameId, scenarioId, commandMode } = input;
  const phase = phaseFromElapsed(elapsedSeconds, scenarioId);
  const flightMode = flightModeFromPhase(phase, commandMode);
  const route = routePosition(elapsedSeconds, scenarioId);
  const altitudeM = altitudeForPhase(elapsedSeconds, phase);
  const airspeedMs = speedForPhase(elapsedSeconds, phase);
  const batteryPercent = scenarioBattery(elapsedSeconds, scenarioId);
  const signal = scenarioSignal(elapsedSeconds, scenarioId);
  const propulsion = propulsionStatus(elapsedSeconds, scenarioId);
  const gpsFault = scenarioId === 'gps-degradation' && elapsedSeconds > 75;
  const commLost = signal.signal < 18;

  const windOscillation = Math.sin(elapsedSeconds / 5);
  const propulsionPenalty = propulsion === 'critical' ? -6 : propulsion === 'warning' ? -2.5 : 0;
  const groundSpeedMs = clamp(airspeedMs + windOscillation + propulsionPenalty, 0, 32);
  const verticalSpeedMs =
    phase === 'takeoff' || phase === 'climb'
      ? 4.5 + Math.sin(elapsedSeconds / 3)
      : phase === 'landing'
        ? -3.8 + Math.sin(elapsedSeconds / 4) * 0.5
        : Math.sin(elapsedSeconds / 12) * 0.7;

  return {
    frameId,
    timestamp: new Date().toISOString(),
    elapsedSeconds,
    position: route.position,
    homePosition: HOME_POSITION,
    altitudeM: Math.round(altitudeM),
    gpsAltitudeM: Math.round(altitudeM + (gpsFault ? Math.sin(elapsedSeconds) * 18 : Math.sin(elapsedSeconds / 9) * 2)),
    barometricAltitudeM: Math.round(altitudeM + Math.sin(elapsedSeconds / 6) * 3),
    airspeedMs: Number(airspeedMs.toFixed(1)),
    groundSpeedMs: Number(groundSpeedMs.toFixed(1)),
    headingDeg: Math.round(route.headingDeg),
    rollDeg: Number((Math.sin(elapsedSeconds / 4) * (phase === 'loiter' ? 18 : 7)).toFixed(1)),
    pitchDeg: Number((phase === 'takeoff' || phase === 'climb' ? 8 + Math.sin(elapsedSeconds / 5) * 2 : Math.sin(elapsedSeconds / 8) * 3).toFixed(1)),
    yawDeg: Math.round(route.headingDeg),
    verticalSpeedMs: Number(verticalSpeedMs.toFixed(1)),
    batteryPercent: Number(batteryPercent.toFixed(1)),
    batteryVoltageV: Number((22.2 * (batteryPercent / 100) + 17.8 * (1 - batteryPercent / 100)).toFixed(2)),
    batteryCurrentA: Number((phase === 'takeoff' || phase === 'climb' ? 38 : 24 + Math.abs(Math.sin(elapsedSeconds / 10)) * 5).toFixed(1)),
    batteryTemperatureC: Number((31 + (100 - batteryPercent) * 0.08 + Math.abs(Math.sin(elapsedSeconds / 7)) * 2).toFixed(1)),
    signalStrengthPercent: Number(signal.signal.toFixed(1)),
    latencyMs: signal.latencyMs,
    gpsStatus: gpsFault ? (elapsedSeconds > 145 ? 'lost' : 'degraded') : 'valid',
    gpsSatellites: gpsFault ? Math.max(0, Math.round(12 - (elapsedSeconds - 75) * 0.08)) : 14,
    communicationStatus: commLost ? 'lost' : signal.signal < 50 ? 'degraded' : 'online',
    flightMode,
    missionPhase: phase,
    waypointIndex: route.waypointIndex,
    routeNumber: 1,
    payloadState: scenarioId === 'gps-degradation' && elapsedSeconds > 150 ? 'standby' : 'active',
    payloadMode: phase === 'loiter' ? 'Tracking' : 'Mapping',
    propulsionState: propulsion,
    throttlePercent: Number(clamp((phase === 'takeoff' ? 78 : 54) + Math.sin(elapsedSeconds / 6) * 7 + (propulsion !== 'normal' ? 12 : 0), 0, 100).toFixed(1)),
    rpm: Math.round(clamp(4200 + Math.sin(elapsedSeconds / 3) * 220 + (propulsion === 'critical' ? -1150 : propulsion === 'warning' ? -500 : 0), 0, 5400)),
    routeProgressPercent: Number(route.routeProgressPercent.toFixed(1)),
    distanceFromHomeM: Math.round(distanceMeters(route.position, HOME_POSITION)),
    distanceToNextWaypointM: Math.round(route.distanceToNextWaypointM),
    totalDistanceEstimateM: Math.round(TOTAL_ROUTE_DISTANCE_M),
  };
}
