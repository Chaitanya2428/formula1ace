import { useEffect, useMemo, useState } from 'react';
import { Search, X, User, Users, MapPin, Flag, Trophy } from 'lucide-react';
import { drivers } from '../data/drivers';
import { teams } from '../data/teams';
import { circuits } from '../data/circuits';
import { races } from '../data/races';
import { driverStandings } from '../data/standings';
import { useRouter } from '../lib/router';

interface SearchResult {
  type: 'Driver' | 'Team' | 'Circuit' | 'Grand Prix' | 'Champion';
  title: string;
  subtitle: string;
  path: string;
  icon: React.ReactNode;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: Props) {
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');

  const results = useMemo<SearchResult[]>(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const res: SearchResult[] = [];

    drivers.forEach(d => {
      if (d.name.toLowerCase().includes(q) || d.nationality.toLowerCase().includes(q)) {
        res.push({ type: 'Driver', title: d.name, subtitle: `#${d.number} · ${d.nationality} · ${teams.find(t => t.id === d.team)?.name ?? ''}`, path: '/drivers', icon: <User size={18} /> });
      }
    });
    teams.forEach(t => {
      if (t.name.toLowerCase().includes(q) || t.principal.toLowerCase().includes(q)) {
        res.push({ type: 'Team', title: t.name, subtitle: `${t.principal} · ${t.engine}`, path: '/teams', icon: <Users size={18} /> });
      }
    });
    circuits.forEach(c => {
      if (c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)) {
        res.push({ type: 'Circuit', title: c.name, subtitle: `${c.country} · ${c.length}`, path: '/circuits', icon: <MapPin size={18} /> });
      }
    });
    races.forEach(r => {
      if (r.name.toLowerCase().includes(q) || r.country.toLowerCase().includes(q)) {
        res.push({ type: 'Grand Prix', title: r.name, subtitle: `${r.circuit} · ${r.country}`, path: '/calendar', icon: <Flag size={18} /> });
      }
    });
    driverStandings.slice(0, 5).forEach(s => {
      if (s.name.toLowerCase().includes(q)) {
        res.push({ type: 'Champion', title: s.name, subtitle: `P${s.position} · ${s.points} pts · ${s.team}`, path: '/standings', icon: <Trophy size={18} /> });
      }
    });
    return res.slice(0, 20);
  }, [query]);

  useEffect(() => { if (!open) setQuery(''); }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const typeColor: Record<string, string> = {
    Driver: 'text-f1-red', Team: 'text-blue-400', Circuit: 'text-green-400',
    'Grand Prix': 'text-orange-400', Champion: 'text-yellow-400',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90" />
      <div className="relative w-full max-w-2xl bg-f1-dark border border-white/10 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <Search size={20} className="text-f1-red shrink-0" />
          <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search drivers, teams, circuits, Grands Prix, champions..."
            className="flex-1 bg-transparent outline-none text-base placeholder:text-f1-silver/50" />
          <button onClick={onClose} aria-label="Close" className="text-f1-silver hover:text-f1-red transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
          {query.trim() === '' ? (
            <div className="px-5 py-12 text-center text-f1-silver text-sm">Start typing to search across Formula One Ace.</div>
          ) : results.length === 0 ? (
            <div className="px-5 py-12 text-center text-f1-silver text-sm">No results found for "{query}".</div>
          ) : (
            <ul className="py-1">
              {results.map((r, i) => (
                <li key={i}>
                  <button onClick={() => { navigate(r.path); onClose(); }}
                    className="w-full flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-colors text-left group">
                    <span className={`shrink-0 ${typeColor[r.type]}`}>{r.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-semibold truncate group-hover:text-f1-red transition-colors">{r.title}</div>
                      <div className="text-xs text-f1-silver truncate">{r.subtitle}</div>
                    </div>
                    <span className={`text-[10px] font-display font-bold uppercase tracking-wider ${typeColor[r.type]} shrink-0`}>{r.type}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
