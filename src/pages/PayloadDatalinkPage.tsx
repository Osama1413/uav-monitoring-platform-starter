import { Panel } from '@/components/ui/Panel';
import { Gauge } from '@/components/ui/Gauge';
import { MetricCard } from '@/components/ui/MetricCard';
import { StatusPill } from '@/components/ui/StatusPill';
import { useTelemetry } from '@/hooks/useTelemetry';

export function PayloadDatalinkPage() {
  const { frame } = useTelemetry();

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Panel title="Payload Module" subtitle="Simulated payload controls and status. No real video feed is required.">
        <div className="grid gap-3 md:grid-cols-2">
          <MetricCard label="Payload State" value={frame.payloadState} />
          <MetricCard label="Payload Mode" value={frame.payloadMode} />
          <Gauge label="Zoom Level" value={65 + Math.sin(frame.elapsedSeconds / 7) * 20} unit="%" />
          <Gauge label="Focus Quality" value={88 + Math.sin(frame.elapsedSeconds / 8) * 5} unit="%" />
          <Gauge label="Gimbal Azimuth" value={(frame.headingDeg % 180) + 10} unit="deg" min={0} max={190} />
          <Gauge label="Gain Level" value={54 + Math.sin(frame.elapsedSeconds / 5) * 8} unit="%" />
        </div>
      </Panel>

      <Panel title="Datalink Module" subtitle="Command, telemetry, and simulated payload datalink status." actions={<StatusPill value={frame.communicationStatus} />}>
        <div className="grid gap-3 md:grid-cols-2">
          <Gauge label="Signal Strength" value={frame.signalStrengthPercent} unit="%" />
          <MetricCard label="Latency" value={frame.latencyMs} unit="ms" />
          <MetricCard label="Uplink" value={frame.communicationStatus === 'lost' ? 'Lost' : 'Online'} />
          <MetricCard label="Downlink" value={frame.communicationStatus === 'lost' ? 'Lost' : 'Online'} />
          <MetricCard label="Video Link" value={frame.signalStrengthPercent < 30 ? 'Degraded' : 'Stable'} />
          <MetricCard label="Telemetry Link" value={frame.communicationStatus} />
        </div>
      </Panel>
    </div>
  );
}
