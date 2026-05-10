import { CircleMarker, MapContainer, Polyline, Popup, TileLayer, Tooltip } from 'react-leaflet';
import { HOME_POSITION, MISSION_WAYPOINTS, ROUTE_PATH } from '@/data/mission';
import type { TelemetryFrame } from '@/types/telemetry';

interface MissionMapProps {
  frame: TelemetryFrame;
  className?: string;
}

const routePositions = ROUTE_PATH.map((point) => [point.lat, point.lng] as [number, number]);

export function MissionMap({ frame, className = '' }: MissionMapProps) {
  const uavPosition: [number, number] = [frame.position.lat, frame.position.lng];

  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-700 ${className}`}>
      <MapContainer center={uavPosition} zoom={13} scrollWheelZoom className="min-h-[420px]">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={routePositions} pathOptions={{ color: '#38bdf8', weight: 4, opacity: 0.8 }} />
        <CircleMarker center={[HOME_POSITION.lat, HOME_POSITION.lng]} radius={8} pathOptions={{ color: '#22c55e', fillColor: '#22c55e', fillOpacity: 0.8 }}>
          <Tooltip>Home Position</Tooltip>
        </CircleMarker>
        {MISSION_WAYPOINTS.map((waypoint) => (
          <CircleMarker key={waypoint.id} center={[waypoint.lat, waypoint.lng]} radius={7} pathOptions={{ color: '#facc15', fillColor: '#facc15', fillOpacity: 0.85 }}>
            <Tooltip>{waypoint.name}</Tooltip>
          </CircleMarker>
        ))}
        <CircleMarker center={uavPosition} radius={10} pathOptions={{ color: '#ffffff', fillColor: '#0ea5e9', fillOpacity: 1 }}>
          <Popup>
            <strong>UAV Current Position</strong>
            <br />
            Altitude: {frame.altitudeM} m
            <br />
            Heading: {frame.headingDeg}°
          </Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}
