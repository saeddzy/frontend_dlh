import { useState } from 'react';

const featuredNews = [
  {
    image:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
    category: 'Kegiatan',
    title: 'Forum Perangkat Daerah 2024: sinergi kebijakan lingkungan hidup',
    date: '12 April 2024',
    author: 'Humas DLH Kota Jambi',
  },
  {
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    category: 'Pengumuman',
    title: 'DLH Kota Jambi luncurkan gerakan bersama pengurangan sampah plastik',
    date: '10 April 2024',
    author: 'Admin DLH',
  },
  {
    image:
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
    category: 'Lingkungan',
    title: 'Monitoring kualitas udara perkotaan diperkuat di titik strategis',
    date: '8 April 2024',
    author: 'Bidang PPKL',
  },
  {
    image:
      'https://images.unsplash.com/photo-1618477462146-050d2767eac4?auto=format&fit=crop&w=1200&q=80',
    category: 'Program',
    title: 'Kolaborasi edukasi sekolah hijau untuk siswa SMA se-Kota Jambi',
    date: '6 April 2024',
    author: 'Tim Edukasi',
  },
  {
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
    category: 'Lingkungan',
    title: 'Penghijauan kawasan prioritas melalui aksi tanam pohon serentak',
    date: '4 April 2024',
    author: 'Tim Penghijauan DLH',
  },
];

const terbaru = [
  { title: 'Rapat koordinasi pengelolaan sampah perkotaan Kota Jambi', date: '10 Apr 2024' },
  { title: 'Sosialisasi perizinan lingkungan bagi pelaku usaha UMKM', date: '8 Apr 2024' },
  { title: 'Monitoring kualitas air sungai utama di wilayah prioritas', date: '5 Apr 2024' },
  { title: 'Kegiatan penanaman pohon bersama masyarakat dan komunitas', date: '2 Apr 2024' },
  { title: 'Uji emisi kendaraan dinas untuk menekan polusi udara perkotaan', date: '31 Mar 2024' },
  { title: 'Pendampingan bank sampah tingkat kecamatan di Kota Jambi', date: '29 Mar 2024' },
  { title: 'Penilaian kinerja pengelolaan limbah B3 sektor industri', date: '27 Mar 2024' },
  { title: 'Aksi bersih sungai bersama komunitas relawan lingkungan', date: '25 Mar 2024' },
  { title: 'Workshop ekonomi sirkular untuk pelaku usaha lokal', date: '22 Mar 2024' },
  { title: 'Penguatan sistem informasi pengaduan pencemaran lingkungan', date: '20 Mar 2024' },
  { title: 'Sosialisasi sekolah adiwiyata tingkat SMA/SMK Kota Jambi', date: '18 Mar 2024' },
  { title: 'Pembinaan teknis pengelolaan RTH di kawasan perkotaan', date: '15 Mar 2024' },
];

const terpopuler = [
  { title: 'Program sungai bersih: update capaian dan kolaborasi multi pihak', date: '28 Mar 2024' },
  { title: 'Panduan pengurangan emisi untuk industri di Kota Jambi', date: '15 Mar 2024' },
  { title: 'Pengumuman seleksi tenaga ahli lingkungan — tahap administrasi', date: '10 Mar 2024' },
  { title: 'Evaluasi AMDAL untuk proyek infrastruktur strategis', date: '5 Mar 2024' },
  { title: 'Program penghijauan koridor jalan kota capai ribuan bibit', date: '1 Mar 2024' },
  { title: 'Cara mudah lapor pencemaran melalui aplikasi DLH Mobile', date: '26 Feb 2024' },
  { title: 'Rekap indeks kualitas udara bulanan wilayah Kota Jambi', date: '22 Feb 2024' },
  { title: 'Kolaborasi kampus dan DLH untuk riset kualitas air sungai', date: '18 Feb 2024' },
  { title: 'Panduan teknis pemilahan sampah rumah tangga terbaru', date: '14 Feb 2024' },
  { title: 'Infografik capaian pengurangan sampah plastik 2024', date: '10 Feb 2024' },
  { title: 'Penguatan pengawasan dokumen lingkungan berbasis digital', date: '7 Feb 2024' },
  { title: 'Forum publik kebijakan adaptasi perubahan iklim daerah', date: '4 Feb 2024' },
];

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
    <section id="informasi-publik" className="scroll-mt-20 bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
          Berita Terkini DLH Kota Jambi
        </h2>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <article className="lg:col-span-6">
            <div className="group relative overflow-hidden rounded-2xl shadow-card ring-1 ring-black/5">
              <div className="relative aspect-[16/12] overflow-hidden sm:aspect-[16/10] lg:h-[580px] lg:aspect-auto">
                <img
                  src={activeFeatured.image}
                  alt={activeFeatured.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-white/10 bg-black/35 p-5 pb-20 text-white backdrop-blur-md sm:p-6 sm:pb-24">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/85">
                    {activeFeatured.category}
                  </p>
                  <h3 className="mt-2 max-w-[92%] text-[2rem] font-extrabold leading-tight tracking-tight text-white sm:text-[2.2rem]">
                    {activeFeatured.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-white/90">
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

                <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 rounded-full border border-white/35 bg-black/25 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
                  >
                    Baca Selengkapnya
                    <span aria-hidden>→</span>
                  </a>
                </div>

                <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-md sm:bottom-6 sm:right-6">
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
                      href="#"
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
              href="#"
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
