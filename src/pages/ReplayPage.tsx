import { Panel } from '@/components/ui/Panel';
import { MetricCard } from '@/components/ui/MetricCard';
import { useTelemetry } from '@/hooks/useTelemetry';
import { durationFmt, isoTime } from '@/utils/format';

export function ReplayPage() {
  const { frames, events, exportMissionLog, setRunning, isRunning } = useTelemetry();
  const lastFrame = frames.at(-1);

  return (
    <div className="space-y-4">
      <Panel title="Replay / Playback Module" subtitle="Starter interface for recorded mission playback. Current version records live simulation frames for export and future replay.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Recorded Frames" value={frames.length} />
          <MetricCard label="Logged Events" value={events.length} />
          <MetricCard label="Current Time" value={lastFrame ? durationFmt(lastFrame.elapsedSeconds) : '00:00:00'} />
          <MetricCard label="Log Status" value={isRunning ? 'Recording' : 'Paused'} />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={() => setRunning(!isRunning)} className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-300 hover:border-sky-400 hover:text-sky-100">
            {isRunning ? 'Pause Recording' : 'Resume Recording'}
          </button>
          <button onClick={exportMissionLog} className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-300 hover:border-emerald-400 hover:text-emerald-100">
            Export JSON Log
          </button>
        </div>
      </Panel>

      <Panel title="Latest Recorded Frames">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.16em] text-slate-500">
              <tr>
                <th className="px-3 py-2">Time</th>
                <th className="px-3 py-2">Phase</th>
                <th className="px-3 py-2">Mode</th>
                <th className="px-3 py-2">Altitude</th>
                <th className="px-3 py-2">Speed</th>
                <th className="px-3 py-2">Battery</th>
                <th className="px-3 py-2">Signal</th>
              </tr>
            </thead>
            <tbody>
              {[...frames].slice(-12).reverse().map((frame) => (
                <tr key={frame.frameId} className="border-t border-slate-800 text-slate-300">
                  <td className="px-3 py-2">{isoTime(frame.timestamp)}</td>
                  <td className="px-3 py-2">{frame.missionPhase}</td>
                  <td className="px-3 py-2">{frame.flightMode}</td>
                  <td className="px-3 py-2">{frame.altitudeM} m</td>
                  <td className="px-3 py-2">{frame.airspeedMs} m/s</td>
                  <td className="px-3 py-2">{frame.batteryPercent.toFixed(0)}%</td>
                  <td className="px-3 py-2">{frame.signalStrengthPercent.toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
