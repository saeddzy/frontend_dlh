import { useEffect, useMemo, useState } from 'react';
import GalleryPhotoLightbox from '../gallery/GalleryPhotoLightbox.jsx';
import { getAllGalleryItems } from '../../data/galeri.js';

const PAGE_SIZE = 12;

const tabs = [
  { id: 'semua', label: 'Semua' },
  { id: 'foto', label: 'Foto' },
  { id: 'video', label: 'Video' },
];

export default function AllGalleryPage() {
  const allItems = useMemo(() => getAllGalleryItems(), []);
  const [tab, setTab] = useState('semua');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [videoEmbed, setVideoEmbed] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      const matchQ = !q || item.title.toLowerCase().includes(q);
      const matchT = tab === 'semua' || item.type === tab;
      return matchQ && matchT;
    });
  }, [allItems, query, tab]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const slice = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  useEffect(() => {
    setPage(1);
  }, [tab, query]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-4 border-b border-emerald-100/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Galeri</p>
          <p className="mt-1 text-sm text-slate-600">
            Menampilkan {filtered.length} item dokumentasi foto dan video.
          </p>
        </div>
        <label className="relative block w-full sm:w-72">
          <span className="sr-only">Cari galeri</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul dokumentasi..."
            className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none ring-emerald-500/30 transition focus:border-emerald-500 focus:ring-2"
          />
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === t.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {slice.map((item) =>
          item.type === 'foto' ? (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxSrc(item.src)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <img
                src={item.src}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0 opacity-90 transition group-hover:from-black/80" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-300/95">Foto</p>
                <p className="mt-0.5 line-clamp-2 text-xs font-bold text-white">{item.title}</p>
                <p className="mt-1 text-[10px] text-white/75">{item.date}</p>
              </div>
            </button>
          ) : (
            <button
              key={item.id}
              type="button"
              onClick={() => setVideoEmbed({ url: item.embedUrl, title: item.title })}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <img
                src={item.thumb}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/35 transition group-hover:bg-black/45">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-emerald-600 shadow-lg ring-2 ring-white/50 transition group-hover:scale-105">
                  <svg className="ml-1 h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 pt-10">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-300/95">Video</p>
                <p className="mt-0.5 line-clamp-2 text-xs font-bold text-white">{item.title}</p>
                <p className="mt-1 text-[10px] text-white/75">{item.date}</p>
              </div>
            </button>
          )
        )}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-slate-500">Tidak ada galeri yang cocok dengan pencarian.</p>
      )}

      {filtered.length > 0 && totalPages > 1 && (
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Paginasi galeri">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Sebelumnya
          </button>
          <span className="px-3 text-sm text-slate-600">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Berikutnya
          </button>
        </nav>
      )}

      <div className="mt-10 flex justify-center border-t border-slate-100 pt-8">
        <a
          href="#/"
          className="inline-flex rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700"
        >
          ← Kembali ke Beranda
        </a>
      </div>

      {lightboxSrc && (
        <GalleryPhotoLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}

      {videoEmbed && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 px-4 py-8"
          role="presentation"
          onClick={() => setVideoEmbed(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={videoEmbed.title}
            className="relative w-full max-w-4xl rounded-2xl bg-black shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white ring-1 ring-white/20 transition hover:bg-black/80"
              aria-label="Tutup video"
              onClick={() => setVideoEmbed(null)}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-2xl">
              <iframe
                title={videoEmbed.title}
                src={videoEmbed.url}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="px-4 py-3 text-center text-sm font-medium text-white/90">{videoEmbed.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
