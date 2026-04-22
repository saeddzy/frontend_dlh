import { useState } from 'react';
import { featuredNews, terbaru, terpopuler } from '../../data/berita.js';

const kepalaDinas = {
  name: 'Nama Kepala Dinas',
  jabatan: 'Kepala Dinas Lingkungan Hidup Kota Jambi',
  photo: '/kadis.jpeg',
  description:
    'Kolaborasi pemerintah, dunia usaha, dan masyarakat adalah kunci menciptakan Kota Jambi yang bersih, hijau, dan berdaya tahan iklim.',
  masaJabatan: '2023 - Sekarang',
};

export default function LatestNews() {
  const [tab, setTab] = useState('terbaru');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const list = tab === 'terbaru' ? terbaru : terpopuler;
  const activeFeatured = featuredNews[featuredIndex];
  const categoryPalette = tab === 'terbaru'
    ? ['Kegiatan', 'Pengumuman', 'Lingkungan', 'Program']
    : ['Populer', 'Analisis', 'Informasi', 'Sorotan'];

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + featuredNews.length) % featuredNews.length);
  };

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredNews.length);
  };

  return (
    <section id="informasi-publik" className="relative -mt-px scroll-mt-20 bg-white py-10 sm:py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 px-1 text-center text-[1.35rem] font-bold leading-snug text-gray-900 text-balance sm:mb-10 sm:text-2xl md:text-3xl">
          Berita Terkini DLH Kota Jambi
        </h2>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <article className="lg:col-span-6">
            <div className="group relative overflow-hidden rounded-2xl bg-gray-900 shadow-card ring-1 ring-gray-200/80 sm:ring-black/5">
              {/* Mobile: kartu lebih tinggi (4:5) agar area foto lebih besar; overlay tetap di bawah */}
              <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:h-[580px] lg:aspect-auto">
                <img
                  src={activeFeatured.image}
                  alt={activeFeatured.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/88 via-black/40 to-transparent sm:h-[44%] lg:h-[52%]" />
                <div className="absolute inset-x-0 bottom-0 rounded-t-xl border-t border-white/5 bg-black/25 px-4 pb-[4.25rem] pt-3 text-white backdrop-blur-[2px] sm:rounded-t-2xl sm:border-white/10 sm:bg-black/30 sm:pb-20 sm:pt-4 sm:backdrop-blur-md md:pb-24">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/85">
                    {activeFeatured.category}
                  </p>
                  <h3 className="mt-1.5 max-w-full text-lg font-extrabold leading-snug tracking-tight text-white line-clamp-2 sm:mt-2 sm:line-clamp-3 sm:max-w-[92%] sm:text-2xl md:text-[1.85rem] lg:line-clamp-none lg:text-[2.2rem]">
                    {activeFeatured.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-white/90 sm:mt-4 sm:text-sm">
                    <span className="inline-flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {activeFeatured.date}
                    </span>
                    <span className="text-white/50">|</span>
                    <span className="inline-flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z" />
                      </svg>
                      Penulis : {activeFeatured.author}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                  <a
                    href={`#/berita/${encodeURIComponent(`featured-${featuredIndex}`)}`}
                    className="inline-flex items-center gap-1 rounded-full border border-white/35 bg-black/25 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/15 sm:px-5 sm:py-2.5 sm:text-sm"
                  >
                    Baca Selengkapnya
                    <span aria-hidden>→</span>
                  </a>
                </div>

                <div className="absolute bottom-4 right-4 flex max-w-[calc(100%-1rem)] items-center gap-1.5 rounded-full border border-white/20 bg-black/55 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md sm:bottom-6 sm:right-6 sm:gap-2 sm:px-3 sm:text-sm">
                  <button
                    type="button"
                    onClick={prevFeatured}
                    className="rounded-full p-1 transition hover:bg-white/20"
                    aria-label="Berita sebelumnya"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span>
                    {featuredIndex + 1} dari {featuredNews.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextFeatured}
                    className="rounded-full p-1 transition hover:bg-white/20"
                    aria-label="Berita berikutnya"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </article>

          <div className="lg:col-span-3 lg:min-h-[580px] lg:flex lg:flex-col">
            <div className="mb-4 flex justify-center gap-2 border-b border-gray-200">
              <button
                type="button"
                onClick={() => setTab('terbaru')}
                className={`border-b-2 px-4 py-2.5 text-base font-bold tracking-wide ${
                  tab === 'terbaru'
                    ? 'border-dlh-green text-dlh-green'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                TERBARU
              </button>
              <button
                type="button"
                onClick={() => setTab('terpopuler')}
                className={`border-b-2 px-4 py-2.5 text-base font-bold tracking-wide ${
                  tab === 'terpopuler'
                    ? 'border-dlh-green text-dlh-green'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                TERPOPULER
              </button>
            </div>
            <div className="max-h-[320px] overflow-y-auto pr-1 sm:max-h-[390px] lg:max-h-[480px]">
              <ul className="space-y-2 text-left">
                {list.map((item, i) => (
                  <li key={i}>
                    <a
                      href={`#/berita/${encodeURIComponent(tab === 'terbaru' ? `terbaru-${i}` : `populer-${i}`)}`}
                      className="group block rounded-xl border border-transparent bg-white px-3 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-100 hover:bg-emerald-50/55 hover:shadow-sm"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-600/85">
                        {categoryPalette[i % categoryPalette.length]}
                      </p>
                      <p className="mt-1 text-[15px] font-semibold leading-snug text-gray-900 group-hover:text-dlh-green">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">{item.date}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#/berita"
              className="mt-6 inline-flex w-auto self-center items-center justify-center rounded-full border-2 border-dlh-green px-6 py-2.5 text-sm font-semibold text-dlh-green transition hover:bg-dlh-green hover:text-white lg:mt-auto"
            >
              Lihat Semua Berita
            </a>
          </div>

          <aside className="lg:col-span-3">
            <div className="group relative overflow-hidden rounded-2xl border border-emerald-100 shadow-card ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative">
                <img
                  src={kepalaDinas.photo}
                  alt={kepalaDinas.name}
                  className="h-[430px] w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 text-white transition duration-300 group-hover:opacity-0 group-hover:translate-y-3">
                  <h3 className="text-lg font-bold leading-tight">{kepalaDinas.name}</h3>
                  <p className="mt-1 text-sm text-white/90">{kepalaDinas.jabatan}</p>
                </div>

                <div className="absolute inset-0 flex items-end bg-black/65 p-5 opacity-0 transition duration-300 group-hover:opacity-100">
                  <div>
                    <h3 className="text-lg font-bold leading-tight text-white">{kepalaDinas.name}</h3>
                    <p className="mt-1 text-sm text-white/90">{kepalaDinas.jabatan}</p>
                    <p className="mt-3 inline-flex rounded-full bg-emerald-500/25 px-3 py-1 text-xs font-semibold text-emerald-100">
                      Masa Jabatan: {kepalaDinas.masaJabatan}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/90">
                      {kepalaDinas.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
