import { StatusPill } from '@/components/ui/StatusPill';
import type { SubsystemHealth } from '@/types/telemetry';

interface HealthGridProps {
  items: SubsystemHealth[];
}

export function HealthGrid({ items }: HealthGridProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article key={item.id} className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-100">{item.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{item.summary}</p>
            </div>
            <StatusPill value={item.status} />
          </div>
          <p className="mt-4 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-200">{item.valueLabel}</p>
        </article>
      ))}
    </div>
  );
}
