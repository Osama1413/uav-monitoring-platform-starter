import type { SubsystemHealth, SubsystemStatus, TelemetryFrame } from '@/types/telemetry';

function statusRank(status: SubsystemStatus): number {
  return { normal: 0, warning: 1, critical: 2, offline: 3 }[status];
}

export function worstStatus(statuses: SubsystemStatus[]): SubsystemStatus {
  return statuses.reduce((worst, status) => (statusRank(status) > statusRank(worst) ? status : worst), 'normal' as SubsystemStatus);
}

export function evaluateHealth(frame: TelemetryFrame): SubsystemHealth[] {
  const navigationStatus: SubsystemStatus = frame.gpsStatus === 'lost' ? 'critical' : frame.gpsStatus === 'degraded' ? 'warning' : 'normal';
  const communicationStatus: SubsystemStatus =
    frame.communicationStatus === 'lost' ? 'offline' : frame.communicationStatus === 'degraded' ? 'warning' : 'normal';
  const powerStatus: SubsystemStatus = frame.batteryPercent <= 10 ? 'critical' : frame.batteryPercent <= 25 ? 'warning' : 'normal';
  const payloadStatus: SubsystemStatus = frame.payloadState === 'fault' ? 'critical' : frame.payloadState === 'standby' ? 'warning' : 'normal';
  const flightControlStatus: SubsystemStatus = Math.abs(frame.rollDeg) > 30 || Math.abs(frame.pitchDeg) > 18 ? 'warning' : 'normal';
  const takeoffLandingStatus: SubsystemStatus = frame.missionPhase === 'landing' && frame.verticalSpeedMs < -6 ? 'warning' : 'normal';

  return [
    {
      id: 'navigation',
      name: 'Navigation',
      status: navigationStatus,
      valueLabel: `${frame.gpsSatellites} SAT / ${frame.gpsStatus.toUpperCase()}`,
      summary: 'GPS, heading source, and route navigation quality.',
    },
    {
      id: 'communication',
      name: 'Communication',
      status: communicationStatus,
      valueLabel: `${Math.round(frame.signalStrengthPercent)}% / ${frame.latencyMs} ms`,
      summary: 'Command, telemetry, and video datalink quality.',
    },
    {
      id: 'propulsion',
      name: 'Propulsion',
      status: frame.propulsionState,
      valueLabel: `${frame.rpm} RPM / ${Math.round(frame.throttlePercent)}%`,
      summary: 'Motor output, throttle level, and propulsion stability.',
    },
    {
      id: 'flight-control',
      name: 'Flight Control',
      status: flightControlStatus,
      valueLabel: `R ${frame.rollDeg}° / P ${frame.pitchDeg}°`,
      summary: 'Attitude, motion, and control mode stability.',
    },
    {
      id: 'power',
      name: 'Electrical / Power',
      status: powerStatus,
      valueLabel: `${frame.batteryPercent.toFixed(0)}% / ${frame.batteryVoltageV.toFixed(1)} V`,
      summary: 'Battery charge, voltage, current, and thermal state.',
    },
    {
      id: 'payload',
      name: 'Payload',
      status: payloadStatus,
      valueLabel: `${frame.payloadState.toUpperCase()} / ${frame.payloadMode}`,
      summary: 'Simulated payload state, imaging mode, and gimbal readiness.',
    },
    {
      id: 'takeoff-landing',
      name: 'Takeoff & Landing',
      status: takeoffLandingStatus,
      valueLabel: frame.missionPhase.toUpperCase(),
      summary: 'Takeoff, approach, landing, and ground-state monitoring.',
    },
  ];
}

export function evaluateOverallHealth(items: SubsystemHealth[]): SubsystemStatus {
  return worstStatus(items.map((item) => item.status));
}
