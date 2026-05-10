interface CompassProps {
  headingDeg: number;
}

export function Compass({ headingDeg }: CompassProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-56 rounded-full border border-slate-700 bg-slate-950/80">
      <div className="absolute inset-4 rounded-full border border-slate-700" />
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-400">
        <span className="absolute top-3">N</span>
        <span className="absolute bottom-3">S</span>
        <span className="absolute left-3">W</span>
        <span className="absolute right-3">E</span>
      </div>
      <div
        className="absolute left-1/2 top-1/2 h-[45%] w-1 origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.7)] transition-transform duration-500"
        style={{ transform: `translateX(-50%) translateY(-100%) rotate(${headingDeg}deg)` }}
      />
      <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-200" />
      <div className="absolute bottom-8 left-0 right-0 text-center text-xl font-black text-slate-100">{Math.round(headingDeg).toString().padStart(3, '0')}°</div>
    </div>
  );
}
