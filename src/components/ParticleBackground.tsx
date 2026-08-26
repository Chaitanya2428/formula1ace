import { useEffect, useState } from 'react';

export function ParticleBackground() {
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * 10,
      size: 1 + Math.random() * 2,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
      {particles.map(p => (
        <div key={p.id} className="particle absolute rounded-full bg-f1-red/30"
          style={{ left: `${p.left}%`, width: `${p.size}px`, height: `${p.size}px`, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }} />
      ))}
    </div>
  );
}

export function SpeedLines({ active }: { active: boolean }) {
  const [lines, setLines] = useState<number[]>([]);
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => { setLines(prev => [...prev.slice(-6), Date.now()]); }, 120);
    return () => clearInterval(interval);
  }, [active]);
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {lines.map((id, i) => (
        <div key={`${id}-${i}`} className="speed-line absolute h-px bg-gradient-to-r from-transparent via-f1-red to-transparent"
          style={{ top: `${10 + (i * 13) % 80}%`, width: '40%', animationDuration: `${0.3 + Math.random() * 0.3}s` }} />
      ))}
    </div>
  );
}
