import { useEffect, useMemo, useRef, useState } from 'react';

const menuGroups = [
  {
    title: 'Manajemen Konten',
    items: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'berita', label: 'Berita / Artikel' },
      { id: 'pengumuman', label: 'Pengumuman' },
      { id: 'agenda', label: 'Agenda / Kegiatan' },
      { id: 'halaman-statis', label: 'Halaman Statis' },
      { id: 'kategori-tag', label: 'Kategori & Tag' },
      { id: 'editor', label: 'Editor Konten (WYSIWYG)' },
    ],
  },
  {
    title: 'Manajemen Media',
    items: [{ id: 'file-manager', label: 'File Manager' }],
  },
  {
    title: 'Struktur Organisasi',
    items: [
      { id: 'data-pejabat', label: 'Data Pejabat & Pegawai' },
      { id: 'tree-organisasi', label: 'Tree Struktur Organisasi' },
    ],
  },
  {
    title: 'Statistik & Data',
    items: [{ id: 'analytics', label: 'Analytics Pengunjung' }],
  },
  {
    title: 'Menu & Navigasi',
    items: [
      { id: 'menu-header', label: 'Menu Header' },
      { id: 'menu-footer', label: 'Menu Footer / Link Cepat' },
    ],
  },
  {
    title: 'Banner & Slider',
    items: [{ id: 'banner-slider', label: 'Hero & Carousel' }],
  },
  {
    title: 'Pengaturan Website',
    items: [
      { id: 'settings-brand', label: 'Identitas & Branding' },
      { id: 'settings-contact', label: 'Kontak & Sosial Media' },
    ],
  },
  {
    title: 'FAQ',
    items: [
      { id: 'faq-daftar', label: 'Daftar FAQ' },
      { id: 'faq-kategori', label: 'Kategori FAQ' },
    ],
  },
  {
    title: 'Sistem',
    items: [{ id: 'pengguna-admin', label: 'Pengguna Admin' }],
  },
];

const quickStats = [
  { label: 'Konten Terpublikasi', value: '312', trend: '+18 minggu ini' },
  { label: 'Draft', value: '24', trend: 'Perlu review' },
  { label: 'Terjadwal', value: '7', trend: 'Publish otomatis' },
  { label: 'File Media', value: '1.284', trend: 'SK, laporan, PDF' },
];

function Badge({ children, tone = 'slate' }) {
  const tones = {
    slate: 'bg-slate-100 text-slate-700',
    emerald: 'bg-emerald-100 text-emerald-800',
    amber: 'bg-amber-100 text-amber-800',
    violet: 'bg-violet-100 text-violet-800',
    rose: 'bg-rose-100 text-rose-800',
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>{children}</span>
  );
}

function PanelHeader({ title, description, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm text-slate-600">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

function WysiwygMock() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-inner">
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 px-2 py-2">
        {['B', 'I', 'U', 'H2', '•', '1.', '🔗', '🖼'].map((t) => (
          <button
            key={t}
            type="button"
            className="rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-600 transition hover:bg-white hover:shadow-sm"
          >
            {t}
          </button>
        ))}
        <span className="ml-2 hidden text-[10px] text-slate-400 sm:inline">
          Integrasi: CKEditor / TinyMCE
        </span>
      </div>
      <textarea
        rows={12}
        className="w-full resize-y border-0 bg-white px-4 py-3 text-sm text-slate-800 outline-none ring-0 placeholder:text-slate-400"
        placeholder="Tulis isi artikel, pengumuman, atau halaman statis di sini..."
        defaultValue=""
      />
    </div>
  );
}

