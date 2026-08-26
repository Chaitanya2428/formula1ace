import { useState } from 'react';
import { X, Trophy, Flag } from 'lucide-react';
import { legends, type Legend } from '../data/legends';
import { Reveal } from '../components/Reveal';

export function LegendsPage() {
  const [selected, setSelected] = useState<Legend | null>(null);

  return (
    <div className="page-enter pt-20 pb-20 px-4 md:px-6 max-w-[1400px] mx-auto">
      <Reveal>
        <div className="mb-8">
          <span className="f1-tag mb-3">Hall of Fame</span>
          <h1 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight mt-2">Legends</h1>
          <p className="mt-3 text-f1-silver max-w-2xl">The greatest drivers to ever grace Formula 1 — champions who defined eras.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {legends.map((l, i) => (
          <Reveal key={l.id} delay={(i % 4) * 60}>
            <button onClick={() => setSelected(l)} className="f1-card overflow-hidden group h-full flex flex-col text-left w-full">
              <div className="relative h-56 overflow-hidden">
                <img src={l.photo} alt={l.name} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-f1-dark via-f1-dark/40 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-black/70">
                  <Trophy size={11} className="text-f1-red" />
                  <span className="text-[10px] font-display font-bold uppercase">{l.championships}x Champ</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-display font-black text-lg leading-tight">{l.name}</h3>
                  <p className="text-xs text-f1-silver">{l.flag} {l.years}</p>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between text-xs">
                <span className="text-f1-silver">{l.wins} wins · {l.poles} poles</span>
                <span className="text-f1-red font-display font-bold uppercase group-hover:translate-x-1 transition-transform">View →</span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {selected && <LegendModal legend={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function LegendModal({ legend, onClose }: { legend: Legend; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90" />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar bg-f1-dark border border-white/10" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-white/10 flex items-center justify-center hover:text-f1-red transition-colors z-10" aria-label="Close"><X size={18} /></button>
        <div className="relative h-56 overflow-hidden">
          <img src={legend.photo} alt={legend.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-f1-dark to-transparent" />
          <div className="absolute bottom-4 left-5">
            <h2 className="font-display font-black text-2xl">{legend.name}</h2>
            <p className="text-sm text-f1-silver">{legend.flag} {legend.nationality} · {legend.years}</p>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-2 mb-5">
            {legend.stats.map(s => (
              <div key={s.label} className="bg-f1-grey p-3 text-center">
                <div className="font-display font-black text-2xl text-f1-red">{s.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-f1-silver mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mb-5">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-f1-red mb-2">Biography</h3>
            <p className="text-sm text-f1-silver leading-relaxed">{legend.bio}</p>
          </div>
          <div className="mb-5">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-f1-red mb-2">Famous Races</h3>
            <ul className="space-y-1.5">
              {legend.famousRaces.map(r => (
                <li key={r} className="flex items-start gap-2 text-sm text-f1-silver"><Flag size={12} className="text-f1-red mt-0.5 shrink-0" /> {r}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-f1-red mb-2">Career Timeline</h3>
            <div className="space-y-2 border-l-2 border-f1-red/30 pl-4">
              {legend.timeline.map(t => (
                <div key={t.year} className="relative">
                  <div className="absolute -left-[22px] top-1 w-2 h-2 bg-f1-red rounded-full" />
                  <div className="font-display font-bold text-sm">{t.year}</div>
                  <div className="text-xs text-f1-silver">{t.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
