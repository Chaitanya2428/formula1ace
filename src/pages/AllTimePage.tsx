import { useEffect, useState, useCallback } from 'react';
import { Search, X, Award, Flag, Users, Clock, ChevronLeft, ChevronRight, Building2, MapPin, Ruler } from 'lucide-react';
import { supabase, type F1Driver, type F1Team, type F1Circuit } from '../lib/supabase';
import { Reveal } from '../components/Reveal';

type Tab = 'drivers' | 'teams' | 'circuits';
const PAGE_SIZE = 24;

export function AllTimePage() {
  const [tab, setTab] = useState<Tab>('drivers');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState<F1Driver[]>([]);
  const [teams, setTeams] = useState<F1Team[]>([]);
  const [circuits, setCircuits] = useState<F1Circuit[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<F1Driver | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<F1Team | null>(null);
  const [selectedCircuit, setSelectedCircuit] = useState<F1Circuit | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setPage(0);
      const offset = 0;
      const q = query.toLowerCase().trim();

      if (tab === 'drivers') {
        let countQuery = supabase.from('f1_drivers').select('*', { count: 'exact', head: true });
        let dataQuery = supabase.from('f1_drivers').select('*').order('championships', { ascending: false }).range(offset, offset + PAGE_SIZE - 1);
        if (q) {
          countQuery = countQuery.or(`name.ilike.%${q}%,nationality.ilike.%${q}%`);
          dataQuery = dataQuery.or(`name.ilike.%${q}%,nationality.ilike.%${q}%`);
        }
        const [countRes, dataRes] = await Promise.all([countQuery, dataQuery]);
        if (!cancelled) {
          setTotalCount(countRes.count || 0);
          setDrivers(dataRes.data || []);
        }
      } else if (tab === 'teams') {
        let countQuery = supabase.from('f1_teams').select('*', { count: 'exact', head: true });
        let dataQuery = supabase.from('f1_teams').select('*').order('championships', { ascending: false }).range(offset, offset + PAGE_SIZE - 1);
        if (q) {
          countQuery = countQuery.or(`name.ilike.%${q}%,nationality.ilike.%${q}%`);
          dataQuery = dataQuery.or(`name.ilike.%${q}%,nationality.ilike.%${q}%`);
        }
        const [countRes, dataRes] = await Promise.all([countQuery, dataQuery]);
        if (!cancelled) {
          setTotalCount(countRes.count || 0);
          setTeams(dataRes.data || []);
        }
      } else {
        let countQuery = supabase.from('f1_circuits').select('*', { count: 'exact', head: true });
        let dataQuery = supabase.from('f1_circuits').select('*').order('first_held', { ascending: true }).range(offset, offset + PAGE_SIZE - 1);
        if (q) {
          countQuery = countQuery.or(`name.ilike.%${q}%,country.ilike.%${q}%`);
          dataQuery = dataQuery.or(`name.ilike.%${q}%,country.ilike.%${q}%`);
        }
        const [countRes, dataRes] = await Promise.all([countQuery, dataQuery]);
        if (!cancelled) {
          setTotalCount(countRes.count || 0);
          setCircuits(dataRes.data || []);
        }
      }
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [tab, query]);

  const loadPage = useCallback(async (newPage: number) => {
    setLoading(true);
    const offset = newPage * PAGE_SIZE;
    const q = query.toLowerCase().trim();

    if (tab === 'drivers') {
      let dataQuery = supabase.from('f1_drivers').select('*').order('championships', { ascending: false }).range(offset, offset + PAGE_SIZE - 1);
      if (q) dataQuery = dataQuery.or(`name.ilike.%${q}%,nationality.ilike.%${q}%`);
      const { data } = await dataQuery;
      setDrivers(data || []);
    } else if (tab === 'teams') {
      let dataQuery = supabase.from('f1_teams').select('*').order('championships', { ascending: false }).range(offset, offset + PAGE_SIZE - 1);
      if (q) dataQuery = dataQuery.or(`name.ilike.%${q}%,nationality.ilike.%${q}%`);
      const { data } = await dataQuery;
      setTeams(data || []);
    } else {
      let dataQuery = supabase.from('f1_circuits').select('*').order('first_held', { ascending: true }).range(offset, offset + PAGE_SIZE - 1);
      if (q) dataQuery = dataQuery.or(`name.ilike.%${q}%,country.ilike.%${q}%`);
      const { data } = await dataQuery;
      setCircuits(data || []);
    }
    setPage(newPage);
    setLoading(false);
  }, [tab, query]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="page-enter pt-20 pb-20 px-4 md:px-6 max-w-[1400px] mx-auto">
      <Reveal>
        <div className="mb-8">
          <span className="f1-tag mb-3">Complete History</span>
          <h1 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight mt-2">All-Time Database</h1>
          <p className="mt-3 text-f1-silver max-w-2xl">Every driver, constructor, and circuit in Formula 1 history — {totalCount} records and counting.</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex gap-1 bg-f1-grey p-1">
            {(['drivers', 'teams', 'circuits'] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-wider transition-colors ${tab === t ? 'bg-f1-red text-white' : 'text-f1-silver hover:text-white'}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-f1-silver" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder={`Search ${tab}...`} className="f1-input pl-12" />
            {query && <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-f1-silver hover:text-f1-red"><X size={18} /></button>}
          </div>
        </div>
      </Reveal>

      <p className="text-sm text-f1-silver mb-4">{totalCount} {tab} found{totalPages > 1 ? ` · Page ${page + 1} of ${totalPages}` : ''}</p>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-f1-red border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {tab === 'drivers' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {drivers.map((d, i) => (
                <Reveal key={d.id} delay={(i % 6) * 30}>
                  <button onClick={() => setSelectedDriver(d)} className="f1-card w-full text-left group overflow-hidden">
                    <div className="relative h-40 overflow-hidden">
                      {d.photo_url ? (
                        <img src={d.photo_url} alt={d.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-f1-grey text-4xl">{d.flag}</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      {d.championships > 0 && <div className="absolute top-2 right-2 px-2 py-0.5 bg-f1-red text-[9px] font-display font-black uppercase text-white">{d.championships}x Champ</div>}
                      <div className="absolute bottom-2 left-3 text-xl">{d.flag}</div>
                    </div>
                    <div className="p-2.5">
                      <h3 className="font-display font-bold text-xs group-hover:text-f1-red transition-colors truncate">{d.name}</h3>
                      <p className="text-[10px] text-f1-silver truncate">{d.years_active}</p>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}

          {tab === 'teams' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.map((t, i) => (
                <Reveal key={t.id} delay={(i % 3) * 60}>
                  <button onClick={() => setSelectedTeam(t)} className="f1-card w-full text-left group overflow-hidden h-full">
                    <div className="relative h-32 overflow-hidden">
                      {t.logo_url ? (
                        <img src={t.logo_url} alt={t.name} loading="lazy" className="w-full h-full object-contain bg-white/5 group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-f1-grey text-3xl">{t.flag}</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-f1-dark to-transparent" />
                      {t.championships > 0 && <div className="absolute top-2 right-2 px-2 py-0.5 bg-f1-red text-[9px] font-display font-black uppercase text-white">{t.championships}x Champ</div>}
                    </div>
                    <div className="p-3">
                      <h3 className="font-display font-bold text-sm group-hover:text-f1-red transition-colors truncate">{t.name}</h3>
                      <p className="text-[10px] text-f1-silver truncate">{t.flag} {t.nationality} · {t.years_active}</p>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}

          {tab === 'circuits' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {circuits.map((c, i) => (
                <Reveal key={c.id} delay={(i % 3) * 60}>
                  <button onClick={() => setSelectedCircuit(c)} className="f1-card w-full text-left group overflow-hidden h-full">
                    <div className="relative h-36 overflow-hidden">
                      {c.map_url ? (
                        <img src={c.map_url} alt={c.name} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-f1-grey text-3xl">{c.flag}</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-f1-dark to-transparent" />
                      <div className="absolute top-3 left-3 text-2xl">{c.flag}</div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-display font-bold text-sm group-hover:text-f1-red transition-colors">{c.name}</h3>
                        <p className="text-[10px] text-f1-silver">{c.country}</p>
                      </div>
                    </div>
                    <div className="p-3 flex items-center justify-between text-[10px] text-f1-silver">
                      <span>{c.first_held}{c.last_held ? `–${c.last_held}` : '–present'}</span>
                      <span>{c.races_held} GP{c.races_held !== 1 ? 's' : ''}</span>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={() => loadPage(page - 1)} disabled={page === 0} className="w-10 h-10 flex items-center justify-center bg-f1-grey disabled:opacity-30 hover:text-f1-red transition-colors">
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm text-f1-silver font-display font-bold">{page + 1} / {totalPages}</span>
              <button onClick={() => loadPage(page + 1)} disabled={page >= totalPages - 1} className="w-10 h-10 flex items-center justify-center bg-f1-grey disabled:opacity-30 hover:text-f1-red transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}

      {selectedDriver && <DriverDetailModal driver={selectedDriver} onClose={() => setSelectedDriver(null)} />}
      {selectedTeam && <TeamDetailModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />}
      {selectedCircuit && <CircuitDetailModal circuit={selectedCircuit} onClose={() => setSelectedCircuit(null)} />}
    </div>
  );
}

function DriverDetailModal({ driver, onClose }: { driver: F1Driver; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90" />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar bg-f1-dark border border-white/10" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-white/10 flex items-center justify-center hover:text-f1-red transition-colors z-10" aria-label="Close"><X size={18} /></button>
        <div className="relative h-48 overflow-hidden">
          {driver.photo_url ? (
            <img src={driver.photo_url} alt={driver.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl bg-f1-grey">{driver.flag}</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-f1-dark to-transparent" />
          <div className="absolute bottom-4 left-5">
            <h2 className="font-display font-black text-xl md:text-2xl text-white">{driver.name}</h2>
            <p className="text-xs text-white/60">{driver.flag} {driver.nationality} · {driver.years_active}</p>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-5">
            {[
              { l: 'Titles', v: driver.championships, i: <Award size={12} /> },
              { l: 'Wins', v: driver.wins, i: <Flag size={12} /> },
              { l: 'Poles', v: driver.poles, i: <Users size={12} /> },
              { l: 'Podiums', v: driver.podiums, i: <Award size={12} /> },
              { l: 'Entries', v: driver.entries, i: <Clock size={12} /> },
            ].map(s => (
              <div key={s.l} className="bg-f1-grey p-2.5 text-center">
                <div className="flex items-center justify-center text-f1-red mb-1">{s.i}</div>
                <div className="font-display font-black text-lg text-white">{s.v}</div>
                <div className="text-[9px] uppercase tracking-wider text-f1-silver">{s.l}</div>
              </div>
            ))}
          </div>
          {driver.bio && (
            <div className="mb-5">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-f1-red mb-2">Biography</h3>
              <p className="text-sm text-f1-silver leading-relaxed">{driver.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TeamDetailModal({ team, onClose }: { team: F1Team; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90" />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar bg-f1-dark border border-white/10" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-white/10 flex items-center justify-center hover:text-f1-red transition-colors z-10" aria-label="Close"><X size={18} /></button>
        <div className="relative h-48 overflow-hidden">
          {team.logo_url ? (
            <img src={team.logo_url} alt={team.name} className="w-full h-full object-contain bg-white/5" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl bg-f1-grey">{team.flag}</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-f1-dark to-transparent" />
          <div className="absolute bottom-4 left-5">
            <h2 className="font-display font-black text-xl md:text-2xl text-white">{team.name}</h2>
            <p className="text-xs text-white/60">{team.flag} {team.nationality} · {team.years_active}</p>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
            {[
              { l: 'Titles', v: team.championships, i: <Award size={12} /> },
              { l: 'Wins', v: team.wins, i: <Flag size={12} /> },
              { l: 'Poles', v: team.poles, i: <Users size={12} /> },
              { l: 'Entries', v: team.entries, i: <Clock size={12} /> },
            ].map(s => (
              <div key={s.l} className="bg-f1-grey p-2.5 text-center">
                <div className="flex items-center justify-center text-f1-red mb-1">{s.i}</div>
                <div className="font-display font-black text-lg text-white">{s.v}</div>
                <div className="text-[9px] uppercase tracking-wider text-f1-silver">{s.l}</div>
              </div>
            ))}
          </div>
          {team.engine && (
            <div className="mb-3 flex items-center gap-2 text-sm text-f1-silver bg-f1-grey p-2.5"><Building2 size={14} className="text-f1-red" /> Engine: {team.engine}</div>
          )}
          {team.bio && (
            <div className="mb-5">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-f1-red mb-2">History</h3>
              <p className="text-sm text-f1-silver leading-relaxed">{team.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CircuitDetailModal({ circuit, onClose }: { circuit: F1Circuit; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90" />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar bg-f1-dark border border-white/10" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-white/10 flex items-center justify-center hover:text-f1-red transition-colors z-10" aria-label="Close"><X size={18} /></button>
        <div className="relative h-48 overflow-hidden">
          {circuit.map_url ? (
            <img src={circuit.map_url} alt={circuit.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl bg-f1-grey">{circuit.flag}</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-f1-dark to-transparent" />
          <div className="absolute bottom-4 left-5">
            <h2 className="font-display font-black text-xl md:text-2xl text-white">{circuit.name}</h2>
            <p className="text-xs text-white/60">{circuit.flag} {circuit.country}</p>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
            {[
              { l: 'First GP', v: circuit.first_held || '—', i: <Clock size={12} /> },
              { l: 'Last GP', v: circuit.last_held || 'Active', i: <Clock size={12} /> },
              { l: 'Races', v: circuit.races_held, i: <Flag size={12} /> },
              { l: 'Length', v: circuit.length || '—', i: <Ruler size={12} /> },
            ].map(s => (
              <div key={s.l} className="bg-f1-grey p-2.5 text-center">
                <div className="flex items-center justify-center text-f1-red mb-1">{s.i}</div>
                <div className="font-display font-black text-lg text-white">{s.v}</div>
                <div className="text-[9px] uppercase tracking-wider text-f1-silver">{s.l}</div>
              </div>
            ))}
          </div>
          {circuit.gp_name && (
            <div className="flex items-center gap-2 text-sm text-f1-silver bg-f1-grey p-2.5 mb-3"><MapPin size={14} className="text-f1-red" /> Grand Prix: {circuit.gp_name}</div>
          )}
        </div>
      </div>
    </div>
  );
}
