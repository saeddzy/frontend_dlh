import { useCallback, useEffect, useState } from 'react';

/**
 * Preview foto — gaya modern (glass backdrop, kartu mengambang, kontrol minimal).
 */
export default function GalleryPhotoLightbox({ src, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const close = useCallback(() => {
    setIsClosing(true);
    window.setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [close, src]);

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-zinc-950/75 px-4 py-8 backdrop-blur-xl sm:px-6"
      role="presentation"
      onClick={close}
    >
      <div
        className={`relative w-full max-w-2xl transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isClosing ? 'translate-y-2 scale-[0.97] opacity-0' : 'translate-y-0 scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol tutup — mengambang, glass, tidak menempel area foto */}
        <button
          type="button"
          onClick={close}
          className="absolute -right-1 -top-1 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-zinc-900/85 text-white shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md transition hover:scale-105 hover:border-emerald-400/40 hover:bg-emerald-600/90 active:scale-95 sm:right-0 sm:top-0 sm:h-12 sm:w-12"
          aria-label="Tutup preview"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Kartu gambar: gradient ring tipis + bayangan dalam */}
        <div className="rounded-2xl bg-gradient-to-br from-white/20 via-white/5 to-transparent p-[1px] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.9)] sm:rounded-[1.35rem]">
          <div className="overflow-hidden rounded-[0.9375rem] bg-zinc-900/60 ring-1 ring-white/10 sm:rounded-[1.3rem]">
            <div className="relative">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"
                aria-hidden
              />
              <img
                src={src}
                alt=""
                className="relative z-0 mx-auto max-h-[min(52vh,520px)] w-full object-contain sm:max-h-[min(56vh,560px)]"
                draggable={false}
              />
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] font-medium tracking-wide text-white/35 sm:text-xs">
          Klik di luar gambar atau tekan <kbd className="rounded-md bg-white/10 px-1.5 py-0.5 font-sans text-[10px] text-white/60">Esc</kbd> untuk menutup
        </p>
      </div>
    </div>
  );
}
