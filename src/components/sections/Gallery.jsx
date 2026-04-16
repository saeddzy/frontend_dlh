import { useState } from 'react';

const photos = [
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const openPhoto = (src) => {
    setIsClosing(false);
    setSelectedPhoto(src);
  };

  const closePhoto = () => {
    setIsClosing(true);
    window.setTimeout(() => {
      setSelectedPhoto(null);
      setIsClosing(false);
    }, 250);
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
            href="#"
            className="inline-flex items-center justify-center rounded-full border-2 border-dlh-green px-6 py-2.5 text-sm font-semibold text-dlh-green transition hover:bg-dlh-green hover:text-white"
          >
            Lihat Semua Gallery
          </a>
        </div>
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6">
          <div className={`relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-black shadow-2xl transition-all duration-300 ease-out ${
            isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}>
            <button
              type="button"
              onClick={closePhoto}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-95"
              aria-label="Tutup preview gambar"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <img src={selectedPhoto} alt="Preview galeri" className="max-h-[90vh] w-full object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}
