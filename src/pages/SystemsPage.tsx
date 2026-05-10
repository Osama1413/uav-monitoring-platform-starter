import { Panel } from '@/components/ui/Panel';
import { MetricCard } from '@/components/ui/MetricCard';
import { Gauge } from '@/components/ui/Gauge';
import { useTelemetry } from '@/hooks/useTelemetry';

export function SystemsPage() {
  const { frame } = useTelemetry();

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Panel title="Power / Electrical">
        <div className="grid gap-3 md:grid-cols-2">
          <Gauge label="Battery" value={frame.batteryPercent} unit="%" />
          <MetricCard label="Voltage" value={frame.batteryVoltageV.toFixed(2)} unit="V" />
          <MetricCard label="Current" value={frame.batteryCurrentA.toFixed(1)} unit="A" />
          <MetricCard label="Temperature" value={frame.batteryTemperatureC.toFixed(1)} unit="°C" />
        </div>
      </Panel>

      <Panel title="Propulsion">
        <div className="grid gap-3 md:grid-cols-2">
          <MetricCard label="RPM" value={frame.rpm} />
          <Gauge label="Throttle" value={frame.throttlePercent} unit="%" />
          <MetricCard label="Propulsion Health" value={frame.propulsionState} />
          <MetricCard label="Ground Speed" value={frame.groundSpeedMs.toFixed(1)} unit="m/s" />
        </div>
      </Panel>

      <Panel title="Flight Control / Motion">
        <div className="grid gap-3 md:grid-cols-2">
          <MetricCard label="Roll" value={frame.rollDeg.toFixed(1)} unit="deg" />
          <MetricCard label="Pitch" value={frame.pitchDeg.toFixed(1)} unit="deg" />
          <MetricCard label="Yaw" value={frame.yawDeg} unit="deg" />
          <MetricCard label="Control Mode" value={frame.flightMode} />
        </div>
      </Panel>

      <Panel title="Sensors / Navigation">
        <div className="grid gap-3 md:grid-cols-2">
          <MetricCard label="GPS Status" value={frame.gpsStatus} />
          <MetricCard label="GPS Satellites" value={frame.gpsSatellites} />
          <MetricCard label="GPS Altitude" value={frame.gpsAltitudeM} unit="m" />
          <MetricCard label="Barometric Altitude" value={frame.barometricAltitudeM} unit="m" />
        </div>
      </Panel>
    </div>
  );
}
