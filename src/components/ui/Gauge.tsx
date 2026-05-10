interface GaugeProps {
  label: string;
  value: number;
  unit?: string;
  min?: number;
  max?: number;
}

export function Gauge({ label, value, unit, min = 0, max = 100 }: GaugeProps) {
  const normalized = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-950/50 p-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-slate-400">
        <span>{label}</span>
        <span>
          {value.toFixed(value % 1 === 0 ? 0 : 1)} {unit}
        </span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-slate-800">
        <div className="h-2 rounded-full bg-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.45)]" style={{ width: `${normalized}%` }} />
      </div>
    </div>
  );
}
