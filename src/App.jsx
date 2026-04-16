import Navbar from './components/Layout/Navbar.jsx';
import Hero from './components/sections/Hero.jsx';
import LatestNews from './components/sections/LatestNews.jsx';
import Programs from './components/sections/Programs.jsx';
import Gallery from './components/sections/Gallery.jsx';
import Footer from './components/Layout/Footer.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
import InnerPageTemplate from './components/pages/InnerPageTemplate.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import { useEffect, useState } from 'react';

function getRouteFromHash() {
  const hash = window.location.hash || '#/';
  const normalized = hash.startsWith('#/') ? hash : '#/';
  return normalized.replace('#', '');
}

function App() {
  const [route, setRoute] = useState(getRouteFromHash);

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const isStrukturPage = route === '/profil/struktur-organisasi';
  const isTupoksiPage = route === '/profil/tupoksi-dinas';
  const isHome = route === '/';
  const isLoginPage = route === '/login';

  const templatePages = {
    '/unit-kerja': {
      title: 'Unit Kerja',
      subtitle: 'Informasi unit kerja pada Dinas Lingkungan Hidup Kota Jambi.',
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Daftar Unit Kerja</h2>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            Halaman ini merupakan template konten dinamis. Isi dapat diganti sesuai kebutuhan unit kerja.
          </p>
        </div>
      ),
    },
    '/unit-kerja/sekretariat': {
      title: 'Unit Kerja - Sekretariat',
      subtitle: 'Informasi detail Sekretariat DLH Kota Jambi.',
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Sekretariat</h2>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            Sekretariat bertugas mengoordinasikan perencanaan program, administrasi umum, kepegawaian, dan keuangan.
          </p>
        </div>
      ),
    },
    '/dokumen': {
      title: 'Dokumen',
      subtitle: 'Publikasi dokumen resmi Dinas Lingkungan Hidup Kota Jambi.',
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Dokumen Publik</h2>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            Daftar dokumen seperti laporan kinerja, regulasi, SOP, dan dokumen pendukung lainnya.
          </p>
        </div>
      ),
    },
    '/aplikasi': {
      title: 'Aplikasi',
      subtitle: 'Daftar aplikasi layanan digital DLH Kota Jambi.',
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Aplikasi Layanan</h2>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            Halaman ini dapat menampilkan aplikasi internal dan publik dengan tautan akses serta deskripsi singkat.
          </p>
        </div>
      ),
    },
    '/galeri': {
      title: 'Galeri',
      subtitle: 'Dokumentasi kegiatan Dinas Lingkungan Hidup Kota Jambi.',
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Galeri Kegiatan</h2>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            Silakan pilih kategori Foto atau Video untuk melihat dokumentasi secara spesifik.
          </p>
        </div>
      ),
    },
    '/galeri/foto': {
      title: 'Galeri Foto',
      subtitle: 'Kumpulan foto kegiatan dan program DLH Kota Jambi.',
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Dokumentasi Foto</h2>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            Konten ini menggunakan template yang sama, hanya isi galeri foto yang berubah sesuai kategori.
          </p>
        </div>
      ),
    },
    '/galeri/video': {
      title: 'Galeri Video',
      subtitle: 'Kumpulan video kegiatan dan edukasi lingkungan.',
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Dokumentasi Video</h2>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            Konten video dapat ditampilkan dalam bentuk daftar embed atau kartu video.
          </p>
        </div>
      ),
    },
  };

  const currentTemplate = templatePages[route];

  return (
    <>
      {isLoginPage ? (
        <LoginPage />
      ) : (
        <>
          <Navbar />
          <main>
            {isHome ? (
              <>
                <Hero />
                <LatestNews />
                <Programs />
                <Gallery />
              </>
            ) : isStrukturPage || isTupoksiPage ? (
              <InnerPageTemplate
                title={isStrukturPage ? 'Struktur Organisasi' : 'Tugas Pokok dan Fungsi'}
                subtitle="Halaman profil ini menggunakan template seragam dengan konten yang dapat berubah sesuai menu."
              >
                <ProfilePage type={isStrukturPage ? 'struktur' : 'tupoksi'} />
              </InnerPageTemplate>
            ) : currentTemplate ? (
              <InnerPageTemplate title={currentTemplate.title} subtitle={currentTemplate.subtitle}>
                {currentTemplate.content}
              </InnerPageTemplate>
            ) : (
              <InnerPageTemplate
                title="Halaman Tidak Ditemukan"
                subtitle="Rute yang kamu akses belum tersedia. Silakan kembali ke beranda."
              >
                <a
                  href="#/"
                  className="inline-flex rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Kembali ke Beranda
                </a>
              </InnerPageTemplate>
            )}
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
