import type { FlightMode } from '@/types/telemetry';
import { useTelemetry } from '@/hooks/useTelemetry';

const commandButtons: FlightMode[] = ['Mission', 'Hold', 'Manual', 'Assisted', 'Return Home', 'Landing'];

export function CommandPanel() {
  const {
    isRunning,
    setRunning,
    setCommandMode,
    commandMode,
    resetMission,
    acknowledgeWarnings,
    exportMissionLog,
  } = useTelemetry();

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {commandButtons.map((mode) => (
        <button
          key={mode}
          onClick={() => setCommandMode(mode)}
          className={`rounded-xl border px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] transition ${
            commandMode === mode
              ? 'border-sky-300 bg-sky-400/20 text-sky-100'
              : 'border-slate-700 bg-slate-950/50 text-slate-300 hover:border-sky-400 hover:text-sky-100'
          }`}
        >
          {mode}
        </button>
      ))}
      <button
        onClick={() => setRunning(!isRunning)}
        className="rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-300 hover:border-emerald-400 hover:text-emerald-100"
      >
        {isRunning ? 'Pause Sim' : 'Resume Sim'}
      </button>
      <button
        onClick={acknowledgeWarnings}
        className="rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-300 hover:border-amber-400 hover:text-amber-100"
      >
        Confirm / ACK
      </button>
      <button
        onClick={resetMission}
        className="rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-300 hover:border-violet-400 hover:text-violet-100"
      >
        Reset Mission
      </button>
      <button
        onClick={exportMissionLog}
        className="rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-300 hover:border-sky-400 hover:text-sky-100"
      >
        Export Log
      </button>
    </div>
  );
}
