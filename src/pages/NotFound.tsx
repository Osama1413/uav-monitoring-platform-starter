import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">404</p>
      <h1 className="mt-3 text-3xl font-black text-slate-100">Screen not found</h1>
      <p className="mt-2 max-w-md text-slate-400">The requested UAV console screen does not exist.</p>
      <Link to="/flight" className="mt-6 rounded-xl bg-sky-400 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-slate-950">
        Return to Flight Display
      </Link>
    </div>
  );
}
