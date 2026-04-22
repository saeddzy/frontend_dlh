import { useCallback, useEffect, useMemo, useState } from 'react';
import { getBeritaById, getRelatedBerita } from '../../data/berita.js';

function useShareUrl(id) {
  return useMemo(() => {
    if (typeof window === 'undefined' || !id) return '';
    return `${window.location.origin}${window.location.pathname}#/berita/${encodeURIComponent(id)}`;
  }, [id]);
}

function SharePostModal({ open, onClose, title, links, onCopyLink, copied }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !links) return null;

  const tileClass =
    'flex flex-col items-center gap-2 rounded-xl p-2 text-center transition hover:bg-slate-50 hover:opacity-90 active:scale-[0.98]';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        aria-label="Tutup dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-slate-200 px-6 pb-4 pt-6">
          <h2 id="share-modal-title" className="text-lg font-bold text-emerald-700">
            Bagikan Postingan
          </h2>
        </div>

        <div className="space-y-6 px-6 py-6">
          <div className="flex gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-slate-500">Judul Postingan</p>
              <p className="mt-1 text-base font-bold leading-snug text-slate-900">{title}</p>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2 text-slate-500">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684m0 9.316a3 3 0 10-5.367 2.684 3 3 0 005.367-2.684m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684"
                  />
                </svg>
              </span>
              <span className="text-xs font-medium">Bagikan Via</span>
            </div>

            <div className="grid grid-cols-5 gap-1 sm:gap-2">
              <button type="button" onClick={onCopyLink} className={tileClass}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3b82f6] text-white shadow-sm ring-2 ring-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-2"
                    />
                  </svg>
                </span>
                <span className="text-[10px] font-medium leading-tight text-slate-600 sm:text-xs">
                  {copied ? 'Disalin' : 'Salin Link'}
                </span>
              </button>

              <a
                href={links.fb}
                target="_blank"
                rel="noopener noreferrer"
                className={tileClass}
                onClick={onClose}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm ring-2 ring-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </span>
                <span className="text-[10px] font-medium text-slate-600 sm:text-xs">Facebook</span>
              </a>

              <a
                href={links.x}
                target="_blank"
                rel="noopener noreferrer"
                className={tileClass}
                onClick={onClose}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1d9bf0] text-white shadow-sm ring-2 ring-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </span>
                <span className="text-[10px] font-medium text-slate-600 sm:text-xs">Twitter</span>
              </a>

              <a
                href={links.wa}
                target="_blank"
                rel="noopener noreferrer"
                className={tileClass}
                onClick={onClose}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm ring-2 ring-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                <span className="text-[10px] font-medium text-slate-600 sm:text-xs">WhatsApp</span>
              </a>

              <a href={links.email} className={tileClass} onClick={onClose}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ea4335] text-white shadow-sm ring-2 ring-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <span className="text-[10px] font-medium text-slate-600 sm:text-xs">Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-emerald-600 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewsDetailPage({ id }) {
  const article = useMemo(() => (id ? getBeritaById(id) : null), [id]);
  const related = useMemo(() => (article ? getRelatedBerita(article.id, 4) : []), [article]);
  const shareUrl = useShareUrl(id);

  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      const p = scrollable > 0 ? el.scrollTop / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} — DLH Kota Jambi`;
    } else {
      document.title = 'Berita tidak ditemukan — DLH Kota Jambi';
    }
    return () => {
      document.title = 'Beranda — DLH Kota Jambi';
    };
  }, [article]);

  const copyLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }, [shareUrl]);

  const shareLinks = article
    ? {
        wa: `https://wa.me/?text=${encodeURIComponent(`${article.title}\n${shareUrl}`)}`,
        fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`,
        email: `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`${article.title}\n\n${shareUrl}`)}`,
      }
    : null;

  if (!article) {
    return (
      <div className="min-h-[calc(100svh-4rem)] bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 pt-24">
        <div className="mx-auto max-w-lg px-4 pb-20 pt-16 text-center sm:pt-24">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <svg className="h-10 w-10 text-emerald-300/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400/90">Berita</p>
          <h1 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Artikel tidak ditemukan
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Tautan mungkin sudah diubah atau berita telah diarsipkan. Silakan kembali ke daftar berita.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#/berita"
              className="inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/40 transition hover:bg-emerald-400"
            >
              Arsip berita
            </a>
            <a
              href="#/"
              className="inline-flex rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Beranda
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="relative bg-[#f4f3f0] pb-16 pt-0">
      {/* Reading progress — khas halaman artikel, bukan template umum */}
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px] bg-slate-300/40"
        aria-hidden
      >
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-[transform] duration-100 ease-out"
          style={{ transform: `scaleX(${progress})`, transformOrigin: 'left' }}
        />
      </div>

      <header className="relative isolate min-h-[min(88vh,760px)]">
        <div className="absolute inset-0">
          <img src={article.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/75 to-[#0f172a]/35" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.15),_transparent_55%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[min(88vh,760px)] max-w-4xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-white/70 sm:text-sm">
            <a href="#/" className="transition hover:text-white">
              Beranda
            </a>
            <span className="text-white/35">/</span>
            <a href="#/berita" className="transition hover:text-white">
              Berita
            </a>
            <span className="text-white/35">/</span>
            <span className="text-white/90">{article.category}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-sm">
              {article.category}
            </span>
            {article.badge && (
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/95 backdrop-blur-sm">
                {article.badge}
              </span>
            )}
          </div>

          <h1 className="mt-5 font-serif text-[1.65rem] font-bold leading-[1.2] tracking-tight text-white text-balance sm:text-4xl md:text-[2.65rem] md:leading-[1.15]">
            {article.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-sm text-white/85">
            <span className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white ring-1 ring-white/20">
                {article.author
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-wider text-white/55">Penulis</span>
                <span className="font-semibold text-white">{article.author}</span>
              </span>
            </span>
            <span className="hidden h-8 w-px bg-white/20 sm:block" aria-hidden />
            <span className="inline-flex items-center gap-2 text-white/80">
              <svg className="h-4 w-4 shrink-0 text-emerald-300/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {article.date}
            </span>
            <button
              type="button"
              onClick={() => setShareModalOpen(true)}
              className="group inline-flex items-center gap-2 rounded-lg border border-transparent px-2 py-1.5 text-left text-white/80 transition hover:border-white/25 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/80"
            >
              <svg
                className="h-4 w-4 shrink-0 text-emerald-300/90 transition group-hover:text-emerald-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684m0 9.316a3 3 0 10-5.367 2.684 3 3 0 005.367-2.684m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684"
                />
              </svg>
              <span className="font-medium underline-offset-4 group-hover:underline">Bagikan postingan</span>
            </button>
          </div>
        </div>
      </header>

      {/* Konten artikel: layout koran modern + sidebar — beda dari InnerPageTemplate */}
      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-10 rounded-2xl border border-slate-200/90 bg-white shadow-[0_25px_80px_-35px_rgba(15,23,42,0.35)] ring-1 ring-black/[0.04] sm:-mt-14 sm:rounded-3xl">
          <div className="grid gap-0 lg:grid-cols-12">
            <div className="border-b border-slate-100 p-6 sm:p-10 lg:col-span-8 lg:border-b-0 lg:border-r lg:p-12">
              <div className="mb-10 hidden items-center gap-3 lg:flex">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Bagikan</span>
                <button
                  type="button"
                  onClick={() => setShareModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684m0 9.316a3 3 0 10-5.367 2.684 3 3 0 005.367-2.684m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684"
                    />
                  </svg>
                  Bagikan postingan
                </button>
              </div>

              <blockquote className="relative mb-10 border-l-4 border-emerald-500 bg-emerald-50/60 px-5 py-4 text-lg font-medium leading-relaxed text-slate-800 sm:text-xl">
                <span className="font-serif italic text-slate-700">
                  Ringkasan: informasi ini disajikan untuk keperluan transparansi publik dan dapat diperbarui sesuai
                  perkembangan kebijakan.
                </span>
              </blockquote>

              <div className="max-w-article space-y-6 text-base leading-[1.75] text-slate-700">
                {article.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[3.25rem] first-letter:font-bold first-letter:leading-none first-letter:text-emerald-800'
                        : ''
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  #{article.category.replace(/\s+/g, '')}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">#DLHKotaJambi</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">#LingkunganHidup</span>
              </div>
            </div>

            <aside className="flex flex-col bg-gradient-to-b from-slate-50/80 to-white p-6 sm:p-8 lg:col-span-4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto lg:p-10">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Tentang penulis</p>
                <div className="mt-4 flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white shadow-md">
                    {article.author
                      .split(' ')
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{article.author}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      Kontributor resmi kanal komunikasi publik Dinas Lingkungan Hidup Kota Jambi.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Berita terkait</p>
                <ul className="mt-4 space-y-3">
                  {related.map((r) => (
                    <li key={r.id}>
                      <a
                        href={`#/berita/${encodeURIComponent(r.id)}`}
                        className="group block rounded-xl border border-transparent bg-white p-3 transition hover:border-emerald-200 hover:bg-emerald-50/50 hover:shadow-sm"
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700/90">{r.category}</p>
                        <p className="mt-1 text-sm font-semibold leading-snug text-slate-900 group-hover:text-emerald-800 line-clamp-2">
                          {r.title}
                        </p>
                        <p className="mt-2 text-xs text-slate-500">{r.date}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#/berita"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-600/90 bg-white py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-600 hover:text-white"
              >
                Lihat semua berita
                <span aria-hidden>→</span>
              </a>
            </aside>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 px-1">
          <a
            href="#/berita"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-700"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200">
              ←
            </span>
            Kembali ke arsip
          </a>
          <a href="#/" className="text-sm font-medium text-slate-500 underline-offset-4 transition hover:text-slate-800 hover:underline">
            Beranda
          </a>
        </div>
      </div>

      {/* Bar bagikan — mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200/90 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setShareModalOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 py-2.5 text-xs font-semibold text-white transition active:scale-[0.98]"
          >
            Bagikan postingan
          </button>
          <a
            href={shareLinks.wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm transition active:scale-[0.98]"
            aria-label="WhatsApp"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
          <a
            href={shareLinks.fb}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm transition active:scale-[0.98]"
            aria-label="Facebook"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="h-[calc(5rem+env(safe-area-inset-bottom))] lg:hidden" aria-hidden />

      <SharePostModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title={article.title}
        links={shareLinks}
        onCopyLink={copyLink}
        copied={copied}
      />
    </article>
  );
}
