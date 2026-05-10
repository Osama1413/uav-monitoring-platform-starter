export type MissionPhase =
  | 'idle'
  | 'pre-flight'
  | 'takeoff'
  | 'climb'
  | 'cruise'
  | 'waypoint-tracking'
  | 'loiter'
  | 'return-home'
  | 'descent'
  | 'landing'
  | 'mission-complete';

export type FlightMode = 'Manual' | 'Assisted' | 'Mission' | 'Hold' | 'Return Home' | 'Landing';

export type ScenarioId =
  | 'normal'
  | 'low-battery'
  | 'gps-degradation'
  | 'communication-loss'
  | 'propulsion-issue'
  | 'emergency-rth';

export type LinkStatus = 'online' | 'degraded' | 'lost';
export type GpsStatus = 'valid' | 'degraded' | 'lost';
export type SubsystemStatus = 'normal' | 'warning' | 'critical' | 'offline';
export type AlertSeverity = 'warning' | 'caution' | 'advisory';

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface MissionWaypoint extends GeoPoint {
  id: number;
  name: string;
  targetAltitudeM: number;
}

export interface TelemetryFrame {
  frameId: number;
  timestamp: string;
  elapsedSeconds: number;
  position: GeoPoint;
  homePosition: GeoPoint;
  altitudeM: number;
  gpsAltitudeM: number;
  barometricAltitudeM: number;
  airspeedMs: number;
  groundSpeedMs: number;
  headingDeg: number;
  rollDeg: number;
  pitchDeg: number;
  yawDeg: number;
  verticalSpeedMs: number;
  batteryPercent: number;
  batteryVoltageV: number;
  batteryCurrentA: number;
  batteryTemperatureC: number;
  signalStrengthPercent: number;
  latencyMs: number;
  gpsStatus: GpsStatus;
  gpsSatellites: number;
  communicationStatus: LinkStatus;
  flightMode: FlightMode;
  missionPhase: MissionPhase;
  waypointIndex: number;
  routeNumber: number;
  payloadState: 'off' | 'standby' | 'active' | 'fault';
  payloadMode: 'EO' | 'IR' | 'Mapping' | 'Tracking';
  propulsionState: SubsystemStatus;
  throttlePercent: number;
  rpm: number;
  routeProgressPercent: number;
  distanceFromHomeM: number;
  distanceToNextWaypointM: number;
  totalDistanceEstimateM: number;
}

export interface WarningMessage {
  id: string;
  timestamp: string;
  severity: AlertSeverity;
  code: string;
  title: string;
  description: string;
  acknowledged: boolean;
}

export interface SubsystemHealth {
  id: string;
  name: string;
  status: SubsystemStatus;
  valueLabel: string;
  summary: string;
}

export interface MissionEvent {
  id: string;
  timestamp: string;
  type: 'system' | 'operator' | 'warning' | 'scenario' | 'replay';
  message: string;
}

export interface SimulationScenario {
  id: ScenarioId;
  name: string;
  description: string;
  faultStartSecond?: number;
}

export interface TelemetryLog {
  frames: TelemetryFrame[];
  events: MissionEvent[];
}