function renderPanel(activeId) {
  switch (activeId) {
    case 'dashboard':
      return (
        <>
          <PanelHeader
            title="Dashboard"
            description="Ringkasan aktivitas konten, publikasi, media, dan trafik website profil pemerintah."
            actions={
              <>
                <button type="button" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
                  Buat Konten Baru
                </button>
                <a href="#/" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  Lihat Website
                </a>
              </>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {quickStats.map((s) => (
              <article key={s.label} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/80 p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{s.label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="mt-1 text-xs font-medium text-emerald-700">{s.trend}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">Aktivitas Terbaru</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex justify-between gap-2 border-b border-slate-100 pb-2">
                  <span>Berita diterbitkan: “Program Hijau Kota”</span>
                  <span className="shrink-0 text-xs text-slate-400">2 jam lalu</span>
                </li>
                <li className="flex justify-between gap-2 border-b border-slate-100 pb-2">
                  <span>Pengumuman dijadwalkan: SK No. 12/2026</span>
                  <span className="shrink-0 text-xs text-slate-400">Kemarin</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>File diunggah: laporan-triwulan.pdf</span>
                  <span className="shrink-0 text-xs text-slate-400">3 hari lalu</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">Pintasan Modul</h3>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <span className="rounded-xl bg-slate-50 px-3 py-2 text-slate-700">Manajemen Konten</span>
                <span className="rounded-xl bg-slate-50 px-3 py-2 text-slate-700">File Manager</span>
                <span className="rounded-xl bg-slate-50 px-3 py-2 text-slate-700">Struktur Organisasi</span>
                <span className="rounded-xl bg-slate-50 px-3 py-2 text-slate-700">Pengaturan Website</span>
              </div>
            </div>
          </div>
        </>
      );

    case 'berita':
      return (
        <>
          <PanelHeader
            title="Berita / Artikel"
            description="Kelola artikel berita: status draft atau terbit, jadwal publikasi otomatis, kategori, dan tag."
            actions={
              <button type="button" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                + Artikel Baru
              </button>
            }
          />
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge tone="slate">Semua</Badge>
            <Badge tone="amber">Draft</Badge>
            <Badge tone="emerald">Terbit</Badge>
            <Badge tone="violet">Terjadwal</Badge>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Judul</th>
                  <th className="px-4 py-3">Kategori / Tag</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Jadwal</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {[
                  ['Forum Lingkungan Hidup 2026', 'Berita · lingkungan, kota', 'Terbit', '—'],
                  ['Rencana Pengelolaan Sampah', 'Berita · sampah', 'Draft', '—'],
                  ['Undangan Rapat Koordinasi', 'Berita · internal', 'Terjadwal', '20 Apr 2026, 08:00'],
                ].map(([judul, kt, status, jadwal]) => (
                  <tr key={judul} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-medium">{judul}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{kt}</td>
                    <td className="px-4 py-3">
                      {status === 'Terbit' && <Badge tone="emerald">Publish</Badge>}
                      {status === 'Draft' && <Badge tone="amber">Draft</Badge>}
                      {status === 'Terjadwal' && <Badge tone="violet">Terjadwal</Badge>}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{jadwal}</td>
                    <td className="px-4 py-3 text-right">
                      <button type="button" className="font-semibold text-emerald-700 hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );

    case 'pengumuman':
      return (
        <>
          <PanelHeader
            title="Pengumuman"
            description="Pengumuman resmi dinas: SK, pemberitahuan layanan, dan informasi singkat untuk publik."
            actions={
              <button type="button" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                + Pengumuman
              </button>
            }
          />
          <div className="space-y-3">
            {['Pembukaan Pendaftaran Sertifikasi', 'Jam Layanan Kantor Selama Lebaran'].map((t) => (
              <div key={t} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div>
                  <p className="font-semibold text-slate-900">{t}</p>
                  <p className="mt-1 text-xs text-slate-500">Draft · Kategori: Layanan Publik</p>
                </div>
                <div className="flex gap-2">
                  <Badge tone="amber">Draft</Badge>
                  <button type="button" className="text-sm font-semibold text-emerald-700 hover:underline">
                    Terbitkan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      );

    case 'agenda':
      return (
        <>
          <PanelHeader
            title="Agenda / Kegiatan"
            description="Kalender kegiatan dinas: rapat, sosialisasi, aksi lingkungan, dan agenda publik."
            actions={
              <button type="button" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                + Agenda
              </button>
            }
          />
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm font-semibold text-slate-900">April 2026</span>
                <span className="text-xs text-slate-500">Tampilan kalender (integrasi penuh nanti)</span>
              </div>
              <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-slate-500">
                {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((d) => (
                  <span key={d} className="py-2 font-semibold">
                    {d}
                  </span>
                ))}
                {Array.from({ length: 14 }, (_, i) => (
                  <span key={i} className={`rounded-lg py-2 ${i === 5 ? 'bg-emerald-100 font-semibold text-emerald-800' : ''}`}>
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Hari ini</p>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 text-sm">
                <p className="font-semibold text-emerald-900">09:00 — Rapat Koordinasi DLH</p>
                <p className="mt-1 text-xs text-emerald-800">Ruang Rapat Utama</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm">
                <p className="font-semibold text-slate-900">14:00 — Sosialisasi 3R di Sekolah</p>
                <p className="mt-1 text-xs text-slate-500">Kota Jambi</p>
              </div>
            </div>
          </div>
        </>
      );

    case 'halaman-statis':
      return (
        <>
          <PanelHeader
            title="Halaman Statis"
            description="Halaman tetap seperti Tentang DLH, Visi Misi, Struktur Organisasi (teks), Kebijakan Privasi, dan konten legal lainnya."
            actions={
              <button type="button" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                + Halaman Baru
              </button>
            }
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['Tentang Kami', '/#/profil/struktur-organisasi', 'Terbit'],
              ['Visi & Misi', '/#/profil/tupoksi-dinas', 'Terbit'],
              ['Struktur Organisasi (halaman)', '/#/profil/struktur-organisasi', 'Draft'],
              ['Kebijakan Privasi', '#', 'Draft'],
            ].map(([judul, slug, st]) => (
              <div key={judul} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="font-semibold text-slate-900">{judul}</p>
                <p className="mt-1 truncate text-xs text-slate-500">{slug}</p>
                <div className="mt-3 flex items-center justify-between">
                  {st === 'Terbit' ? <Badge tone="emerald">Terbit</Badge> : <Badge tone="amber">Draft</Badge>}
                  <button type="button" className="text-sm font-semibold text-emerald-700 hover:underline">
                    Edit konten
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      );

    case 'kategori-tag':
      return (
        <>
          <PanelHeader
            title="Kategori & Tag"
            description="Organisasi konten: kategori utama untuk navigasi dan tag untuk pencarian silang."
            actions={
              <button type="button" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                + Kategori
              </button>
            }
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">Kategori</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {['Berita', 'Pengumuman', 'Agenda', 'Lingkungan', 'Pelayanan'].map((c) => (
                  <li key={c} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                    <span>{c}</span>
                    <button type="button" className="text-xs font-semibold text-slate-500 hover:text-emerald-700">
                      Ubah
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">Tag Populer</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {['sampah', 'udara', 'hijau', 'edukasi', '3R', 'kota jambi', 'csr', 'monitoring'].map((t) => (
                  <span key={t} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                    #{t}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-500">Tag dapat digabung otomatis dari konten atau dikelola manual.</p>
            </div>
          </div>
        </>
      );

    case 'editor':
      return (
        <>
          <PanelHeader
            title="Editor Konten (WYSIWYG)"
            description="Editor visual untuk isi berita, pengumuman, dan halaman statis. Sambungkan ke CKEditor 5 atau TinyMCE pada integrasi backend."
            actions={
              <>
                <button type="button" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  Simpan Draft
                </button>
                <button type="button" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                  Publikasi
                </button>
              </>
            }
          />
          <div className="mb-4 grid gap-4 lg:grid-cols-3">
            <label className="lg:col-span-2 block text-sm font-medium text-slate-700">
              Judul
              <input
                type="text"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="Judul konten"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Status
              <select className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
                <option>Draft</option>
                <option>Terbit</option>
                <option>Terjadwal</option>
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Kategori
              <select className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
                <option>Berita</option>
                <option>Pengumuman</option>
                <option>Halaman Statis</option>
              </select>
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Tag (pisahkan koma)
              <input
                type="text"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder="lingkungan, kota, edukasi"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Jadwal publish otomatis
              <input
                type="datetime-local"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          </div>
          <WysiwygMock />
        </>
      );

    case 'file-manager':
      return (
        <>
          <PanelHeader
            title="File Manager"
            description="Unggah gambar, PDF, SK, laporan, dan dokumen publik. Kelola folder dan pratinjau file sebelum dipublikasikan."
            actions={
              <button type="button" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                + Upload File
              </button>
            }
          />
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-3">
              <p className="text-xs font-semibold uppercase text-slate-500">Folder</p>
              <ul className="mt-3 space-y-1 text-sm">
                {['📁 SK & Peraturan', '📁 Laporan Publik', '📁 Berita / Media', '📁 Formulir', '📁 Arsip'].map((f) => (
                  <li key={f}>
                    <button type="button" className="w-full rounded-lg px-2 py-2 text-left text-slate-700 hover:bg-emerald-50 hover:text-emerald-900">
                      {f}
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" className="mt-3 w-full rounded-xl border border-dashed border-slate-300 py-2 text-xs font-semibold text-slate-500 hover:border-emerald-400 hover:text-emerald-700">
                + Folder Baru
              </button>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-600">SK & Peraturan /</span>
                <span className="text-sm font-semibold text-slate-900">2026</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  ['sk-lingkungan-01.pdf', 'PDF', 'rose'],
                  ['laporan-triwulan-i.pdf', 'PDF', 'rose'],
                  ['banner-hero.jpg', 'Gambar', 'emerald'],
                  ['logo-opd.png', 'Gambar', 'emerald'],
                ].map(([name, type, tone]) => (
                  <button
                    key={name}
                    type="button"
                    className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-left text-xs transition hover:border-emerald-200 hover:bg-emerald-50/50"
                  >
                    <p className="truncate font-medium text-slate-900">{name}</p>
                    <Badge tone={tone}>{type}</Badge>
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 text-slate-100 shadow-sm lg:col-span-3">
              <p className="text-xs font-semibold uppercase text-slate-400">Preview</p>
              <div className="mt-4 flex aspect-[3/4] items-center justify-center rounded-xl border border-white/10 bg-white/5 text-center text-sm text-slate-400">
                Pilih file untuk pratinjau
                <br />
                <span className="text-xs">(PDF / gambar)</span>
              </div>
            </div>
          </div>
        </>
      );

    case 'data-pejabat':
      return (
        <>
          <PanelHeader
            title="Data Pejabat & Pegawai"
            description="Kelola nama, jabatan, foto, dan profil singkat untuk ditampilkan di website (termasuk halaman struktur)."
            actions={
              <button type="button" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                + Pejabat
              </button>
            }
          />
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Foto</th>
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">Jabatan</th>
                  <th className="px-4 py-3">Unit</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ['Dr. H. Aulia Rahman', 'Kepala Dinas', 'Pimpinan'],
                  ['Ir. Maya Sari', 'Sekretaris', 'Setda Teknis'],
                ].map(([nama, jab, unit]) => (
                  <tr key={nama} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-200" />
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">{nama}</td>
                    <td className="px-4 py-3">{jab}</td>
                    <td className="px-4 py-3 text-slate-500">{unit}</td>
                    <td className="px-4 py-3 text-right">
                      <button type="button" className="font-semibold text-emerald-700 hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );

    case 'tree-organisasi':
      return (
        <>
          <PanelHeader
            title="Tree Struktur Organisasi"
            description="Hirarki organisasi untuk tampilan frontend yang jelas: drag & drop urutan dapat ditambahkan pada integrasi penuh."
            actions={
              <button type="button" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                Simpan Urutan
              </button>
            }
          />
          <div className="rounded-2xl border border-slate-200 bg-white p-6 font-mono text-sm text-slate-800 shadow-sm">
            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-emerald-800">└─</span> Kepala Dinas
                <ul className="ml-6 mt-2 space-y-2 border-l border-emerald-200 pl-4">
                  <li>
                    <span className="text-emerald-700">├─</span> Sekretaris
                  </li>
                  <li>
                    <span className="text-emerald-700">├─</span> Bidang Tata Lingkungan
                  </li>
                  <li>
                    <span className="text-emerald-700">├─</span> Bidang Pengelolaan Sampah
                  </li>
                  <li>
                    <span className="text-emerald-700">└─</span> Bidang Pengendalian Pencemaran
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </>
      );

    case 'analytics':
      return (
        <>
          <PanelHeader
            title="Analytics Pengunjung"
            description="Statistik kunjungan dasar: halaman populer, sumber trafik, dan periode (integrasi Google Analytics / Matomo nanti)."
            actions={
              <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
                <option>7 hari terakhir</option>
                <option>30 hari</option>
                <option>12 bulan</option>
              </select>
            }
          />
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
              <p className="text-sm font-semibold text-slate-900">Kunjungan Harian</p>
              <div className="mt-6 flex h-40 items-end justify-between gap-2">
                {[40, 55, 35, 70, 45, 80, 60].map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div className="w-full max-w-[2.5rem] rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400" style={{ height: `${h}%` }} />
                    <span className="text-[10px] text-slate-400">H{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">Total kunjungan</p>
                <p className="text-2xl font-bold text-slate-900">12.480</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">Halaman teratas</p>
                <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm text-slate-700">
                  <li>Beranda</li>
                  <li>Berita</li>
                  <li>Dokumen</li>
                </ol>
              </div>
            </div>
          </div>
        </>
      );

    case 'menu-header':
    case 'menu-footer':
      return (
        <>
          <PanelHeader
            title={activeId === 'menu-header' ? 'Menu Header' : 'Menu Footer / Link Cepat'}
            description={
              activeId === 'menu-header'
                ? 'Atur item menu utama (dropdown, urutan, tautan internal #/ atau eksternal).'
                : 'Link cepat di footer: kontak, sosial, kebijakan, dan PPID.'
            }
            actions={
              <button type="button" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                + Item Menu
              </button>
            }
          />
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Label</th>
                  <th className="px-4 py-3">URL</th>
                  <th className="px-4 py-3">Urutan</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ['Profil', '#/profil/struktur-organisasi', '1'],
                  ['Unit Kerja', '#/unit-kerja', '2'],
                  ['Dokumen', '#/dokumen', '3'],
                ].map(([label, url, urut]) => (
                  <tr key={label}>
                    <td className="px-4 py-3 font-medium">{label}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{url}</td>
                    <td className="px-4 py-3">{urut}</td>
                    <td className="px-4 py-3 text-right">
                      <button type="button" className="font-semibold text-emerald-700 hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );

    case 'banner-slider':
      return (
        <>
          <PanelHeader
            title="Hero & Carousel"
            description="Kelola gambar hero, carousel beranda, teks overlay, dan tombol CTA (Call to Action)."
            actions={
              <button type="button" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                + Slide
              </button>
            }
          />
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-slate-200 to-slate-300" />
                <div className="md:col-span-2 space-y-3">
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Judul slide"
                    defaultValue={i === 1 ? 'Beyond Clean & Green' : 'Program Kota Hijau'}
                  />
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    placeholder="URL gambar"
                  />
                  <div className="flex flex-wrap gap-3">
                    <input type="text" className="flex-1 min-w-[140px] rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Teks CTA" defaultValue="Selengkapnya" />
                    <input type="text" className="flex-1 min-w-[140px] rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Link CTA" defaultValue="#/berita" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );

    case 'settings-brand':
      return (
        <>
          <PanelHeader
            title="Identitas & Branding"
            description="Nama instansi, logo, favicon, dan elemen brand tanpa perlu edit kode."
            actions={
              <button type="button" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                Simpan
              </button>
            }
          />
          <div className="grid max-w-3xl gap-4">
            <label className="block text-sm font-medium text-slate-700">
              Nama instansi
              <input type="text" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" defaultValue="Dinas Lingkungan Hidup Kota Jambi" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Logo (upload)
                <div className="mt-1.5 flex h-24 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-xs text-slate-500 hover:border-emerald-400">
                  Klik atau seret file
                </div>
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Favicon
                <div className="mt-1.5 flex h-24 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-xs text-slate-500 hover:border-emerald-400">
                  .ico / .png
                </div>
              </label>
            </div>
            <label className="block text-sm font-medium text-slate-700">
              Tagline singkat
              <input type="text" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" defaultValue="Beyond Clean & Green" />
            </label>
          </div>
        </>
      );

    case 'settings-contact':
      return (
        <>
          <PanelHeader
            title="Kontak & Sosial Media"
            description="Alamat, email, telepon, dan tautan sosial untuk footer dan halaman kontak."
            actions={
              <button type="button" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                Simpan
              </button>
            }
          />
          <div className="grid max-w-3xl gap-4">
            <label className="block text-sm font-medium text-slate-700">
              Alamat
              <textarea rows={2} className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" defaultValue="Jl. Kolonel Abunjani, Kota Jambi" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Email
                <input type="email" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" defaultValue="info@dlh.jambikota.go.id" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Telepon
                <input type="text" className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" defaultValue="(0741) 123456" />
              </label>
            </div>
            <p className="text-sm font-semibold text-slate-900">Sosial media</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {['Facebook', 'Instagram', 'YouTube', 'X (Twitter)'].map((s) => (
                <input key={s} type="url" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder={`URL ${s}`} />
              ))}
            </div>
          </div>
        </>
      );

    case 'faq-daftar':
      return (
        <>
          <PanelHeader
            title="Daftar FAQ"
            description="Pertanyaan yang sering diajukan masyarakat beserta jawaban singkat dan terstruktur."
            actions={
              <button type="button" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                + FAQ
              </button>
            }
          />
          <div className="space-y-3">
            {[
              ['Bagaimana cara mengurus izin lingkungan?', 'Layanan Publik'],
              ['Jam operasional kantor DLH?', 'Informasi Umum'],
            ].map(([q, cat]) => (
              <div key={q} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-medium text-slate-900">{q}</p>
                  <Badge tone="slate">{cat}</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-600">Jawaban: silakan lengkapi di editor konten...</p>
                <div className="mt-3 flex gap-2 text-sm">
                  <button type="button" className="font-semibold text-emerald-700 hover:underline">
                    Edit
                  </button>
                  <button type="button" className="text-slate-500 hover:text-slate-700">
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      );

    case 'faq-kategori':
      return (
        <>
          <PanelHeader
            title="Kategori FAQ"
            description="Kelompokkan FAQ agar mudah dicari: layanan, perizinan, sampah, dll."
            actions={
              <button type="button" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                + Kategori
              </button>
            }
          />
          <div className="flex flex-wrap gap-2">
            {['Layanan Publik', 'Perizinan', 'Sampah & B3', 'Pengaduan', 'Informasi Umum'].map((c) => (
              <span key={c} className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-900">
                {c}
              </span>
            ))}
          </div>
        </>
      );

    case 'pengguna-admin':
      return (
        <>
          <PanelHeader
            title="Pengguna Admin"
            description="Kelola akun administrator, peran (role), dan hak akses modul."
            actions={
              <button type="button" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                + Admin
              </button>
            }
          />
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Peran</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-3 font-medium">M. Said</td>
                  <td className="px-4 py-3">admin@dlh.jambikota.go.id</td>
                  <td className="px-4 py-3">
                    <Badge tone="violet">Super Admin</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" className="font-semibold text-emerald-700 hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      );

    default:
      return (
        <PanelHeader title="Modul" description="Pilih menu di sidebar." />
      );
  }
}

export default function AdminDashboardPage() {
  const [activeId, setActiveId] = useState('dashboard');
  const [activeLabel, setActiveLabel] = useState('Dashboard');
  const [openGroups, setOpenGroups] = useState(() =>
    Object.fromEntries(menuGroups.map((g, i) => [g.title, i < 2]))
  );
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const now = useMemo(
    () =>
      new Date().toLocaleString('id-ID', {
        dateStyle: 'full',
        timeStyle: 'short',
      }),
    []
  );

  const toggleGroup = (groupTitle) => {
    setOpenGroups((prev) => ({ ...prev, [groupTitle]: !prev[groupTitle] }));
  };

  const selectMenu = (id, label) => {
    setActiveId(id);
    setActiveLabel(label);
    setProfileOpen(false);
  };

  useEffect(() => {
    if (!profileOpen) return;
    const close = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    window.addEventListener('mousedown', close);
    return () => window.removeEventListener('mousedown', close);
  }, [profileOpen]);

  return (
    <section className="min-h-screen bg-slate-100 text-slate-800">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-900 text-slate-100 lg:block">
          <div className="border-b border-white/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo DLH Kota Jambi" className="h-10 w-auto object-contain" />
              <div>
                <p className="text-sm font-semibold">Admin CMS DLH</p>
                <p className="text-xs text-slate-300">Kota Jambi</p>
              </div>
            </div>
          </div>

          <nav className="h-[calc(100vh-88px)] overflow-y-auto px-3 py-4">
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Modul</p>
            <div className="space-y-2">
              {menuGroups.map((group) => (
                <div key={group.title} className="rounded-2xl border border-white/10 bg-white/[0.03]">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.title)}
                    className="flex w-full items-center justify-between px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-300"
                  >
                    <span>{group.title}</span>
                    <svg
                      className={`h-4 w-4 shrink-0 transition-transform ${openGroups[group.title] ? 'rotate-180' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openGroups[group.title] && (
                    <ul className="space-y-1 px-2 pb-2">
                      {group.items.map((item) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => selectMenu(item.id, item.label)}
                            className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                              activeId === item.id
                                ? 'bg-emerald-500/20 text-emerald-200'
                                : 'text-slate-200 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Admin Dashboard</p>
                <h1 className="text-lg font-bold text-slate-900 sm:text-xl">{activeLabel}</h1>
              </div>

              <div ref={profileRef} className="relative flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-slate-900">M. Said (Admin)</p>
                  <p className="text-xs text-slate-500">{now}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-left transition hover:bg-slate-50"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                    MS
                  </div>
                  <svg
                    className={`h-4 w-4 text-slate-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-14 z-30 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                    <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Profil Admin</p>
                    <button
                      type="button"
                      onClick={() => setProfileOpen(false)}
                      className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Pengaturan Profil
                    </button>
                    <a
                      href="#/login"
                      className="mt-1 block rounded-xl px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
            {activeId === 'dashboard' && (
              <div className="mb-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 p-5 text-white shadow-lg sm:p-6">
                <h2 className="text-lg font-bold sm:text-xl">Pusat Pengelolaan Website Profil Pemerintah</h2>
                <p className="mt-2 max-w-3xl text-sm text-white/90 sm:text-base">
                  Modul lengkap: konten (berita, pengumuman, agenda, halaman statis, draft/jadwal), media & dokumen,
                  struktur organisasi, statistik, menu navigasi, banner/slider, pengaturan instansi, dan FAQ.
                </p>
              </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">{renderPanel(activeId)}</div>
          </main>
        </div>
      </div>
    </section>
  );
}
