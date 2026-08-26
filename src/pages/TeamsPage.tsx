import { useState } from 'react';
import { X, MapPin, Users, Wrench, Award, Building2 } from 'lucide-react';
import { teams, type Team } from '../data/teams';
import { drivers } from '../data/drivers';
import { Reveal } from '../components/Reveal';
import { Lightbox, type LightboxImage } from '../components/Lightbox';

export function TeamsPage() {
  const [selected, setSelected] = useState<Team | null>(null);
  const [lightbox, setLightbox] = useState<{ images: LightboxImage[]; index: number } | null>(null);

  return (
    <div className="page-enter pt-20 pb-20 px-4 md:px-6 max-w-[1400px] mx-auto">
      <Reveal>
        <div className="mb-8">
          <span className="f1-tag mb-3">Constructors</span>
          <h1 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight mt-2">Teams</h1>
          <p className="mt-3 text-f1-silver max-w-2xl">All 11 teams competing for the Constructors Championship in 2026.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map((t, i) => {
          const teamDrivers = drivers.filter(d => d.team === t.id);
          return (
            <Reveal key={t.id} delay={(i % 2) * 80}>
              <button
                onClick={() => setSelected(t)}
                className="w-full text-left group relative overflow-hidden"
                style={{ background: t.color }}
              >
                {/* Diagonal texture */}
                <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '8px 8px' }} />

                {/* Logo circle top-right */}
                <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center border border-white/25 z-20">
                  <img src={t.logo} alt={t.name} className="w-7 h-7 object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>

                {/* Top section: team name + drivers side by side */}
                <div className="relative z-10 px-5 pt-5 pb-3">
                  <h3 className="font-display font-black text-2xl md:text-3xl text-white leading-none mb-3 drop-shadow-md">{t.name}</h3>
                  <div className="flex gap-4">
                    {teamDrivers.map(d => (
                      <div key={d.id} className="flex items-center gap-2">
                        {/* Helmet/portrait circle */}
                        <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0 bg-black/20">
                          <img src={d.photo} alt={d.name} loading="lazy" className="w-full h-full object-cover object-top" onError={e => { (e.target as HTMLImageElement).style.opacity = '0'; }} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-white/60 text-[10px] leading-none mb-0.5">{d.flag}</div>
                          <div className="text-white text-xs font-display uppercase tracking-wide leading-none truncate">
                            {d.name.split(' ')[0]} <span className="font-black">{d.name.split(' ').slice(1).join(' ')}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Car image — large, bottom, full width */}
                <div className="relative z-10 w-full h-[140px] md:h-[160px] flex items-end justify-center overflow-hidden">
                  <img
                    src={t.carImage}
                    alt={`${t.name} car`}
                    loading="lazy"
                    className="w-full h-full object-contain object-bottom drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 origin-bottom"
                  />
                </div>

                {/* Hover shine */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)' }} />

                {/* Bottom gradient for depth */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              </button>
            </Reveal>
          );
        })}
      </div>

      {selected && <TeamModal team={selected} onClose={() => setSelected(null)} onGallery={(images, index) => setLightbox({ images, index })} />}
      {lightbox && <Lightbox images={lightbox.images} startIndex={lightbox.index} onClose={() => setLightbox(null)} />}
    </div>
  );
}

function TeamModal({ team, onClose, onGallery }: { team: Team; onClose: () => void; onGallery: (images: LightboxImage[], index: number) => void }) {
  const teamDrivers = drivers.filter(d => d.team === team.id);
  const galleryImages: LightboxImage[] = [{ url: team.carImage, title: `${team.name} Car` }, ...team.gallery.map((g, i) => ({ url: g, title: `${team.name} ${i + 1}` }))];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90" />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar bg-f1-dark border border-white/10" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-white/10 flex items-center justify-center hover:text-f1-red transition-colors z-10" aria-label="Close"><X size={18} /></button>

        {/* Modal hero */}
        <div className="relative h-56 overflow-hidden" style={{ background: team.color }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '8px 8px' }} />
          <div className="absolute top-4 right-16 w-11 h-11 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center border border-white/25 z-10">
            <img src={team.logo} alt={team.name} className="w-7 h-7 object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
          <div className="relative z-10 pt-5 px-5">
            <h2 className="font-display font-black text-2xl text-white drop-shadow-md">{team.name}</h2>
            <p className="text-xs text-white/60">{team.fullName}</p>
          </div>
          <div className="relative z-10 w-full h-32 flex items-end justify-center">
            <img src={team.carImage} alt={team.name} className="w-full h-full object-contain object-bottom drop-shadow-2xl" />
          </div>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
            {[
              { l: 'Principal', v: team.principal, i: <Users size={12} /> },
              { l: 'Engine', v: team.engine, i: <Wrench size={12} /> },
              { l: 'HQ', v: team.headquarters.split(',')[0], i: <Building2 size={12} /> },
              { l: 'Titles', v: String(team.championships), i: <Award size={12} /> },
            ].map(s => (
              <div key={s.l} className="bg-f1-grey p-2.5">
                <div className="flex items-center gap-1 text-f1-red mb-1">{s.i}<span className="text-[9px] uppercase tracking-wider">{s.l}</span></div>
                <div className="text-xs font-display font-bold truncate">{s.v}</div>
              </div>
            ))}
          </div>
          <div className="mb-5">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-f1-red mb-2">Drivers</h3>
            <div className="grid grid-cols-2 gap-2">
              {teamDrivers.map(d => (
                <div key={d.id} className="flex items-center gap-2 bg-f1-grey p-2.5">
                  <div className="w-8 h-8 bg-f1-red flex items-center justify-center font-display font-black text-sm text-white" style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 5px) 100%, 0 100%)' }}>{d.number}</div>
                  <div><div className="font-display font-bold text-xs">{d.name}</div><div className="text-[10px] text-f1-silver">{d.flag} {d.nationality}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-5">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-f1-red mb-2">Team History</h3>
            <p className="text-sm text-f1-silver leading-relaxed">{team.history}</p>
          </div>
          <div className="mb-5">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-f1-red mb-2">Headquarters</h3>
            <div className="flex items-center gap-2 text-sm text-f1-silver bg-f1-grey p-2.5"><MapPin size={14} className="text-f1-red" /> {team.headquarters}</div>
          </div>
          <div>
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-f1-red mb-2">Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((img, ix) => (
                <button key={ix} onClick={() => onGallery(galleryImages, ix)} className="relative aspect-square overflow-hidden group">
                  <img src={img.url} alt={img.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
