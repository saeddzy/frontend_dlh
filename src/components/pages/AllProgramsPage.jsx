import { getAllPrograms, getProgramCardVisual } from '../../data/program.js';
import ProgramCardArt from '../programs/ProgramCardArt.jsx';

export default function AllProgramsPage() {
  const programs = getAllPrograms();
  const total = programs.length;

  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-sm leading-relaxed text-slate-600">
        Ringkasan program strategis DLH Kota Jambi. Pilih salah satu untuk membaca tujuan, kegiatan, dan pelibatan
        masyarakat.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p, idx) => (
          <a
            key={p.id}
            href={`#/program/${encodeURIComponent(p.id)}`}
            className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/45 focus-visible:ring-offset-2"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div
                className="h-full min-h-[280px] w-full translate-y-[105%] transition-[transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:translate-y-0 motion-reduce:translate-y-0 motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:duration-300 motion-reduce:group-hover:opacity-100"
              >
                <ProgramCardArt
                  variant="watermark"
                  visual={getProgramCardVisual(p, idx)}
                  index={idx}
                  total={total}
                  className="h-full min-h-[280px]"
                />
              </div>
            </div>

            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-white from-[42%] via-white/88 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-100 motion-reduce:via-white/95"
              aria-hidden
            />

            <div className="relative z-10 flex min-h-[260px] flex-col p-6">
              <span className="font-mono text-[11px] font-medium tabular-nums text-slate-400">
                {String(idx + 1).padStart(2, '0')}
                <span className="text-slate-300"> / {String(total).padStart(2, '0')}</span>
              </span>
              <h2 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-emerald-900">
                {p.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-4">{p.summary}</p>
              <span className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-emerald-700 transition-all duration-300 group-hover:gap-2.5 group-hover:text-emerald-800">
                Buka halaman program
                <svg
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
                </svg>
              </span>
            </div>

            <span
              className="absolute bottom-6 left-0 top-6 w-0.5 origin-top scale-y-0 rounded-full bg-emerald-500/0 transition-all duration-300 group-hover:scale-y-100 group-hover:bg-emerald-500/70"
              aria-hidden
            />
          </a>
        ))}
      </div>

      <div className="mt-12 flex justify-center border-t border-slate-100 pt-8">
        <a
          href="#/"
          className="inline-flex rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-800"
        >
          Kembali ke beranda
        </a>
      </div>
    </div>
  );
}
