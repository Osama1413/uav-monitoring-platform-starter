import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { TelemetryFrame } from '@/types/telemetry';

interface TrendChartProps {
  frames: TelemetryFrame[];
  dataKey: keyof Pick<TelemetryFrame, 'altitudeM' | 'airspeedMs' | 'batteryPercent' | 'signalStrengthPercent'>;
  label: string;
  unit?: string;
}

export function TrendChart({ frames, dataKey, label, unit }: TrendChartProps) {
  const data = frames.slice(-120).map((frame) => ({
    time: frame.elapsedSeconds,
    value: Number(frame[dataKey]),
  }));

  return (
    <div className="h-72 rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{label}</h3>
        {unit && <span className="text-xs text-slate-500">{unit}</span>}
      </div>
      <ResponsiveContainer width="100%" height="88%">
        <LineChart data={data} margin={{ top: 5, right: 12, left: -20, bottom: 0 }}>
          <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: '#020617', border: '1px solid #334155', borderRadius: 12 }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
