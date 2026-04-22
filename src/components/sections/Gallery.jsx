import { useMemo, useState } from 'react';
import { getGalleryPreviewPhotos } from '../../data/galeri.js';
import GalleryPhotoLightbox from '../gallery/GalleryPhotoLightbox.jsx';

export default function Gallery() {
  const photos = useMemo(() => getGalleryPreviewPhotos(), []);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const openPhoto = (src) => {
    setSelectedPhoto(src);
  };

  return (
    <section id="galeri" className="scroll-mt-20 bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          Galeri Kegiatan DLH Kota Jambi
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {photos.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => openPhoto(src)}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 shadow-sm ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <img src={src} alt="Galeri DLH Kota Jambi" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/40">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/10 text-white opacity-0 transition duration-300 group-hover:opacity-100">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-4.553a2 2 0 00-2.828-2.828L12 7.172 8.275 3.447A2 2 0 005.447 6.275L10 10m-1 4a5 5 0 117.996 3.998L12 21l-4.996-4.996A5 5 0 019 14z" />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <a
            href="#/galeri/semua"
            className="inline-flex items-center justify-center rounded-full border-2 border-dlh-green px-6 py-2.5 text-sm font-semibold text-dlh-green transition hover:bg-dlh-green hover:text-white"
          >
            Lihat Semua Galeri
          </a>
        </div>
      </div>

      {selectedPhoto && (
        <GalleryPhotoLightbox src={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}
    </section>
  );
}
