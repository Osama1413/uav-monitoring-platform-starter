import { createContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { SCENARIOS } from '@/simulation/scenarios';
import { generateTelemetryFrame } from '@/simulation/telemetryEngine';
import { evaluateHealth, evaluateOverallHealth } from '@/simulation/health';
import { evaluateWarnings } from '@/simulation/warnings';
import type {
  FlightMode,
  MissionEvent,
  ScenarioId,
  SimulationScenario,
  SubsystemHealth,
  SubsystemStatus,
  TelemetryFrame,
  WarningMessage,
} from '@/types/telemetry';

interface TelemetryContextValue {
  frame: TelemetryFrame;
  scenario: SimulationScenario;
  scenarios: SimulationScenario[];
  isRunning: boolean;
  commandMode?: FlightMode;
  frames: TelemetryFrame[];
  events: MissionEvent[];
  warnings: WarningMessage[];
  health: SubsystemHealth[];
  overallHealth: SubsystemStatus;
  setScenario: (scenarioId: ScenarioId) => void;
  setRunning: (isRunning: boolean) => void;
  setCommandMode: (mode?: FlightMode) => void;
  resetMission: () => void;
  acknowledgeWarnings: () => void;
  exportMissionLog: () => void;
}

const initialFrame = generateTelemetryFrame({
  elapsedSeconds: 0,
  frameId: 0,
  scenarioId: 'normal',
});

export const TelemetryContext = createContext<TelemetryContextValue | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function TelemetryProvider({ children }: Props) {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('normal');
  const [isRunning, setRunning] = useState(true);
  const [commandMode, setCommandModeState] = useState<FlightMode | undefined>();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [frameId, setFrameId] = useState(0);
  const [frames, setFrames] = useState<TelemetryFrame[]>([initialFrame]);
  const [events, setEvents] = useState<MissionEvent[]>([
    {
      id: 'event-0',
      timestamp: initialFrame.timestamp,
      type: 'system',
      message: 'Simulation initialized.',
    },
  ]);
  const acknowledgedCodes = useRef(new Set<string>());

  const frame = useMemo(
    () =>
      generateTelemetryFrame({
        elapsedSeconds,
        frameId,
        scenarioId,
        commandMode,
      }),
    [commandMode, elapsedSeconds, frameId, scenarioId],
  );

  const warnings = useMemo(() => {
    const currentWarnings = evaluateWarnings(frame);
    return currentWarnings.map((warning) => ({
      ...warning,
      acknowledged: acknowledgedCodes.current.has(warning.code),
    }));
  }, [frame]);

  const health = useMemo(() => evaluateHealth(frame), [frame]);
  const overallHealth = useMemo(() => evaluateOverallHealth(health), [health]);
  const scenario = useMemo(() => SCENARIOS.find((item) => item.id === scenarioId) ?? SCENARIOS[0], [scenarioId]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = window.setInterval(() => {
      setElapsedSeconds((value) => value + 1);
      setFrameId((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    setFrames((value) => [...value.slice(-599), frame]);
  }, [frame]);

  useEffect(() => {
    const newWarningEvents = warnings
      .filter((warning) => !warning.acknowledged)
      .map<MissionEvent>((warning) => ({
        id: `event-${warning.id}`,
        timestamp: warning.timestamp,
        type: 'warning',
        message: `${warning.code}: ${warning.title}`,
      }));

    if (newWarningEvents.length === 0) return;

    setEvents((value) => {
      const existing = new Set(value.map((item) => item.id));
      const unique = newWarningEvents.filter((item) => !existing.has(item.id));
      if (unique.length === 0) return value;
      return [...value.slice(-199), ...unique];
    });
  }, [warnings]);

  const setScenario = useCallback((nextScenarioId: ScenarioId) => {
    setScenarioId(nextScenarioId);
    acknowledgedCodes.current.clear();
    setEvents((value) => [
      ...value.slice(-199),
      {
        id: `event-scenario-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'scenario',
        message: `Scenario changed to ${nextScenarioId}.`,
      },
    ]);
  }, []);

  const setCommandMode = useCallback((mode?: FlightMode) => {
    setCommandModeState(mode);
    setEvents((value) => [
      ...value.slice(-199),
      {
        id: `event-command-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'operator',
        message: mode ? `Operator command selected: ${mode}.` : 'Operator command cleared.',
      },
    ]);
  }, []);

  const resetMission = useCallback(() => {
    acknowledgedCodes.current.clear();
    setElapsedSeconds(0);
    setFrameId(0);
    setFrames([]);
    setEvents([
      {
        id: `event-reset-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'system',
        message: 'Mission simulation reset.',
      },
    ]);
  }, []);

  const acknowledgeWarnings = useCallback(() => {
    for (const warning of warnings) acknowledgedCodes.current.add(warning.code);
    setEvents((value) => [
      ...value.slice(-199),
      {
        id: `event-ack-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'operator',
        message: 'Active warnings acknowledged.',
      },
    ]);
  }, [warnings]);

  const exportMissionLog = useCallback(() => {
    const payload = JSON.stringify({ frames, events }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `uav-mission-log-${new Date().toISOString()}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }, [events, frames]);

  const value: TelemetryContextValue = {
    frame,
    scenario,
    scenarios: SCENARIOS,
    isRunning,
    commandMode,
    frames,
    events,
    warnings,
    health,
    overallHealth,
    setScenario,
    setRunning,
    setCommandMode,
    resetMission,
    acknowledgeWarnings,
    exportMissionLog,
  };

  return <TelemetryContext.Provider value={value}>{children}</TelemetryContext.Provider>;
}
