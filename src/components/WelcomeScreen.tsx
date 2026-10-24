import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

type Phase = 'reveal' | 'fade' | 'done';

const F1_4K_VIDEO = 'https://www.youtube.com/embed/wCivA4HNkqI';

export function WelcomeScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('reveal');

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase('fade'), 6000));
    timers.push(setTimeout(() => setPhase('done'), 6800));
    timers.push(setTimeout(() => onComplete(), 7500));

    return () => { timers.forEach(clearTimeout); };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-f1-black overflow-hidden transition-opacity duration-800 ${phase === 'done' ? 'opacity-0' : 'opacity-100'}`}>
      {/* 4K cinematic F1 video background */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={`${F1_4K_VIDEO}?autoplay=1&mute=1&controls=0&loop=1&playlist=wCivA4HNkqI&rel=0&showinfo=0&modestbranding=1&playsinline=1&disablekb=1&vq=hd2160`}
          title="F1 4K Cinematic"
          allow="autoplay; encrypted-media"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[100vh] min-w-full min-h-full pointer-events-none"
          style={{ border: 0, scale: '1.35' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-f1-black via-f1-black/40 to-f1-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-f1-black/60 via-transparent to-f1-black/60" />
      </div>

      {/* Tire smoke particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {phase !== 'done' && Array.from({ length: 6 }).map((_, i) => (
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

      {/* Tagline */}
      <div className="relative z-20 text-center animate-fade-in-up">
        <p className="text-lg md:text-2xl font-display font-bold text-white tracking-wide">
          Lights Out! <span className="text-f1-red">Away We Go!</span>
        </p>
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
