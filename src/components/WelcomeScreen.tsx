import { useEffect, useRef, useState } from 'react';

interface Props {
  onComplete: () => void;
}

export function WelcomeScreen({ onComplete }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const finish = () => {
      setDone(true);
      setTimeout(onComplete, 800);
    };
    v.addEventListener('ended', finish);
    v.play().catch(() => finish());
    const safety = setTimeout(finish, 45000);
    return () => {
      v.removeEventListener('ended', finish);
      clearTimeout(safety);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[200] bg-f1-black overflow-hidden transition-opacity duration-700 ${done ? 'opacity-0' : 'opacity-100'}`}>
      <video
        ref={videoRef}
        src="/videos/f1-intro.mp4"
        autoPlay
        muted
        playsInline
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-f1-black/50 via-transparent to-f1-black/20 pointer-events-none" />
    </div>
  );
}
