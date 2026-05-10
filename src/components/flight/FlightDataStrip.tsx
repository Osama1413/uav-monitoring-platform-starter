import { Activity, Gauge, MapPin, Navigation, Timer } from 'lucide-react';
import { MetricCard } from '@/components/ui/MetricCard';
import type { TelemetryFrame } from '@/types/telemetry';
import { durationFmt, numberFmt } from '@/utils/format';

interface FlightDataStripProps {
  frame: TelemetryFrame;
}

export function FlightDataStrip({ frame }: FlightDataStripProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      <MetricCard label="Airspeed" value={frame.airspeedMs.toFixed(1)} unit="m/s" icon={<Gauge className="h-5 w-5" />} />
      <MetricCard label="Altitude" value={numberFmt(frame.altitudeM)} unit="m" icon={<Activity className="h-5 w-5" />} />
      <MetricCard label="Vertical Speed" value={frame.verticalSpeedMs.toFixed(1)} unit="m/s" icon={<Navigation className="h-5 w-5" />} />
      <MetricCard label="Waypoint" value={`WP-${frame.waypointIndex}`} footer={`Route ${frame.routeNumber}`} icon={<MapPin className="h-5 w-5" />} />
      <MetricCard label="Mission Time" value={durationFmt(frame.elapsedSeconds)} icon={<Timer className="h-5 w-5" />} />
    </div>
  );
}
