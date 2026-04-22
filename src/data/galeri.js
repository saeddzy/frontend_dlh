/**
 * Arsip galeri foto & video DLH Kota Jambi (data statis / demo).
 */
const foto = [
  {
    id: 'foto-0',
    type: 'foto',
    title: 'Penanaman pohon bersama masyarakat',
    date: '15 Mar 2024',
    src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto-1',
    type: 'foto',
    title: 'Rapat koordinasi pengelolaan sampah',
    date: '12 Mar 2024',
    src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto-2',
    type: 'foto',
    title: 'Sosialisasi lingkungan di tingkat kelurahan',
    date: '8 Mar 2024',
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto-3',
    type: 'foto',
    title: 'Forum perangkat daerah bidang lingkungan',
    date: '5 Mar 2024',
    src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto-4',
    type: 'foto',
    title: 'Monitoring kualitas udara perkotaan',
    date: '1 Mar 2024',
    src: 'https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto-5',
    type: 'foto',
    title: 'Pelatihan bank sampah tingkat kecamatan',
    date: '26 Feb 2024',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto-6',
    type: 'foto',
    title: 'Kunjungan teknis fasilitas pengolahan limbah',
    date: '22 Feb 2024',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto-7',
    type: 'foto',
    title: 'Kolaborasi edukasi dengan dunia usaha',
    date: '18 Feb 2024',
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto-8',
    type: 'foto',
    title: 'Aksi bersih sungai bersama relawan',
    date: '14 Feb 2024',
    src: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto-9',
    type: 'foto',
    title: 'Penghijauan koridor jalan kota',
    date: '10 Feb 2024',
    src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto-10',
    type: 'foto',
    title: 'Sosialisasi AMDAL bagi pelaku usaha',
    date: '6 Feb 2024',
    src: 'https://images.unsplash.com/photo-1618477462146-050d2767eac4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto-11',
    type: 'foto',
    title: 'Pendampingan sekolah adiwiyata',
    date: '2 Feb 2024',
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto-12',
    type: 'foto',
    title: 'Inspeksi pencemaran lingkungan',
    date: '28 Jan 2024',
    src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto-13',
    type: 'foto',
    title: 'Kampanye pengurangan sampah plastik',
    date: '22 Jan 2024',
    src: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'foto-14',
    type: 'foto',
    title: 'Evaluasi kinerja pengelolaan sampah',
    date: '15 Jan 2024',
    src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
  },
];

const video = [
  {
    id: 'vid-0',
    type: 'video',
    title: 'Cuplikan edukasi pengelolaan sampah rumah tangga',
    date: 'Mar 2024',
    thumb: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15f?auto=format&fit=crop&w=1200&q=80',
    embedUrl: 'https://www.youtube.com/embed/L_LUpnjgPso',
  },
  {
    id: 'vid-1',
    type: 'video',
    title: 'Dokumentasi kegiatan penghijauan kota',
    date: 'Feb 2024',
    thumb: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
    embedUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
  },
  {
    id: 'vid-2',
    type: 'video',
    title: 'Profil layanan informasi lingkungan DLH',
    date: 'Jan 2024',
    thumb: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    embedUrl: 'https://www.youtube.com/embed/aqz-KE-bpKQ',
  },
];

export function getAllGalleryItems() {
  return [...foto, ...video];
}

/** 8 foto untuk grid beranda — konsisten dengan arsip */
export function getGalleryPreviewPhotos() {
  return foto.slice(0, 8).map((item) => item.src);
}
