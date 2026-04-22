import { useState } from 'react';

const faqItems = [
  {
    q: 'Bagaimana cara mengajukan pengaduan lingkungan di Kota Jambi?',
    a: 'Pengaduan dapat disampaikan melalui kanal resmi DLH Kota Jambi yang tersedia pada halaman layanan, dengan menyertakan lokasi, kronologi, dan dokumentasi pendukung agar proses tindak lanjut lebih cepat.',
  },
  {
    q: 'Apakah masyarakat bisa ikut program penghijauan?',
    a: 'Bisa. Masyarakat, komunitas, dan sekolah dapat berpartisipasi pada kegiatan penanaman dan edukasi lingkungan yang dijadwalkan berkala oleh DLH.',
  },
  {
    q: 'Di mana saya bisa melihat informasi program dan kegiatan terbaru?',
    a: 'Informasi terbaru tersedia pada bagian Berita, Program, dan Galeri di website ini. Konten diperbarui secara bertahap sesuai publikasi resmi.',
  },
  {
    q: 'Apakah ada edukasi pemilahan sampah untuk warga?',
    a: 'Ada. DLH menjalankan sosialisasi pemilahan sampah dari sumber, pembinaan bank sampah, dan pendampingan kegiatan 3R bersama masyarakat.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/85">FAQ</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Informasi ringkas layanan DLH Kota Jambi untuk membantu kebutuhan masyarakat.
          </p>
        </div>

        <div className="relative pl-8 sm:pl-10">
          <span className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-emerald-200 via-emerald-300 to-emerald-200 sm:left-[15px]" aria-hidden />

          <div className="space-y-3">
            {faqItems.map((item, idx) => {
              const expanded = openIndex === idx;
              return (
                <article key={item.q} className="relative">
                  <span
                    className={`absolute -left-[25px] top-5 inline-flex h-3 w-3 rounded-full border-2 sm:-left-[29px] ${
                      expanded
                        ? 'border-emerald-500 bg-emerald-400 shadow-[0_0_0_5px_rgba(16,185,129,0.16)]'
                        : 'border-emerald-300 bg-white'
                    }`}
                    aria-hidden
                  />

                  <div
                    className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${
                      expanded
                        ? 'border-emerald-200 shadow-[0_14px_30px_-24px_rgba(16,185,129,0.55)]'
                        : 'border-slate-200/90 hover:border-emerald-200/70'
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(expanded ? -1 : idx)}
                        aria-expanded={expanded}
                        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                      >
                        <span className="pr-2 text-sm font-semibold leading-relaxed text-slate-900 sm:text-base">
                          {item.q}
                        </span>
                        <span
                          className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-slate-600 transition ${
                            expanded ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-slate-300/90'
                          }`}
                          aria-hidden
                        >
                          <svg
                            className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="border-t border-slate-100/90 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-600 sm:px-6">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
