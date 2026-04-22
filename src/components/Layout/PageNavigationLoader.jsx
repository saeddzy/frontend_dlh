import { useEffect, useState } from 'react';

/**
 * Overlay navigasi hash — minimalis dan modern tanpa Lottie.
 */
export default function PageNavigationLoader({ isClosing = false }) {
  const statusItems = ['Memuat halaman', 'Menyiapkan konten', 'Hampir selesai'];
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusItems.length);
    }, 520);
    return () => window.clearInterval(timer);
  }, [statusItems.length]);

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center px-4 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm" />

      <div
        className={`relative flex w-full max-w-[260px] flex-col items-center ${isClosing ? 'loader-exit' : 'loader-enter'}`}
      >
        <div className="relative mb-3 flex h-[70px] w-[70px] items-center justify-center">
          <div className="loader-spinner absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-400 border-r-emerald-300/70 motion-reduce:animate-none" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(52,211,153,0.2)]" aria-hidden />
        </div>
        <p className="text-center text-sm font-medium tracking-wide text-white/90">Memuat halaman</p>
        <p className="loader-status-fade mt-1.5 text-center text-xs tracking-wide text-white/65">
          {statusItems[statusIndex]}
        </p>
        <div className="mt-3 h-[2px] w-full max-w-[140px] overflow-hidden rounded-full bg-white/20">
          <div className="loader-bar h-full w-1/3 rounded-full bg-emerald-300/90 motion-reduce:w-full motion-reduce:animate-none" />
        </div>
      </div>

      <style>{`
        @keyframes loader-pop {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        @keyframes loader-spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes loader-status-fade {
          0% {
            opacity: 0.5;
            transform: translateY(2px);
          }
          30%,
          80% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0.7;
            transform: translateY(-1px);
          }
        }
        @keyframes loader-bar-slide {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(380%);
          }
        }
        .loader-enter {
          animation: loader-pop 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .loader-exit {
          animation: loader-out 0.32s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes loader-out {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
          to {
            opacity: 0;
            transform: translateY(10px) scale(0.985);
            filter: blur(2px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .loader-enter {
            animation: none;
            opacity: 1;
            transform: none;
            filter: none;
          }
          .loader-exit {
            animation: none;
            opacity: 0;
          }
        }
        .loader-spinner {
          animation: loader-spin 0.8s linear infinite;
        }
        .loader-bar {
          animation: loader-bar-slide 0.9s ease-in-out infinite;
        }
        .loader-status-fade {
          animation: loader-status-fade 0.62s ease;
        }
      `}</style>
    </div>
  );
}
