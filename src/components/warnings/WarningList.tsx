import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { StatusPill } from '@/components/ui/StatusPill';
import type { WarningMessage } from '@/types/telemetry';
import { isoTime } from '@/utils/format';

interface WarningListProps {
  warnings: WarningMessage[];
}

const icons = {
  warning: AlertTriangle,
  caution: AlertTriangle,
  advisory: Info,
};

export function WarningList({ warnings }: WarningListProps) {
  if (warnings.length === 0) {
    return (
      <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 text-center">
        <CheckCircle2 className="h-9 w-9 text-emerald-300" />
        <p className="mt-3 font-semibold text-slate-200">No active warnings</p>
        <p className="text-sm text-slate-500">All monitored conditions are currently nominal.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {warnings.map((warning) => {
        const Icon = icons[warning.severity];
        return (
          <article key={warning.id} className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-slate-800 p-2">
                <Icon className="h-5 w-5 text-amber-200" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-slate-100">{warning.title}</h3>
                  <StatusPill value={warning.severity} />
                  {warning.acknowledged && <span className="text-xs text-emerald-300">ACK</span>}
                </div>
                <p className="mt-1 text-sm text-slate-400">{warning.description}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
                  {warning.code} · {isoTime(warning.timestamp)}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
