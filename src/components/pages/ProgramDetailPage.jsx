import { useEffect, useMemo } from 'react';
import { getProgramById } from '../../data/program.js';

export default function ProgramDetailPage({ id }) {
  const program = useMemo(() => (id ? getProgramById(id) : null), [id]);

  useEffect(() => {
    if (program) {
      document.title = `${program.title} — Program DLH Kota Jambi`;
    } else if (id) {
      document.title = 'Program tidak ditemukan — DLH Kota Jambi';
    }
    return () => {
      document.title = 'Beranda — DLH Kota Jambi';
    };
  }, [program, id]);

  if (!program) {
    return (
      <div className="py-6 text-center">
        <p className="text-slate-600">Program tidak ditemukan atau tautan sudah tidak berlaku.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#/program"
            className="inline-flex rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Semua program
          </a>
          <a
            href="#/"
            className="inline-flex rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-800"
          >
            Beranda
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <a href="#/" className="transition hover:text-emerald-700">
          Beranda
        </a>
        <span className="text-slate-300">/</span>
        <a href="#/program" className="transition hover:text-emerald-700">
          Program
        </a>
        <span className="text-slate-300">/</span>
        <span className="line-clamp-1 font-medium text-slate-700">{program.title}</span>
      </nav>

      <div className="space-y-4 text-base leading-relaxed text-slate-700">
        {program.paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 sm:p-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-emerald-800">Kegiatan utama</h2>
        <ul className="mt-4 space-y-2.5">
          {program.highlights.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-700 sm:text-base">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-8">
        <a
          href="#/program"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
        >
          ← Kembali ke daftar program
        </a>
        <a href="#/" className="text-sm font-medium text-slate-500 underline-offset-4 hover:text-slate-800 hover:underline">
          Beranda
        </a>
      </div>
    </div>
  );
}
