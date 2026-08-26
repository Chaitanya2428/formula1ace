import { Trophy, Flag, Users, Zap, Clock } from 'lucide-react';
import { driverStandings, constructorStandings, livePoints } from '../data/standings';
import { Reveal } from '../components/Reveal';

export function LivePointsPage() {
  return (
    <div className="page-enter pt-20 pb-20 px-4 md:px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <div className="mb-8">
          <span className="f1-tag mb-3">Real-Time Data</span>
          <h1 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight mt-2">Live Points</h1>
          <p className="mt-3 text-f1-silver max-w-2xl">Latest results and championship snapshots. Placeholder data — ready to connect to a live F1 API.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { icon: <Trophy size={16} />, label: 'Race Winner', name: livePoints.raceWinner.name, sub: livePoints.raceWinner.team, extra: livePoints.raceWinner.grandPrix, color: livePoints.raceWinner.color },
          { icon: <Zap size={16} />, label: 'Fastest Lap', name: livePoints.fastestLap.name, sub: livePoints.fastestLap.team, extra: livePoints.fastestLap.time, color: livePoints.fastestLap.color, mono: true },
          { icon: <Flag size={16} />, label: 'Most Pole Positions', name: livePoints.mostPoles.name, sub: livePoints.mostPoles.team, extra: String(livePoints.mostPoles.count), color: livePoints.mostPoles.color, big: true },
        ].map((c, i) => (
          <Reveal key={c.label} delay={i * 80}>
            <div className="f1-card p-5 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-10" style={{ background: c.color }} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-f1-red">{c.icon}</span>
                  <span className="text-[10px] font-display font-bold uppercase tracking-wider text-f1-silver">{c.label}</span>
                </div>
                <h3 className="font-display font-black text-xl mb-1">{c.name}</h3>
                <p className="text-sm text-f1-silver">{c.sub}</p>
                <p className={`mt-2 font-display font-black ${c.big ? 'text-3xl text-f1-red' : c.mono ? 'text-lg font-mono text-f1-red' : 'text-sm text-f1-silver'}`}>{c.extra}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="f1-card p-5 md:p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <Trophy size={16} className="text-f1-red" />
            <h2 className="font-display font-bold text-sm uppercase tracking-wider">Last Race Podium</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {livePoints.lastPodium.map(p => (
              <div key={p.pos} className="text-center bg-f1-grey p-4">
                <div className="font-display font-black text-4xl text-f1-red mb-2">{p.pos}</div>
                <div className="w-1 h-8 mx-auto mb-3" style={{ background: p.color }} />
                <div className="font-display font-bold text-sm">{p.name}</div>
                <div className="text-xs text-f1-silver">{p.team}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Reveal>
          <div className="f1-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users size={16} className="text-f1-red" />
              <h2 className="font-display font-bold text-xs uppercase tracking-wider">Driver Standings</h2>
            </div>
            <div className="space-y-1.5">
              {driverStandings.slice(0, 5).map(s => (
                <div key={s.position} className="flex items-center gap-3 bg-f1-grey p-2.5">
                  <span className="font-display font-black text-base text-f1-red w-6">{s.position}</span>
                  <div className="w-1 h-8" style={{ background: s.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-sm truncate">{s.name}</div>
                    <div className="text-xs text-f1-silver truncate">{s.team}</div>
                  </div>
                  <div className="font-display font-black text-base tabular-nums">{s.points}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="f1-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-f1-red" />
              <h2 className="font-display font-bold text-xs uppercase tracking-wider">Constructor Standings</h2>
            </div>
            <div className="space-y-1.5">
              {constructorStandings.slice(0, 5).map(s => (
                <div key={s.position} className="flex items-center gap-3 bg-f1-grey p-2.5">
                  <span className="font-display font-black text-base text-f1-red w-6">{s.position}</span>
                  <div className="w-1 h-8" style={{ background: s.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-sm truncate">{s.name}</div>
                    <div className="text-xs text-f1-silver">{s.wins} wins</div>
                  </div>
                  <div className="font-display font-black text-base tabular-nums">{s.points}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
