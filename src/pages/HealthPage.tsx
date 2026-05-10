import { HealthGrid } from '@/components/health/HealthGrid';
import { Panel } from '@/components/ui/Panel';
import { StatusPill } from '@/components/ui/StatusPill';
import { useTelemetry } from '@/hooks/useTelemetry';

export function HealthPage() {
  const { health, overallHealth } = useTelemetry();

  return (
    <Panel title="Health Summary Screen" subtitle="Derived subsystem status based on telemetry and rule-based logic." actions={<StatusPill value={overallHealth} label={`Overall: ${overallHealth}`} />}>
      <HealthGrid items={health} />
    </Panel>
  );
}
