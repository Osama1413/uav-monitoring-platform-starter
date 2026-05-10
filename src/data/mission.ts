import type { GeoPoint, MissionWaypoint } from '@/types/telemetry';

export const HOME_POSITION: GeoPoint = {
  lat: 26.3096,
  lng: 50.1457,
};

export const MISSION_WAYPOINTS: MissionWaypoint[] = [
  { id: 1, name: 'WP-01 Departure', lat: 26.3144, lng: 50.1519, targetAltitudeM: 160 },
  { id: 2, name: 'WP-02 Coastal Track', lat: 26.3218, lng: 50.1648, targetAltitudeM: 260 },
  { id: 3, name: 'WP-03 Survey Line', lat: 26.3298, lng: 50.1784, targetAltitudeM: 310 },
  { id: 4, name: 'WP-04 Turn Point', lat: 26.3224, lng: 50.1927, targetAltitudeM: 280 },
  { id: 5, name: 'WP-05 Return Leg', lat: 26.3128, lng: 50.1815, targetAltitudeM: 220 },
];

export const ROUTE_PATH: GeoPoint[] = [HOME_POSITION, ...MISSION_WAYPOINTS.map(({ lat, lng }) => ({ lat, lng })), HOME_POSITION];
