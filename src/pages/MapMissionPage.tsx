import { MissionMap } from '@/components/map/MissionMap';
import { Panel } from '@/components/ui/Panel';
import { MetricCard } from '@/components/ui/MetricCard';
import { useTelemetry } from '@/hooks/useTelemetry';
import { numberFmt, percentFmt } from '@/utils/format';

export function MapMissionPage() {
  const { frame } = useTelemetry();

  return (
    <div className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
      <Panel title="Map and Mission Display" subtitle="Live simulated UAV position, route, home point, and waypoint progression.">
        <MissionMap frame={frame} />
      </Panel>
      <div className="space-y-4">
        <Panel title="Mission State">
          <div className="grid gap-3">
            <MetricCard label="Current Phase" value={frame.missionPhase} />
            <MetricCard label="Flight Mode" value={frame.flightMode} />
            <MetricCard label="Waypoint" value={`WP-${frame.waypointIndex}`} footer={`Route progress ${percentFmt(frame.routeProgressPercent)}`} />
            <MetricCard label="Distance to WP" value={numberFmt(frame.distanceToNextWaypointM)} unit="m" />
            <MetricCard label="Distance from Home" value={numberFmt(frame.distanceFromHomeM)} unit="m" />
            <MetricCard label="Route Estimate" value={numberFmt(frame.totalDistanceEstimateM)} unit="m" />
          </div>
        </Panel>
      </div>
    </div>
  );
}
