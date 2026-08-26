import { useEffect, useState } from 'react';
import { Trophy, Car } from 'lucide-react';
import { driverStandings, constructorStandings, type StandingRow } from '../data/standings';
import { Reveal } from '../components/Reveal';

export function StandingsPage() {
  const [tab, setTab] = useState<'drivers' | 'constructors'>('drivers');
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, [tab]);

  const data = tab === 'drivers' ? driverStandings : constructorStandings;
  const maxPoints = Math.max(...data.map(r => r.points));

  return (
    <div className="page-enter pt-20 pb-20 px-4 md:px-6 max-w-[1000px] mx-auto">
      <Reveal>
        <div className="mb-8">
          <span className="f1-tag mb-3">2026 Championship</span>
          <h1 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight mt-2">Standings</h1>
          <p className="mt-3 text-f1-silver max-w-2xl">Live driver and constructor championship points.</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="flex gap-1 mb-6 p-1 bg-f1-grey w-fit">
          <button onClick={() => setTab('drivers')} className={`flex items-center gap-2 px-5 py-2 font-display font-bold text-xs uppercase tracking-wider transition-all ${tab === 'drivers' ? 'bg-f1-red text-white' : 'text-f1-silver hover:text-white'}`}>
            <Trophy size={14} /> Drivers
          </button>
          <button onClick={() => setTab('constructors')} className={`flex items-center gap-2 px-5 py-2 font-display font-bold text-xs uppercase tracking-wider transition-all ${tab === 'constructors' ? 'bg-f1-red text-white' : 'text-f1-silver hover:text-white'}`}>
            <Car size={14} /> Constructors
          </button>
        </div>
      </Reveal>

      <Reveal>
        <div className="f1-card overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[50px_1fr_60px_80px] md:grid-cols-[60px_1fr_160px_80px_60px] gap-3 px-4 py-3 border-b border-white/10 text-[10px] font-display font-bold uppercase tracking-wider text-f1-silver bg-f1-grey">
            <div>Pos</div>
            <div>{tab === 'drivers' ? 'Driver' : 'Team'}</div>
            <div className="hidden md:block">Team</div>
            <div className="text-right">Pts</div>
            <div className="text-right">Wins</div>
          </div>
          {data.map((row, i) => (
            <StandingRowItem key={row.position} row={row} index={i} animated={animated} maxPoints={maxPoints} />
          ))}
        </div>
      </Reveal>
    </div>
  );
}

function StandingRowItem({ row, index, animated, maxPoints }: { row: StandingRow; index: number; animated: boolean; maxPoints: number }) {
  const barWidth = animated ? (row.points / maxPoints) * 100 : 0;
  return (
    <div className="relative grid grid-cols-[50px_1fr_60px_80px] md:grid-cols-[60px_1fr_160px_80px_60px] gap-3 px-4 py-3 border-b border-white/5 items-center hover:bg-f1-red/5 transition-colors" style={{ transitionDelay: `${index * 25}ms` }}>
      <div className="absolute left-0 top-0 bottom-0 opacity-10 transition-all duration-1000 ease-out" style={{ width: `${barWidth}%`, background: `linear-gradient(90deg, ${row.color}, transparent)`, transitionDelay: `${index * 25}ms` }} />
      <div className={`relative font-display font-black text-base ${row.position <= 3 ? 'text-f1-red' : 'text-f1-silver'}`}>{row.position}</div>
      <div className="relative flex items-center gap-2.5 min-w-0">
        <div className="w-1 h-7 shrink-0" style={{ background: row.color }} />
        <span className="font-display font-bold text-sm truncate">{row.name}</span>
      </div>
      <div className="relative hidden md:block text-xs text-f1-silver truncate">{row.team}</div>
      <div className="relative text-right font-display font-black text-base tabular-nums">{row.points}</div>
      <div className="relative text-right text-xs text-f1-silver tabular-nums">{row.wins}</div>
    </div>
  );
}
