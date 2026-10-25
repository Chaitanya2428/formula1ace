import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

const VIDEO_ID = 'mQmE1m5Vz2c';

export function WelcomeScreen({ onComplete }: Props) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 800);
    }, 30000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[200] bg-f1-black overflow-hidden transition-opacity duration-700 ${done ? 'opacity-0' : 'opacity-100'}`}>
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${VIDEO_ID}&rel=0&showinfo=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3&vq=hd2160`}
          title="F1 2026 Singapore GP - Verstappen Pole Lap"
          allow="autoplay; encrypted-media"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[100vh] min-w-full min-h-full pointer-events-none"
          style={{ border: 0, scale: '1.35' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-f1-black/60 via-transparent to-f1-black/30 pointer-events-none" />
      </div>
    </div>
  );
}
