const strukturItems = [
  { jabatan: 'Kepala Dinas', nama: 'Dr. H. Aulia Rahman, M.Si' },
  { jabatan: 'Sekretaris Dinas', nama: 'Ir. Maya Sari, M.T' },
  { jabatan: 'Kabid Tata Lingkungan', nama: 'Yudi Pratama, S.T., M.Eng' },
  { jabatan: 'Kabid Pengelolaan Sampah', nama: 'Rina Wulandari, S.Sos' },
  { jabatan: 'Kabid Pengendalian Pencemaran', nama: 'Andri Saputra, S.Hut' },
  { jabatan: 'Kabid Penataan & Penaatan', nama: 'Dewi Lestari, S.T' },
];

const tupoksiItems = [
  {
    title: 'Perumusan Kebijakan Lingkungan',
    desc: 'Menyusun kebijakan teknis daerah di bidang perlindungan dan pengelolaan lingkungan hidup Kota Jambi.',
  },
  {
    title: 'Pengelolaan Persampahan',
    desc: 'Mengatur pengurangan, pengumpulan, pengangkutan, pengolahan, dan pemrosesan akhir sampah secara berkelanjutan.',
  },
  {
    title: 'Pengendalian Pencemaran',
    desc: 'Melakukan pemantauan kualitas air, udara, dan tanah serta penanganan sumber pencemar di wilayah kota.',
  },
  {
    title: 'Pembinaan dan Pengawasan',
    desc: 'Membina pelaku usaha dan masyarakat serta mengawasi ketaatan terhadap peraturan lingkungan yang berlaku.',
  },
  {
    title: 'Edukasi dan Partisipasi Publik',
    desc: 'Mendorong gerakan masyarakat peduli lingkungan melalui sosialisasi, kampanye, dan kolaborasi lintas sektor.',
  },
];

const fungsiItems = [
  'Perumusan kebijakan teknis bidang tata lingkungan, persampahan, dan pengendalian pencemaran/kerusakan lingkungan.',
  'Pelaksanaan pembinaan, pengawasan, serta evaluasi terhadap pelaksanaan perizinan dan kepatuhan lingkungan.',
  'Koordinasi penanganan sampah dari sumber hingga pemrosesan akhir yang ramah lingkungan.',
  'Penyediaan data, informasi, dan layanan edukasi publik untuk peningkatan partisipasi masyarakat.',
  'Pelaksanaan tugas lain yang diberikan Wali Kota sesuai ketentuan peraturan perundang-undangan.',
];

export default function ProfilePage({ type }) {
  const isStruktur = type === 'struktur';
  const heading = isStruktur ? 'Struktur Organisasi DLH Kota Jambi' : 'Tupoksi Dinas Lingkungan Hidup Kota Jambi';

  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Profil Dinas</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{heading}</h2>
      <div className="mt-6 h-1 w-24 rounded-full bg-emerald-500" />

      {isStruktur ? (
        <div className="mt-7 space-y-4 text-gray-700">
          <p className="text-sm leading-relaxed sm:text-base">
            Struktur organisasi DLH Kota Jambi dirancang untuk mendukung koordinasi lintas bidang secara efektif,
            mulai dari perencanaan kebijakan, pengendalian pencemaran, pengelolaan sampah, hingga edukasi
            lingkungan kepada masyarakat.
          </p>
          <ol className="space-y-2 text-sm leading-relaxed sm:text-base">
            {strukturItems.map((item, idx) => (
              <li key={item.jabatan}>
                <span className="font-semibold text-gray-900">{idx + 1}. {item.jabatan}</span>
                <span className="text-gray-600"> - {item.nama}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="mt-7 space-y-6 text-gray-700">
          <p className="text-sm leading-relaxed sm:text-base">
            Dinas Lingkungan Hidup Kota Jambi mempunyai tugas pokok membantu Wali Kota dalam melaksanakan urusan
            pemerintahan daerah di bidang lingkungan hidup, meliputi penyusunan kebijakan, pelaksanaan program,
            pembinaan, pengawasan, serta evaluasi berkelanjutan.
          </p>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Rincian Tugas Pokok</h3>
            <ol className="mt-3 space-y-2 text-sm leading-relaxed sm:text-base">
              {tupoksiItems.map((item, idx) => (
                <li key={item.title}>
                  <span className="font-semibold text-gray-900">{idx + 1}. {item.title}:</span>{' '}
                  <span className="text-gray-600">{item.desc}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Fungsi</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed marker:text-emerald-600 sm:text-base">
              {fungsiItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
