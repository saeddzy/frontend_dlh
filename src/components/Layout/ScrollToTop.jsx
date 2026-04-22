import { useEffect, useState } from 'react';

const SHOW_AFTER_PX = 400;
const NEAR_BOTTOM_PX = 160;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollY = window.scrollY;
      const viewH = window.innerHeight;
      const fullH = el.scrollHeight;
      const scrollable = fullH > viewH + 64;
      const nearBottom = scrollable && scrollY + viewH >= fullH - NEAR_BOTTOM_PX;
      const scrolledDown = scrollY > SHOW_AFTER_PX;
      setVisible(scrolledDown || nearBottom);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-4 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-900/20 ring-2 ring-white/90 transition hover:scale-105 hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 sm:bottom-8 sm:right-8"
      aria-label="Kembali ke atas"
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
