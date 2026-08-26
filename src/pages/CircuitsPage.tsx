import { useState } from 'react';
import { Ruler, Repeat, Gauge, Cloud, Trophy } from 'lucide-react';
import { circuits, type Circuit } from '../data/circuits';
import { Reveal } from '../components/Reveal';

export function CircuitsPage() {
  const [search, setSearch] = useState('');
  const filtered = circuits.filter(
    c => c.name.toLowerCase().includes(search.toLowerCase()) || c.country.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="page-enter pt-20 pb-20 px-4 md:px-6 max-w-[1400px] mx-auto">
      <Reveal>
        <div className="mb-8">
          <span className="f1-tag mb-3">2026 Calendar</span>
          <h1 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight mt-2">Circuits</h1>
          <p className="mt-3 text-f1-silver max-w-2xl">All 24 circuits on the 2026 calendar — track details, lap records, and last winners.</p>
        </div>
      </Reveal>

      <Reveal>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search circuits or countries..."
          className="f1-input w-full mb-6"
        />
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((c, i) => (
          <Reveal key={c.id} delay={(i % 4) * 50}>
            <CircuitCard circuit={c} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function CircuitCard({ circuit }: { circuit: Circuit }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      onClick={() => setExpanded(v => !v)}
      className="w-full text-left group block bg-f1-dark border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden"
    >
      {/* Photo section — F1 schedule style */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={circuit.map}
          alt={circuit.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Round badge — top left */}
        <div className="absolute top-3 left-3 bg-f1-red px-2 py-0.5">
          <span className="font-display font-black text-[10px] uppercase tracking-wider text-white">Round {circuit.round}</span>
        </div>

        {/* Country + flag — bottom left */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-display font-black text-base leading-tight text-white group-hover:text-f1-red transition-colors">
                {circuit.country}
              </h3>
              <p className="text-[11px] text-white/60 mt-0.5">{circuit.name}</p>
            </div>
            <span className="text-2xl">{circuit.flag}</span>
          </div>
        </div>
      </div>

      {/* Dates strip */}
      <div className="bg-f1-grey px-4 py-2 flex items-center justify-between border-b border-white/5">
        <span className="text-[11px] font-display font-bold uppercase tracking-widest text-f1-silver">{circuit.dates}</span>
        <span className="text-[10px] text-f1-silver/60">{circuit.laps} laps · {circuit.length}</span>
      </div>

      {/* Details */}
      <div className="p-3 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {[
            { i: <Gauge size={10} />, l: 'Lap Record', v: circuit.lapRecord },
            { i: <Cloud size={10} />, l: 'Weather', v: circuit.weather },
          ].map(s => (
            <div key={s.l} className="bg-f1-grey/50 p-2">
              <div className="flex items-center gap-1 text-f1-red mb-0.5">{s.i}<span className="text-[9px] uppercase tracking-wider text-f1-silver">{s.l}</span></div>
              <div className="text-xs font-display font-bold truncate">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-f1-red/10 px-3 py-2">
          <Trophy size={12} className="text-f1-red shrink-0" />
          <div className="min-w-0">
            <div className="text-[9px] uppercase tracking-wider text-f1-silver">Last Winner</div>
            <div className="text-xs font-display font-bold truncate">{circuit.lastWinner}</div>
          </div>
        </div>

        {expanded && (
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5 animate-fade-in">
            {[
              { i: <Ruler size={10} />, l: 'Track Length', v: circuit.length },
              { i: <Repeat size={10} />, l: 'Total Laps', v: String(circuit.laps) },
            ].map(s => (
              <div key={s.l} className="bg-f1-grey/50 p-2">
                <div className="flex items-center gap-1 text-f1-red mb-0.5">{s.i}<span className="text-[9px] uppercase tracking-wider text-f1-silver">{s.l}</span></div>
                <div className="text-xs font-display font-bold">{s.v}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
