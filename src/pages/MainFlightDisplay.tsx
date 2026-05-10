import { Panel } from '@/components/ui/Panel';
import { AttitudeIndicator } from '@/components/flight/AttitudeIndicator';
import { Compass } from '@/components/flight/Compass';
import { FlightDataStrip } from '@/components/flight/FlightDataStrip';
import { WarningList } from '@/components/warnings/WarningList';
import { HealthGrid } from '@/components/health/HealthGrid';
import { CommandPanel } from '@/components/controls/CommandPanel';
import { Gauge } from '@/components/ui/Gauge';
import { StatusPill } from '@/components/ui/StatusPill';
import { useTelemetry } from '@/hooks/useTelemetry';

export function MainFlightDisplay() {
  const { frame, health, warnings, scenario, scenarios, setScenario } = useTelemetry();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Panel
          title="Main Flight Display"
          subtitle="Primary attitude, heading, speed, altitude, phase, and mission state."
          actions={<StatusPill value={frame.communicationStatus} label={frame.missionPhase} />}
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <AttitudeIndicator rollDeg={frame.rollDeg} pitchDeg={frame.pitchDeg} />
            <Compass headingDeg={frame.headingDeg} />
          </div>
          <div className="mt-6">
            <FlightDataStrip frame={frame} />
          </div>
        </Panel>

        <Panel title="Scenario Control" subtitle={scenario.description}>
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Mission Scenario</label>
            <select
              value={scenario.id}
              onChange={(event) => setScenario(event.target.value as typeof scenario.id)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm font-semibold text-slate-100 outline-none focus:border-sky-400"
            >
              {scenarios.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="grid gap-3 sm:grid-cols-2">
              <Gauge label="Battery" value={frame.batteryPercent} unit="%" />
              <Gauge label="Signal" value={frame.signalStrengthPercent} unit="%" />
              <Gauge label="Route Progress" value={frame.routeProgressPercent} unit="%" />
              <Gauge label="Throttle" value={frame.throttlePercent} unit="%" />
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Supervisory Control Panel" subtitle="High-level simulated commands that alter operator mode state.">
        <CommandPanel />
      </Panel>

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Active Warnings / Cautions / Advisories">
          <WarningList warnings={warnings} />
        </Panel>
        <Panel title="Subsystem Health Summary">
          <HealthGrid items={health} />
        </Panel>
      </div>
    </div>
  );
}
