export const featuredNews = [
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

export const terbaru = [
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

export const terpopuler = [
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

const terbaruCategories = ['Kegiatan', 'Pengumuman', 'Lingkungan', 'Program'];
const terpopulerCategories = ['Populer', 'Analisis', 'Informasi', 'Sorotan'];

/**
 * Gabungan berita untuk halaman arsip (tanpa duplikat judul yang sama).
 */
export function getAllBeritaArchive() {
  const imgs = featuredNews.map((n) => n.image);
  const items = [];

  featuredNews.forEach((n, i) => {
    items.push({
      id: `featured-${i}`,
      ...n,
      badge: 'Sorotan',
    });
  });

  terbaru.forEach((n, i) => {
    items.push({
      id: `terbaru-${i}`,
      title: n.title,
      date: n.date,
      category: terbaruCategories[i % terbaruCategories.length],
      image: imgs[i % imgs.length],
      author: 'Humas DLH Kota Jambi',
      badge: 'Terbaru',
    });
  });

  terpopuler.forEach((n, i) => {
    items.push({
      id: `populer-${i}`,
      title: n.title,
      date: n.date,
      category: terpopulerCategories[i % terpopulerCategories.length],
      image: imgs[(i + 2) % imgs.length],
      author: 'Redaksi DLH',
      badge: 'Terpopuler',
    });
  });

  return items;
}

/**
 * Ambil satu berita untuk halaman detail (isi paragraf placeholder jika belum ada di CMS).
 */
export function getBeritaById(id) {
  const all = getAllBeritaArchive();
  const item = all.find((x) => x.id === id);
  if (!item) return null;

  const paragraphs = [
    `${item.title} merupakan bagian dari dokumentasi kegiatan dan kebijakan Dinas Lingkungan Hidup Kota Jambi dalam mewujudkan lingkungan yang bersih, hijau, dan berkelanjutan.`,
    'Kegiatan ini melibatkan koordinasi lintas unit kerja, pemangku kepentingan, dan partisipasi masyarakat. Materi presentasi, notulensi rapat, dan materi publikasi dapat diunduh melalui layanan informasi publik apabila telah tersedia.',
    'Untuk klarifikasi atau wawancara terkait berita ini, silakan hubungi bagian humas DLH Kota Jambi pada jam kerja melalui kanal kontak resmi yang tercantum di footer website.',
  ];

  return { ...item, paragraphs };
}

/**
 * Berita lain untuk sidebar (prioritas kategori sama).
 */
export function getRelatedBerita(id, limit = 4) {
  const all = getAllBeritaArchive();
  const current = all.find((x) => x.id === id);
  if (!current) return [];
  const others = all.filter((x) => x.id !== id);
  const sameCat = others.filter((x) => x.category === current.category);
  const rest = others.filter((x) => x.category !== current.category);
  return [...sameCat, ...rest].slice(0, limit);
}
