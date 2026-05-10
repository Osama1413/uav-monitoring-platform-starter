import type { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: ReactNode;
  footer?: string;
}

export function MetricCard({ label, value, unit, icon, footer }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-950/50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-100">
            {value}
            {unit && <span className="ml-1 text-sm font-medium text-slate-400">{unit}</span>}
          </p>
        </div>
        {icon && <div className="rounded-xl bg-sky-400/10 p-2 text-sky-300">{icon}</div>}
      </div>
      {footer && <p className="mt-3 text-xs text-slate-500">{footer}</p>}
    </div>
  );
}
