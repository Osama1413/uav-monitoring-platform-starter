import type { SimulationScenario } from '@/types/telemetry';

export const SCENARIOS: SimulationScenario[] = [
  {
    id: 'normal',
    name: 'Normal Mission',
    description: 'Stable survey mission with nominal telemetry and subsystem health.',
  },
  {
    id: 'low-battery',
    name: 'Low Battery Mission',
    description: 'Battery drains faster and triggers caution/critical return-home behavior.',
    faultStartSecond: 90,
  },
  {
    id: 'gps-degradation',
    name: 'GPS Degradation',
    description: 'Satellite count and GPS validity degrade during cruise.',
    faultStartSecond: 75,
  },
  {
    id: 'communication-loss',
    name: 'Communication Loss',
    description: 'Datalink quality degrades and eventually drops.',
    faultStartSecond: 80,
  },
  {
    id: 'propulsion-issue',
    name: 'Propulsion Issue',
    description: 'RPM instability and reduced propulsion health are injected.',
    faultStartSecond: 95,
  },
  {
    id: 'emergency-rth',
    name: 'Emergency Return Home',
    description: 'Mission enters return-home mode after a simulated safety trigger.',
    faultStartSecond: 110,
  },
];
