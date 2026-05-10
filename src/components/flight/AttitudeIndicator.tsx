interface AttitudeIndicatorProps {
  rollDeg: number;
  pitchDeg: number;
}

export function AttitudeIndicator({ rollDeg, pitchDeg }: AttitudeIndicatorProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-72 overflow-hidden rounded-full border-4 border-slate-700 bg-slate-950 shadow-inner">
      <div
        className="absolute inset-[-25%] transition-transform duration-500"
        style={{
          transform: `rotate(${-rollDeg}deg) translateY(${pitchDeg * 1.5}px)`,
        }}
      >
        <div className="h-1/2 bg-sky-500/80" />
        <div className="h-1/2 bg-amber-700/80" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-0.5 w-28 bg-yellow-300" />
      </div>
      <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-yellow-300" />
      <div className="absolute inset-x-0 top-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">ATT</div>
      <div className="absolute bottom-4 left-0 right-0 text-center text-sm font-bold text-slate-100">
        R {rollDeg.toFixed(1)}° / P {pitchDeg.toFixed(1)}°
      </div>
    </div>
  );
}
