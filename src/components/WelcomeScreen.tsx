import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

const INSTAGRAM_EMBED = 'https://www.instagram.com/reel/DchB2juN9RA/embed/';

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
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={{ width: 'min(100vw, 450px)', height: '100vh' }}
      >
        <iframe
          src={INSTAGRAM_EMBED}
          title="F1 Intro"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          scrolling="no"
          className="absolute top-0 left-0"
          style={{ border: 0, width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
