import type { TelemetryFrame, WarningMessage } from '@/types/telemetry';

function makeWarning(
  frame: TelemetryFrame,
  severity: WarningMessage['severity'],
  code: string,
  title: string,
  description: string,
): WarningMessage {
  return {
    id: `${code}-${frame.frameId}`,
    timestamp: frame.timestamp,
    severity,
    code,
    title,
    description,
    acknowledged: false,
  };
}

export function evaluateWarnings(frame: TelemetryFrame): WarningMessage[] {
  const warnings: WarningMessage[] = [];

  if (frame.batteryPercent <= 10) {
    warnings.push(makeWarning(frame, 'warning', 'BAT-CRIT', 'Critical Battery', 'Battery is below 10%. Immediate return-home or landing required.'));
  } else if (frame.batteryPercent <= 25) {
    warnings.push(makeWarning(frame, 'caution', 'BAT-LOW', 'Low Battery', 'Battery is below 25%. Monitor endurance and consider return-home.'));
  }

  if (frame.gpsStatus === 'lost') {
    warnings.push(makeWarning(frame, 'warning', 'GPS-LOSS', 'GPS Loss', 'GPS position solution is unavailable. Navigation quality is critical.'));
  } else if (frame.gpsStatus === 'degraded') {
    warnings.push(makeWarning(frame, 'caution', 'GPS-DEG', 'GPS Degraded', 'GPS satellite count or position quality is degraded.'));
  }

  if (frame.communicationStatus === 'lost') {
    warnings.push(makeWarning(frame, 'warning', 'COM-LOSS', 'Communication Loss', 'Primary command and telemetry link is lost.'));
  } else if (frame.communicationStatus === 'degraded') {
    warnings.push(makeWarning(frame, 'caution', 'COM-DEG', 'Datalink Degraded', 'Signal strength or latency is outside normal range.'));
  }

  if (frame.altitudeM > 350) {
    warnings.push(makeWarning(frame, 'caution', 'ALT-HIGH', 'Excessive Altitude', 'Altitude exceeds the configured mission limit.'));
  }

  if (frame.airspeedMs > 31) {
    warnings.push(makeWarning(frame, 'caution', 'SPD-HIGH', 'Excessive Airspeed', 'Airspeed exceeds mission envelope warning threshold.'));
  }

  if (frame.propulsionState === 'critical') {
    warnings.push(makeWarning(frame, 'warning', 'PROP-CRIT', 'Propulsion Critical', 'Propulsion output is unstable or below required performance.'));
  } else if (frame.propulsionState === 'warning') {
    warnings.push(makeWarning(frame, 'caution', 'PROP-WARN', 'Propulsion Warning', 'RPM instability detected in simulated propulsion system.'));
  }

  if (frame.flightMode === 'Return Home') {
    warnings.push(makeWarning(frame, 'advisory', 'RTH-ACTIVE', 'Return Home Active', 'Aircraft is operating in return-home mode.'));
  }

  return warnings;
}
