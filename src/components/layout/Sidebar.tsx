import { NavLink } from 'react-router-dom';
import { Activity, AlertTriangle, BarChart3, Gauge, HeartPulse, Map, Plane, Radio, RotateCcw, Settings } from 'lucide-react';

const navItems = [
  { to: '/flight', label: 'Flight', icon: Plane },
  { to: '/mission', label: 'Mission', icon: Map },
  { to: '/warnings', label: 'Warnings', icon: AlertTriangle },
  { to: '/health', label: 'Health', icon: HeartPulse },
  { to: '/systems', label: 'Systems', icon: Settings },
  { to: '/payload-datalink', label: 'Payload / Link', icon: Radio },
  { to: '/replay', label: 'Replay', icon: RotateCcw },
  { to: '/analysis', label: 'Analysis', icon: BarChart3 },
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-800 bg-slate-950/90 p-4 lg:block">
      <div className="mb-8 flex items-center gap-3 rounded-2xl border border-sky-400/20 bg-sky-400/10 p-3">
        <div className="rounded-xl bg-sky-400/20 p-2 text-sky-300">
          <Gauge className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-bold tracking-[0.2em] text-slate-100">UAV GCS</p>
          <p className="text-xs text-slate-400">Simulated Monitoring Platform</p>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-sky-400/15 text-sky-200 shadow-[inset_3px_0_0_rgba(56,189,248,0.9)]'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          <Activity className="h-4 w-4" /> Platform Scope
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Software-only UAV telemetry simulation, monitoring, warnings, health, logging, replay, and analysis.
        </p>
      </div>
    </aside>
  );
}
