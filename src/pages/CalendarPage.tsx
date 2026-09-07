import { useState } from 'react';
import { MapPin, Zap } from 'lucide-react';
import { races, type Race } from '../data/races';
import { Reveal } from '../components/Reveal';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export function CalendarPage() {
  const [filter, setFilter] = useState<'all' | 'sprint' | 'past' | 'upcoming'>('all');
  const now = new Date('2026-09-07');

  const filtered = races.filter(r => {
    const d = new Date(r.date);
    if (filter === 'sprint') return r.sprint;
    if (filter === 'past') return d < now;
    if (filter === 'upcoming') return d >= now;
    return true;
  });

  return (
    <div className="page-enter pt-20 pb-20 px-4 md:px-6 max-w-[1000px] mx-auto">
      <Reveal>
        <div className="mb-8">
          <span className="f1-tag mb-3">2026 Season</span>
          <h1 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight mt-2">Race Calendar</h1>
          <p className="mt-3 text-f1-silver max-w-2xl">All 24 rounds of the 2026 F1 season. Sprint races marked with a bolt icon.</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="flex flex-wrap gap-1 mb-6 p-1 bg-f1-grey w-fit">
          {(['all', 'upcoming', 'past', 'sprint'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 font-display font-bold text-xs uppercase tracking-wider transition-all ${filter === f ? 'bg-f1-red text-white' : 'text-f1-silver hover:text-white'}`}>
              {f === 'all' ? 'All Races' : f === 'sprint' ? 'Sprint' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="space-y-2">
        {filtered.map((r, i) => (
          <Reveal key={r.round} delay={Math.min(i, 8) * 40}>
            <RaceRow race={r} now={now} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function RaceRow({ race, now }: { race: Race; now: Date }) {
  const d = new Date(race.date);
  const past = d < now;
  const day = d.getDate();
  const month = MONTHS[d.getMonth()];

  return (
    <div className="f1-card group flex items-center gap-4 p-3 md:p-4 hover:border-f1-red/40 transition-colors">
      <div className="flex flex-col items-center justify-center w-14 md:w-16 shrink-0 bg-f1-grey p-2">
        <span className="text-[10px] font-display font-bold text-f1-silver">{month}</span>
        <span className="font-display font-black text-xl md:text-2xl leading-none">{String(day).padStart(2, '0')}</span>
      </div>
      <div className="w-px h-10 bg-white/10 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-display font-bold text-sm md:text-base group-hover:text-f1-red transition-colors">{race.name}</h3>
          {race.sprint && <span className="flex items-center gap-1 px-1.5 py-0.5 bg-f1-red/20 text-f1-red text-[9px] font-display font-bold uppercase"><Zap size={9} />Sprint</span>}
          {past && <span className="px-1.5 py-0.5 bg-white/10 text-f1-silver text-[9px] font-display font-bold uppercase">Done</span>}
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs text-f1-silver">
          <MapPin size={11} className="text-f1-red" />
          <span className="truncate">{race.circuit}</span>
        </div>
      </div>
      <div className="text-2xl md:text-3xl shrink-0">{race.flag}</div>
      <div className="hidden md:flex items-center justify-center w-10 shrink-0">
        <div className="font-display font-black text-sm text-f1-silver">R{race.round}</div>
      </div>
      <div className="shrink-0">
        <button className="btn-f1-outline text-[10px] py-1.5 px-3">Details</button>
      </div>
    </div>
  );
}
