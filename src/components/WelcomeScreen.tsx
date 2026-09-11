import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

type Phase = 'reveal' | 'zoom' | 'countdown-3' | 'countdown-2' | 'countdown-1' | 'go' | 'done';

const F1_DONUTS_VIDEO = 'https://www.youtube.com/embed/8pn0a_zOdUo';

export function WelcomeScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('reveal');

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase('zoom'), 2200));
    timers.push(setTimeout(() => setPhase('countdown-3'), 3100));
    timers.push(setTimeout(() => setPhase('countdown-2'), 4000));
    timers.push(setTimeout(() => setPhase('countdown-1'), 4900));
    timers.push(setTimeout(() => setPhase('go'), 5800));
    timers.push(setTimeout(() => setPhase('done'), 6700));
    timers.push(setTimeout(() => onComplete(), 7400));

    return () => { timers.forEach(clearTimeout); };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-f1-black overflow-hidden transition-opacity duration-500 ${phase === 'done' ? 'opacity-0' : 'opacity-100'}`}>
      {/* F1 donuts video background */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={`${F1_DONUTS_VIDEO}?autoplay=1&mute=1&controls=0&loop=1&playlist=8pn0a_zOdUo&rel=0&showinfo=0&modestbranding=1&playsinline=1&disablekb=1`}
          title="F1 Donuts"
          allow="autoplay; encrypted-media"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[100vh] min-w-full min-h-full pointer-events-none"
          style={{ border: 0, scale: '1.35' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-f1-black via-f1-black/40 to-f1-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-f1-black/60 via-transparent to-f1-black/60" />
      </div>

      {/* Tire smoke particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {phase !== 'done' && phase !== 'go' && Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="smoke-particle absolute rounded-full bg-white/20 blur-xl"
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${15 + i * 14}%`,
              bottom: '10%',
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1.2s',
            }}
          />
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 h-[3px] bg-f1-red z-20" />

      {/* Logo */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-20">
        <h1 className="font-display font-black text-xl md:text-3xl tracking-tight animate-fade-in">
          FORMULA ONE <span className="text-f1-red">ACE</span>
        </h1>
      </div>

      {/* Tagline during reveal */}
      {(phase === 'reveal' || phase === 'zoom') && (
        <div className="relative z-20 text-center animate-fade-in-up">
          <p className="text-lg md:text-2xl font-display font-bold text-white tracking-wide">
            Lights Out! <span className="text-f1-red">Away We Go!</span>
          </p>
        </div>
      )}

      {/* Countdown */}
      <div className="relative z-20 flex flex-col items-center">
        {phase === 'countdown-3' && <span key="3" className="font-display font-black text-[8rem] md:text-[14rem] text-f1-red" style={{ animation: 'countdownPop 0.9s ease-out forwards' }}>3</span>}
        {phase === 'countdown-2' && <span key="2" className="font-display font-black text-[8rem] md:text-[14rem] text-white" style={{ animation: 'countdownPop 0.9s ease-out forwards' }}>2</span>}
        {phase === 'countdown-1' && <span key="1" className="font-display font-black text-[8rem] md:text-[14rem] text-f1-red" style={{ animation: 'countdownPop 0.9s ease-out forwards' }}>1</span>}
        {phase === 'go' && <span key="go" className="font-display font-black text-[6rem] md:text-[12rem] text-white tracking-wider" style={{ animation: 'countdownPop 0.9s ease-out forwards' }}>GO!</span>}
      </div>

      {/* Checkered flag */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
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
