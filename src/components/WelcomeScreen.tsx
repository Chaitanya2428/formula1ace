import { useEffect, useState } from 'react';
import { SpeedLines } from './ParticleBackground';

interface Props {
  onComplete: () => void;
}

type Phase = 'drift-in' | 'hold' | 'drift-out' | 'countdown-3' | 'countdown-2' | 'countdown-1' | 'go' | 'done';

export function WelcomeScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('drift-in');
  const [smokeParticles, setSmokeParticles] = useState<{ id: number; x: number; size: number }[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase('hold'), 1600));
    timers.push(setTimeout(() => setPhase('drift-out'), 2400));
    timers.push(setTimeout(() => setPhase('countdown-3'), 3300));
    timers.push(setTimeout(() => setPhase('countdown-2'), 4200));
    timers.push(setTimeout(() => setPhase('countdown-1'), 5100));
    timers.push(setTimeout(() => setPhase('go'), 6000));
    timers.push(setTimeout(() => setPhase('done'), 6900));
    timers.push(setTimeout(() => onComplete(), 7600));

    // Tire smoke burst during drift-in and hold
    const smokeInterval = setInterval(() => {
      setSmokeParticles(prev => [
        ...prev.slice(-14),
        { id: Date.now() + Math.random(), x: Math.random() * 60 - 30, size: 14 + Math.random() * 24 },
      ]);
    }, 90);
    timers.push(setTimeout(() => clearInterval(smokeInterval), 2400) as unknown as ReturnType<typeof setTimeout>);

    return () => { timers.forEach(clearTimeout); clearInterval(smokeInterval); };
  }, [onComplete]);

  const drifting = phase === 'drift-in' || phase === 'hold';

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-f1-black overflow-hidden transition-opacity duration-500 ${phase === 'done' ? 'opacity-0' : 'opacity-100'}`}>
      <div className="absolute inset-0 bg-grid opacity-20" />
      {/* Skid marks */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none">
        <div className="mx-auto max-w-[900px] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.6) 80%, transparent)' }} />
      </div>
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-f1-red" />
      <SpeedLines active={drifting} />

      {/* F1 Drifting Car */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none">
        <div
          className={`relative ${phase === 'drift-in' ? 'animate-drift-in' : ''} ${phase === 'drift-out' ? 'animate-drift-out' : ''}`}
          style={{ transform: phase === 'hold' ? 'translateX(38%) rotate(-14deg)' : undefined }}
        >
          {/* Tire smoke from rear wheels */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-1 flex items-center">
            {smokeParticles.map((p, i) => (
              <div
                key={p.id}
                className="smoke-particle rounded-full"
                style={{
                  backgroundColor: 'rgba(180,180,180,0.45)',
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  marginLeft: `${i * 4}px`,
                  transform: `translateY(${p.x}px)`,
                  animationDelay: `${i * 60}ms`,
                }}
              />
            ))}
          </div>

          <svg width="280" height="110" viewBox="0 0 280 110" className="drop-shadow-[0_0_18px_rgba(225,6,0,0.5)]" style={{ transform: 'rotate(-14deg)', transformOrigin: 'center' }}>
            {/* Rear wing */}
            <rect x="250" y="18" width="10" height="60" rx="2" fill="#E10600" />
            <rect x="244" y="12" width="22" height="7" rx="2" fill="#1a1a2e" />
            <rect x="244" y="77" width="22" height="7" rx="2" fill="#1a1a2e" />
            {/* Drift body - elongated, angled */}
            <path d="M8 70 L32 58 L85 52 L145 44 L205 40 L252 36 L262 52 L262 82 L252 88 L205 86 L145 84 L85 80 L42 76 L14 74 Z" fill="#0d0d14" stroke="#E10600" strokeWidth="1.5" />
            {/* Front wing */}
            <path d="M4 64 L22 54 L22 94 L4 86 Z" fill="#E10600" />
            {/* Sidepod intake */}
            <path d="M118 40 L152 38 L158 54 L126 56 Z" fill="#1a1a2e" stroke="#E10600" strokeWidth="1" />
            <ellipse cx="138" cy="48" rx="13" ry="6" fill="#0a0a0a" />
            {/* Cockpit / halo */}
            <path d="M168 44 L196 42 L196 58 L168 60 Z" fill="#1a1a2e" />
            {/* Front wheel - turned for drift */}
            <g transform="rotate(28, 55, 82)">
              <circle cx="55" cy="82" r="15" fill="#0a0a0a" stroke="#333" strokeWidth="2" />
              <circle cx="55" cy="82" r="7" fill="#E10600" />
              <circle cx="55" cy="82" r="3" fill="#0a0a0a" />
            </g>
            {/* Rear wheel - sliding */}
            <circle cx="218" cy="84" r="16" fill="#0a0a0a" stroke="#333" strokeWidth="2" />
            <circle cx="218" cy="84" r="8" fill="#E10600" />
            <circle cx="218" cy="84" r="3" fill="#0a0a0a" />
            {/* Number */}
            <text x="186" y="66" fill="#E10600" fontSize="14" fontWeight="bold" fontFamily="sans-serif">1</text>
            {/* Motion accent line */}
            <path d="M30 60 L250 42" stroke="#E10600" strokeWidth="2" fill="none" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Logo */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center">
        <h1 className="font-display font-black text-xl md:text-3xl tracking-tight animate-fade-in">
          FORMULA ONE <span className="text-f1-red">ACE</span>
        </h1>
      </div>

      {/* Countdown */}
      <div className="relative z-10 flex flex-col items-center">
        {phase === 'countdown-3' && <span key="3" className="font-display font-black text-[8rem] md:text-[14rem] text-f1-red" style={{ animation: 'countdownPop 0.9s ease-out forwards' }}>3</span>}
        {phase === 'countdown-2' && <span key="2" className="font-display font-black text-[8rem] md:text-[14rem] text-white" style={{ animation: 'countdownPop 0.9s ease-out forwards' }}>2</span>}
        {phase === 'countdown-1' && <span key="1" className="font-display font-black text-[8rem] md:text-[14rem] text-f1-red" style={{ animation: 'countdownPop 0.9s ease-out forwards' }}>1</span>}
        {phase === 'go' && <span key="go" className="font-display font-black text-[6rem] md:text-[12rem] text-white tracking-wider" style={{ animation: 'countdownPop 0.9s ease-out forwards' }}>GO!</span>}
        {(phase === 'drift-in' || phase === 'hold' || phase === 'drift-out') && (
          <div className="mt-8 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-f1-red animate-pulse" />
            <span className="text-xs font-display font-bold uppercase tracking-[0.3em] text-f1-silver">Initiating drift...</span>
          </div>
        )}
      </div>

      {/* Checkered flag */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <svg width="44" height="30" viewBox="0 0 48 32" style={{ animation: 'flagWave 1.5s ease-in-out infinite' }}>
          <rect width="48" height="32" fill="white" />
          <rect x="0" y="0" width="12" height="8" fill="#0a0a0a" />
          <rect x="12" y="8" width="12" height="8" fill="#0a0a0a" />
          <rect x="24" y="0" width="12" height="8" fill="#0a0a0a" />
          <rect x="36" y="8" width="12" height="8" fill="#0a0a0a" />
          <rect x="0" y="16" width="12" height="8" fill="#0a0a0a" />
          <rect x="24" y="16" width="12" height="8" fill="#0a0a0a" />
          <rect x="12" y="24" width="12" height="8" fill="#0a0a0a" />
          <rect x="36" y="24" width="12" height="8" fill="#0a0a0a" />
        </svg>
      </div>
    </div>
  );
}
