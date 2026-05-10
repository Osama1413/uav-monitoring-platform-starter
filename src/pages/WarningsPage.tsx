import { Panel } from '@/components/ui/Panel';
import { WarningList } from '@/components/warnings/WarningList';
import { useTelemetry } from '@/hooks/useTelemetry';
import { isoTime } from '@/utils/format';

export function WarningsPage() {
  const { warnings, events, acknowledgeWarnings } = useTelemetry();

  return (
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <Panel
        title="Warning / Caution / Advisory Module"
        subtitle="Rule-based alert generation from simulated telemetry."
        actions={
          <button onClick={acknowledgeWarnings} className="rounded-xl border border-slate-700 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-300 hover:border-sky-400 hover:text-sky-100">
            Acknowledge
          </button>
        }
      >
        <WarningList warnings={warnings} />
      </Panel>

      <Panel title="Alert and Event History" subtitle="Time-stamped mission and system events.">
        <div className="max-h-[640px] space-y-2 overflow-y-auto pr-2">
          {[...events].reverse().map((event) => (
            <article key={event.id} className="rounded-xl border border-slate-700 bg-slate-950/50 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-300">{event.type}</p>
                <p className="text-xs text-slate-500">{isoTime(event.timestamp)}</p>
              </div>
              <p className="mt-2 text-sm text-slate-300">{event.message}</p>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}
