import { useMemo, useState } from 'react';
import { Search, X, Twitter, Instagram, Award, Flag, Users, Clock } from 'lucide-react';
import { drivers, type Driver } from '../data/drivers';
import { teams } from '../data/teams';
import { Reveal } from '../components/Reveal';

export function DriversPage() {
  const [query, setQuery] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');
  const [selected, setSelected] = useState<Driver | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return drivers.filter(d => {
      const mq = !q || d.name.toLowerCase().includes(q) || d.nationality.toLowerCase().includes(q) || String(d.number).includes(q);
      const mt = teamFilter === 'all' || d.team === teamFilter;
      return mq && mt;
    });
  }, [query, teamFilter]);

  return (
    <div className="page-enter pt-20 pb-20 px-4 md:px-6 max-w-[1400px] mx-auto">
      <Reveal>
        <div className="mb-8">
          <span className="f1-tag mb-3">The Grid</span>
          <h1 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight mt-2">Drivers</h1>
          <p className="mt-3 text-f1-silver max-w-2xl">All 22 drivers competing in the 2026 Formula 1 World Championship.</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-f1-silver" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name, nationality, or number..." className="f1-input pl-12" />
            {query && <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-f1-silver hover:text-f1-red"><X size={18} /></button>}
          </div>
          <select value={teamFilter} onChange={e => setTeamFilter(e.target.value)} className="f1-input md:w-56 cursor-pointer">
            <option value="all">All Teams</option>
            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
      </Reveal>

      <p className="text-sm text-f1-silver mb-4">{filtered.length} driver{filtered.length !== 1 ? 's' : ''} found</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((d, i) => {
          const team = teams.find(t => t.id === d.team);
          return (
            <Reveal key={d.id} delay={(i % 5) * 50}>
              <button onClick={() => setSelected(d)} className="f1-card w-full text-left group overflow-hidden">
                <div className="relative h-44 overflow-hidden">
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity" style={{ background: `linear-gradient(135deg, ${d.teamColor}, transparent)` }} />
                  <img src={d.photo} alt={d.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-2 right-2 w-10 h-10 bg-f1-red flex items-center justify-center font-display font-black text-lg text-white" style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}>
                    {d.number}
                  </div>
                  <div className="absolute bottom-2 left-3 text-2xl">{d.flag}</div>
                </div>
                <div className="p-3">
                  <h3 className="font-display font-bold text-sm group-hover:text-f1-red transition-colors truncate">{d.name}</h3>
                  <p className="text-xs text-f1-silver truncate">{team?.name}</p>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      {filtered.length === 0 && <div className="text-center py-20 text-f1-silver">No drivers match your search.</div>}
      {selected && <DriverModal driver={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function DriverModal({ driver, onClose }: { driver: Driver; onClose: () => void }) {
  const team = teams.find(t => t.id === driver.team);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90" />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar bg-f1-dark border border-white/10" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-white/10 flex items-center justify-center hover:text-f1-red transition-colors z-10" aria-label="Close"><X size={18} /></button>
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${driver.teamColor}60, transparent)` }} />
          <img src={driver.photo} alt={driver.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-f1-dark to-transparent" />
          <div className="absolute bottom-4 left-5 flex items-end gap-3">
            <div className="w-14 h-14 bg-f1-red flex items-center justify-center font-display font-black text-2xl text-white" style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}>{driver.number}</div>
            <div>
              <h2 className="font-display font-black text-xl md:text-2xl text-white">{driver.name}</h2>
              <p className="text-xs text-white/60">{driver.flag} {driver.nationality} · {team?.name}</p>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-5">
            {[
              { l: 'Age', v: driver.age, i: <Clock size={12} /> },
              { l: 'Titles', v: driver.championships, i: <Award size={12} /> },
              { l: 'Wins', v: driver.wins, i: <Flag size={12} /> },
              { l: 'Poles', v: driver.poles, i: <Users size={12} /> },
              { l: 'Fast Laps', v: driver.fastestLaps, i: <Flag size={12} /> },
              { l: 'Team', v: team?.name.split(' ')[0] ?? '', i: <Users size={12} /> },
            ].map(s => (
              <div key={s.l} className="bg-f1-grey p-2.5 text-center">
                <div className="flex items-center justify-center text-f1-red mb-1">{s.i}</div>
                <div className="font-display font-black text-lg text-white">{s.v}</div>
                <div className="text-[9px] uppercase tracking-wider text-f1-silver">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mb-5">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-f1-red mb-2">Biography</h3>
            <p className="text-sm text-f1-silver leading-relaxed">{driver.bio}</p>
          </div>
          <div className="mb-5">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-f1-red mb-2">Team</h3>
            <div className="flex items-center gap-3 bg-f1-grey p-3">
              <div className="w-1.5 h-8" style={{ background: driver.teamColor }} />
              <div><div className="font-display font-bold text-sm">{team?.fullName}</div><div className="text-xs text-f1-silver">{team?.principal} · {team?.engine}</div></div>
            </div>
          </div>
          <div>
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-f1-red mb-2">Social Media</h3>
            <div className="flex gap-2">
              <a href={driver.social.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-f1-grey hover:text-f1-red transition-colors text-xs"><Twitter size={14} /> Twitter</a>
              <a href={driver.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-f1-grey hover:text-f1-red transition-colors text-xs"><Instagram size={14} /> Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
