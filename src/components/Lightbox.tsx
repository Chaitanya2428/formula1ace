import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxImage {
  url: string;
  title: string;
}

interface Props {
  images: LightboxImage[];
  startIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, startIndex, onClose }: Props) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 animate-fade-in" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 w-11 h-11 bg-white/10 flex items-center justify-center hover:text-f1-red transition-colors z-10" aria-label="Close">
        <X size={22} />
      </button>
      <button onClick={e => { e.stopPropagation(); setIndex(i => (i - 1 + images.length) % images.length); }} className="absolute left-4 w-11 h-11 bg-white/10 flex items-center justify-center hover:text-f1-red transition-colors z-10" aria-label="Previous">
        <ChevronLeft size={22} />
      </button>
      <figure className="max-w-5xl max-h-[85vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
        <img src={images[index].url} alt={images[index].title} className="max-w-full max-h-[75vh] object-contain" />
        <figcaption className="mt-4 font-display font-bold text-lg text-white">{images[index].title}</figcaption>
        <span className="text-sm text-f1-silver mt-1">{index + 1} / {images.length}</span>
      </figure>
      <button onClick={e => { e.stopPropagation(); setIndex(i => (i + 1) % images.length); }} className="absolute right-4 w-11 h-11 bg-white/10 flex items-center justify-center hover:text-f1-red transition-colors z-10" aria-label="Next">
        <ChevronRight size={22} />
      </button>
    </div>
  );
}
