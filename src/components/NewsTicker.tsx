import { Radio } from 'lucide-react';

const headlines = [
  'Antonelli dominates US Grand Prix at COTA for his 9th win of 2026',
  'Championship leader holds 123-point advantage heading to Mexico City',
  'Leclerc P2 in Austin keeps Ferrari in the constructors fight',
  'Verstappen completes the podium despite radio issues',
  'Russell penalized 5 seconds for track limits — finishes P8',
  'Next race: Mexican Grand Prix — Hermanos Rodriguez, October 25',
  '2026 regulations: 50% electric power units, active aero, sustainable fuel',
  'Cadillac joins the grid as 11th team for the 2026 season',
];

export function NewsTicker() {
  const items = [...headlines, ...headlines];
  return (
    <div className="fixed top-[60px] left-0 right-0 z-40 bg-f1-red text-white overflow-hidden h-8 flex items-center">
      <div className="shrink-0 flex items-center gap-1.5 px-3 h-full bg-black/20 font-display font-black text-[10px] uppercase tracking-[0.2em]">
        <Radio size={12} className="animate-pulse" />
        <span className="hidden sm:inline">Live</span>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee will-change-transform">
          {items.map((h, i) => (
            <span key={i} className="text-xs font-body font-medium tracking-wide flex items-center gap-2">
              <span className="text-white/70">●</span>
              {h}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
