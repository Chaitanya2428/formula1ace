import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

type Phase = 'reveal' | 'zoom' | 'countdown-3' | 'countdown-2' | 'countdown-1' | 'go' | 'done';

const heroCarImage = 'https://images.pexels.com/photos/33968212/pexels-photo-33968212.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600';

export function WelcomeScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('reveal');
  const [loaded, setLoaded] = useState(false);

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
      {/* Real F1 car background */}
      <div className="absolute inset-0">
        <img
          src={heroCarImage}
          alt="F1 car drifting"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-[2200ms] ease-out ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-125'
          } ${phase === 'zoom' || phase === 'countdown-3' || phase === 'countdown-2' || phase === 'countdown-1' || phase === 'go' ? 'scale-110' : ''}`}
          style={{ transition: 'opacity 1.5s ease-out, transform 0.8s cubic-bezier(0.16,1,0.3,1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-f1-black via-f1-black/40 to-f1-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-f1-black/60 via-transparent to-f1-black/60" />
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
            You know what that is?? <span className="text-f1-red">Simply. Lovely!</span>
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
