import { useState } from 'react';
import { galleryImages, galleryCategories } from '../data/gallery';
import { Reveal } from '../components/Reveal';
import { Lightbox, type LightboxImage } from '../components/Lightbox';

export function GalleryPage() {
  const [category, setCategory] = useState<string>('All');
  const [lightbox, setLightbox] = useState<{ images: LightboxImage[]; index: number } | null>(null);

  const filtered = category === 'All' ? galleryImages : galleryImages.filter(g => g.category === category);
  const lightboxImages: LightboxImage[] = filtered.map(g => ({ url: g.url, title: g.title }));

  return (
    <div className="page-enter pt-20 pb-20 px-4 md:px-6 max-w-[1400px] mx-auto">
      <Reveal>
        <div className="mb-8">
          <span className="f1-tag mb-3">Visual Archive</span>
          <h1 className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight mt-2">Gallery</h1>
          <p className="mt-3 text-f1-silver max-w-2xl">A visual journey through Formula 1 — cars, drivers, teams, and historic moments.</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="flex flex-wrap gap-1 mb-6 p-1 bg-f1-grey w-fit">
          {galleryCategories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 font-display font-bold text-xs uppercase tracking-wider transition-all ${category === c ? 'bg-f1-red text-white' : 'text-f1-silver hover:text-white'}`}>{c}</button>
          ))}
        </div>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((img, i) => (
          <Reveal key={img.id} delay={(i % 4) * 50}>
            <button onClick={() => setLightbox({ images: lightboxImages, index: i })} className="relative aspect-square overflow-hidden group w-full">
              <img src={img.url} alt={img.title} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-f1-dark via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-[9px] font-display font-bold uppercase tracking-wider text-f1-red mb-0.5">{img.category}</div>
                <div className="font-display font-bold text-xs text-white">{img.title}</div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {lightbox && <Lightbox images={lightbox.images} startIndex={lightbox.index} onClose={() => setLightbox(null)} />}
    </div>
  );
}
