import { useEffect, useMemo, useState } from 'react';
import { getAllBeritaArchive } from '../../data/berita.js';

const PAGE_SIZE = 9;

const categories = ['Semua', 'Kegiatan', 'Pengumuman', 'Lingkungan', 'Program', 'Populer', 'Analisis', 'Informasi', 'Sorotan'];

export default function AllNewsPage() {
  const allItems = useMemo(() => getAllBeritaArchive(), []);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      const matchQ = !q || item.title.toLowerCase().includes(q) || item.author?.toLowerCase().includes(q);
      const matchC = category === 'Semua' || item.category === category;
      return matchQ && matchC;
    });
  }, [allItems, query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const slice = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-4 border-b border-emerald-100/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Arsip</p>
          <p className="mt-1 text-sm text-slate-600">
            Menampilkan {filtered.length} berita dari DLH Kota Jambi.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <label className="relative block sm:w-72">
            <span className="sr-only">Cari berita</span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Cari judul atau penulis..."
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
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'Semua' ? 'Semua kategori' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {slice.map((item) => (
          <article
            key={item.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={item.image}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-600/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  {item.category}
                </span>
                {item.badge && (
                  <span className="rounded-full bg-black/50 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-base font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-emerald-700">
                <a
                  href={`#/berita/${encodeURIComponent(item.id)}`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {item.title}
                </a>
              </h3>
              <div className="mt-auto pt-3 text-xs text-slate-500">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span>{item.date}</span>
                  <span className="text-slate-300">|</span>
                  <span>{item.author}</span>
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-slate-500">Tidak ada berita yang cocok dengan filter pencarian.</p>
      )}

      {filtered.length > 0 && totalPages > 1 && (
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Paginasi berita">
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
    </div>
  );
}
