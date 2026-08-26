import { Clock, Swords, Flag, MapPin } from 'lucide-react';
import { historyEras, rivalries, famousRaces, iconicCircuits } from '../data/history';
import { Reveal } from '../components/Reveal';

export function HistoryPage() {
  return (
    <div className="page-enter pt-20 pb-20 px-4 md:px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <div className="mb-10">
          <span className="f1-tag mb-3">The Story</span>
          <h1 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight mt-2">History of F1</h1>
          <p className="mt-3 text-f1-silver max-w-2xl">From 1950 to the modern era — the eras, rivalries, and moments that built Formula 1.</p>
        </div>
      </Reveal>

      <section className="mb-12">
        <Reveal><h2 className="font-display font-bold text-lg uppercase tracking-wide mb-5 flex items-center gap-2"><Clock size={18} className="text-f1-red" /> Eras</h2></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {historyEras.map((e, i) => (
            <Reveal key={e.id} delay={(i % 3) * 70}>
              <div className="f1-card overflow-hidden group h-full">
                <div className="relative h-40 overflow-hidden">
                  <img src={e.image} alt={e.title} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-f1-dark to-transparent" />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-f1-red text-white text-[10px] font-display font-bold uppercase">{e.category}</div>
                  <div className="absolute bottom-3 left-3 font-display font-black text-2xl">{e.year}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-base mb-1.5 group-hover:text-f1-red transition-colors">{e.title}</h3>
                  <p className="text-xs text-f1-silver leading-relaxed">{e.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <Reveal><h2 className="font-display font-bold text-lg uppercase tracking-wide mb-5 flex items-center gap-2"><Swords size={18} className="text-f1-red" /> Great Rivalries</h2></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rivalries.map((r, i) => (
            <Reveal key={r.id} delay={(i % 2) * 70}>
              <div className="f1-card p-5 h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-bold text-base">{r.title}</h3>
                  <span className="text-[10px] font-display font-bold uppercase text-f1-silver bg-f1-grey px-2 py-1">{r.era}</span>
                </div>
                <p className="text-xs text-f1-silver mb-2 font-display font-bold">{r.drivers}</p>
                <p className="text-sm text-f1-silver leading-relaxed">{r.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <Reveal><h2 className="font-display font-bold text-lg uppercase tracking-wide mb-5 flex items-center gap-2"><Flag size={18} className="text-f1-red" /> Famous Races</h2></Reveal>
        <div className="f1-card overflow-hidden">
          {famousRaces.map((r, i) => (
            <div key={r.id} className={`flex items-start gap-4 p-4 ${i !== famousRaces.length - 1 ? 'border-b border-white/5' : ''} hover:bg-f1-red/5 transition-colors`}>
              <div className="font-display font-black text-2xl text-f1-red w-16 shrink-0">{r.year}</div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-sm mb-1">{r.race}</h3>
                <p className="text-xs text-f1-silver">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Reveal><h2 className="font-display font-bold text-lg uppercase tracking-wide mb-5 flex items-center gap-2"><MapPin size={18} className="text-f1-red" /> Iconic Circuits</h2></Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {iconicCircuits.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 60}>
              <div className="f1-card p-4 h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <h3 className="font-display font-bold text-sm">{c.name}</h3>
                    <p className="text-[10px] text-f1-silver uppercase">{c.country}</p>
                  </div>
                </div>
                <p className="text-xs text-f1-silver leading-relaxed">{c.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
