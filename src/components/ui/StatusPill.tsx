import type { AlertSeverity, SubsystemStatus } from '@/types/telemetry';

const statusClasses: Record<SubsystemStatus | AlertSeverity | 'online' | 'degraded' | 'lost', string> = {
  normal: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200',
  warning: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
  critical: 'border-red-400/40 bg-red-400/10 text-red-200',
  offline: 'border-slate-400/40 bg-slate-400/10 text-slate-200',
  caution: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
  advisory: 'border-sky-400/40 bg-sky-400/10 text-sky-200',
  online: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200',
  degraded: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
  lost: 'border-red-400/40 bg-red-400/10 text-red-200',
};

interface StatusPillProps {
  value: keyof typeof statusClasses;
  label?: string;
}

export function StatusPill({ value, label }: StatusPillProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] ${statusClasses[value]}`}>
      {label ?? value}
    </span>
  );
}
