/**
 * Program unggulan DLH Kota Jambi — data statis untuk beranda & halaman lengkap.
 *
 * Ilustrasi kartu (animasi):
 * - `water` = air mengisi
 * - `plant` = tumbuhan bebas
 * - `cloud` = awan bergerak lembut
 * Kunci lama (forest, cycle, aurora) tetap dipetakan ke tema baru.
 *
 */

/** Urutan bergilir jika `cardVisual` tidak diisi */
export const PROGRAM_CARD_VISUAL_ROTATION = ['water', 'plant', 'cloud'];

const LEGACY_CARD_VISUAL = {
  forest: 'plant',
  water: 'water',
  cycle: 'cloud',
  aurora: 'cloud',
};

/**
 * @param {{ cardVisual?: string }} program
 * @param {number} indexInList — indeks di array (0-based)
 * @returns {'water' | 'plant' | 'cloud'}
 */
export function getProgramCardVisual(program, indexInList) {
  const v = program.cardVisual;
  if (v === 'water' || v === 'plant' || v === 'cloud') return v;
  if (v && LEGACY_CARD_VISUAL[v]) return LEGACY_CARD_VISUAL[v];
  return PROGRAM_CARD_VISUAL_ROTATION[indexInList % PROGRAM_CARD_VISUAL_ROTATION.length];
}

export const programsData = [
  {
    id: 'taman-kehati-kota-jambi',
    cardVisual: 'plant',
    title: 'Taman Kehati Kota Jambi',
    summary:
      'Pelestarian keanekaragaman hayati dan edukasi lingkungan melalui kawasan konservasi serta kegiatan masyarakat.',
    coverImage:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80',
    paragraphs: [
      'Program Taman Kehati Kota Jambi mengembangkan ruang hijau yang sekaligus berfungsi sebagai laboratorium alam terbuka. Kawasan ini menjadi tempat konservasi flora lokal, penanaman species endemik, dan kegiatan edukasi bagi pelajar serta masyarakat umum.',
      'Melalui kerja sama dengan komunitas pecinta alam dan dunia pendidikan, DLH menyelenggarakan kegiatan rutin seperti identifikasi jenis tumbuhan, monitoring satwa kecil, dan sosialisasi pentingnya menjaga ekosistem perkotaan yang seimbang.',
      'Partisipasi masyarakat menjadi kunci keberhasilan program. Warga dapat mengikuti volunteer penanaman, pelatihan pembibitan, serta forum diskusi tentang adaptasi perubahan iklim di tingkat lokal.',
    ],
    highlights: [
      'Konservasi dan pembibitan tanaman lokal',
      'Edukasi lingkungan untuk sekolah dan komunitas',
      'Monitoring keanekaragaman hayati perkotaan',
    ],
  },
  {
    id: 'sungai-kawasan-hijau',
    cardVisual: 'water',
    title: 'Sungai & Kawasan Hijau',
    summary:
      'Program terpadu untuk menjaga kualitas perairan perkotaan, mengendalikan pencemaran, dan melibatkan masyarakat Kota Jambi.',
    coverImage:
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1920&q=80',
    paragraphs: [
      'Program ini mengintegrasikan pengelolaan sungai-sungai utama di wilayah Kota Jambi dengan penghijauan tepian dan pengendalian limbah domestik maupun industri skala kecil. Pendekatan berbasis wilayah memastikan setiap segmen aliran mendapat perhatian sesuai karakteristik teknis dan sosialnya.',
      'Kegiatan rutin meliputi pemantauan kualitas air, pendampingan pemasangan IPAL komunal di titik prioritas, serta gerakan bersih-bersih sungai bersama relawan dan aparat kelurahan.',
      'Kawasan hijau di sepanjang koridor sungai dirancang untuk mengurangi erosi, menyerap polutan, dan memberi ruang rekreasi aman bagi warga, sekaligus meningkatkan kesadaran akan pentingnya air bersih bagi kesehatan publik.',
    ],
    highlights: [
      'Pemantauan kualitas air berkala',
      'Penghijauan tepian sungai dan jalur hijau',
      'Kolaborasi multi pihak untuk pencegahan pencemaran',
    ],
  },
  {
    id: 'sampah-kita',
    cardVisual: 'cloud',
    title: 'Sampah Kita',
    summary:
      'Gerakan pengelolaan sampah dari hulu ke hilir: pilah, kurangi, dan manfaatkan untuk lingkungan yang lebih bersih.',
    coverImage:
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15f?auto=format&fit=crop&w=1920&q=80',
    paragraphs: [
      'Gerakan Sampah Kita mendorong perubahan perilaku sejak dari rumah tangga: memilah organik dan anorganik, mengurangi sampah sekali pakai, dan memanfaatkan bank sampah serta fasilitas daur ulang yang didukung pemerintah daerah.',
      'DLH Kota Jambi memfasilitasi pembinaan bank sampah tingkat kecamatan, pelatihan pengelolaan kompos skala rumah tangga, dan kemitraan dengan pelaku usaha untuk mengurangi kemasan plastik sekali pakai.',
      'Program ini selaras dengan target daerah dalam pengurangan volume sampah ke TPA melalui 3R (reduce, reuse, recycle) dan penguatan ekonomi sirkular berbasis komunitas.',
    ],
    highlights: [
      'Pembinaan bank sampah dan TPS3R',
      'Sosialisasi pilah sampah dari sumber',
      'Kemitraan pengurangan plastik dengan pelaku usaha',
    ],
  },
];

export function getAllPrograms() {
  return programsData;
}

export function getProgramById(id) {
  if (!id) return null;
  return programsData.find((p) => p.id === id) ?? null;
}
