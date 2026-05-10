import { TrendChart } from '@/components/charts/TrendChart';
import { Panel } from '@/components/ui/Panel';
import { MetricCard } from '@/components/ui/MetricCard';
import { useTelemetry } from '@/hooks/useTelemetry';
import { durationFmt, numberFmt } from '@/utils/format';

export function AnalysisPage() {
  const { frames, warnings, frame } = useTelemetry();
  const maxAltitude = Math.max(...frames.map((item) => item.altitudeM), 0);
  const maxSpeed = Math.max(...frames.map((item) => item.airspeedMs), 0);
  const minBattery = Math.min(...frames.map((item) => item.batteryPercent), 100);

  return (
    <div className="space-y-4">
      <Panel title="Post-Mission Analysis Summary" subtitle="Live analysis of the current simulated mission log.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <MetricCard label="Mission Duration" value={durationFmt(frame.elapsedSeconds)} />
          <MetricCard label="Max Altitude" value={numberFmt(maxAltitude)} unit="m" />
          <MetricCard label="Max Speed" value={maxSpeed.toFixed(1)} unit="m/s" />
          <MetricCard label="Min Battery" value={minBattery.toFixed(0)} unit="%" />
          <MetricCard label="Active Alerts" value={warnings.length} />
        </div>
      </Panel>

      <div className="grid gap-4 xl:grid-cols-2">
        <TrendChart frames={frames} dataKey="altitudeM" label="Altitude Trend" unit="m" />
        <TrendChart frames={frames} dataKey="airspeedMs" label="Speed Trend" unit="m/s" />
        <TrendChart frames={frames} dataKey="batteryPercent" label="Battery Trend" unit="%" />
        <TrendChart frames={frames} dataKey="signalStrengthPercent" label="Signal Strength Trend" unit="%" />
      </div>
    </div>
  );
}
