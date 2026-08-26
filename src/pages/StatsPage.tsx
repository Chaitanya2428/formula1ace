import { Crown, Trophy, Flag, Gauge, Zap, Clock, BarChart3, TrendingUp } from 'lucide-react';
import { statistics, mostSuccessfulTeams } from '../data/statistics';
import { Reveal } from '../components/Reveal';
import { AnimatedCounter } from '../components/AnimatedCounter';

const ICONS: Record<string, React.ReactNode> = {
  crown: <Crown size={18} />,
  trophy: <Trophy size={18} />,
  flag: <Flag size={18} />,
  gauge: <Gauge size={18} />,
  zap: <Zap size={18} />,
  clock: <Clock size={18} />,
  'bar-chart': <BarChart3 size={18} />,
  'trending-up': <TrendingUp size={18} />,
};

export function StatsPage() {
  const maxTeamValue = Math.max(...mostSuccessfulTeams.map(t => t.value));

  return (
    <div className="page-enter pt-20 pb-20 px-4 md:px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <div className="mb-8">
          <span className="f1-tag mb-3">All-Time Records</span>
          <h1 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight mt-2">Statistics</h1>
          <p className="mt-3 text-f1-silver max-w-2xl">The numbers that define greatness in Formula 1.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statistics.map((s, i) => (
          <Reveal key={s.label} delay={(i % 4) * 70}>
            <div className="f1-card p-5 h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 blur-3xl opacity-5 bg-f1-red group-hover:opacity-15 transition-opacity" />
              <div className="relative">
                <div className="text-f1-red mb-3">{ICONS[s.icon]}</div>
                <div className="font-display font-black text-3xl mb-1">{s.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-f1-silver mb-2">{s.label}</div>
                <div className="text-xs text-white/80">{s.detail}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="f1-card p-6">
          <h2 className="font-display font-bold text-lg uppercase tracking-wide mb-6 flex items-center gap-2"><Trophy size={18} className="text-f1-red" /> Most Successful Teams</h2>
          <div className="space-y-4">
            {mostSuccessfulTeams.map((t, i) => (
              <div key={t.label} className="flex items-center gap-4">
                <div className="font-display font-black text-sm text-f1-silver w-8 text-right">{i + 1}</div>
                <div className="w-1 h-8 shrink-0" style={{ background: t.color }} />
                <div className="w-24 shrink-0">
                  <div className="font-display font-bold text-sm">{t.label}</div>
                  <div className="text-[10px] text-f1-silver">{t.team}</div>
                </div>
                <div className="flex-1 h-6 bg-f1-grey relative overflow-hidden">
                  <div className="h-full transition-all duration-1000 ease-out flex items-center justify-end pr-2" style={{ width: `${(t.value / maxTeamValue) * 100}%`, background: `linear-gradient(90deg, ${t.color}80, ${t.color})`, transitionDelay: `${i * 100}ms` }}>
                    <span className="font-display font-black text-sm text-white"><AnimatedCounter value={t.value} label="" /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
