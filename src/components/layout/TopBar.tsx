import { Battery, Radio, Satellite, ShieldCheck, Wifi } from 'lucide-react';
import { StatusPill } from '@/components/ui/StatusPill';
import { useTelemetry } from '@/hooks/useTelemetry';
import { percentFmt } from '@/utils/format';

export function TopBar() {
  const { frame, scenario, isRunning, overallHealth } = useTelemetry();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 px-4 py-3 backdrop-blur lg:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">Desktop UAV Monitoring Console</p>
          <h1 className="mt-1 text-xl font-bold text-slate-50">{scenario.name}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill value={overallHealth} label={`Health: ${overallHealth}`} />
          <StatusPill value={frame.communicationStatus} label={`Link: ${frame.communicationStatus}`} />
          <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300">
            <Wifi className="h-4 w-4 text-emerald-300" /> {percentFmt(frame.signalStrengthPercent)}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300">
            <Satellite className="h-4 w-4 text-sky-300" /> {frame.gpsSatellites} SAT
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300">
            <Battery className="h-4 w-4 text-emerald-300" /> {percentFmt(frame.batteryPercent)}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300">
            <Radio className="h-4 w-4 text-violet-300" /> {frame.flightMode}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300">
            <ShieldCheck className="h-4 w-4 text-sky-300" /> {isRunning ? 'LIVE SIM' : 'PAUSED'}
          </div>
        </div>
      </div>
    </header>
  );
}
