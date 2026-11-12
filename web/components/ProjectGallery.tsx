'use client';

import { useState } from 'react';
import { gallery, galleryFilters, type GalleryCat } from '@/lib/data';

type Filter = GalleryCat | 'all';

export default function ProjectGallery() {
  const [filter, setFilter] = useState<Filter>('all');
  const visible = filter === 'all' ? gallery : gallery.filter((g) => g.cats.includes(filter));

  return (
    <>
      <div className="filters tabs">
        {galleryFilters.map((f) => (
          <button
            key={f.id}
            className={`tab${f.id === filter ? ' on' : ''}`}
            aria-pressed={f.id === filter}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="gallery">
        {visible.map((g) => (
          <figure className="g-item" key={g.src}>
            <img loading="lazy" src={g.src} alt={g.text.replace(/\.$/, '')} />
            <figcaption>{g.text}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
