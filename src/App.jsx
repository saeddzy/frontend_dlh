import Navbar from './components/Layout/Navbar.jsx';
import Hero from './components/sections/Hero.jsx';
import LatestNews from './components/sections/LatestNews.jsx';
import Programs from './components/sections/Programs.jsx';
import FAQ from './components/sections/FAQ.jsx';
import Gallery from './components/sections/Gallery.jsx';
import Footer from './components/Layout/Footer.jsx';
import ScrollToTop from './components/Layout/ScrollToTop.jsx';
import PageNavigationLoader from './components/Layout/PageNavigationLoader.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
import InnerPageTemplate from './components/pages/InnerPageTemplate.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import AdminDashboardPage from './components/pages/AdminDashboardPage.jsx';
import AllNewsPage from './components/pages/AllNewsPage.jsx';
import AllGalleryPage from './components/pages/AllGalleryPage.jsx';
import AllProgramsPage from './components/pages/AllProgramsPage.jsx';
import ProgramDetailPage from './components/pages/ProgramDetailPage.jsx';
import NewsDetailPage from './components/pages/NewsDetailPage.jsx';
import { getProgramById } from './data/program.js';
import { useEffect, useState } from 'react';

/** Durasi minimum overlay navigasi (ms) — dibuat cepat agar terasa responsif. */
const NAV_LOADING_MIN_MS = 520;
const NAV_LOADING_EXIT_MS = 180;

function getRouteFromHash() {
  const hash = window.location.hash || '#/';
  const normalized = hash.startsWith('#/') ? hash : '#/';
  return normalized.replace('#', '');
}

function App() {
  const [route, setRoute] = useState(getRouteFromHash);
  const [navLoading, setNavLoading] = useState(false);
  const [navLoaderMounted, setNavLoaderMounted] = useState(false);
  const [navLoaderClosing, setNavLoaderClosing] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      setNavLoaderMounted(true);
      setNavLoaderClosing(false);
      setNavLoading(true);
      setRoute(getRouteFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  /** Sembunyikan overlay setelah konten berganti + durasi minimum agar Lottie terbaca */
  useEffect(() => {
    if (!navLoading) return undefined;
    const t = window.setTimeout(() => setNavLoading(false), NAV_LOADING_MIN_MS);
    return () => window.clearTimeout(t);
  }, [route, navLoading]);

  /** Unmount loader setelah animasi exit selesai */
  useEffect(() => {
    if (navLoading) {
      setNavLoaderMounted(true);
      setNavLoaderClosing(false);
      return undefined;
    }
    if (!navLoaderMounted) return undefined;
    setNavLoaderClosing(true);
    const t = window.setTimeout(() => {
      setNavLoaderMounted(false);
      setNavLoaderClosing(false);
    }, NAV_LOADING_EXIT_MS);
    return () => window.clearTimeout(t);
  }, [navLoading, navLoaderMounted]);

  const isStrukturPage = route === '/profil/struktur-organisasi';
  const isTupoksiPage = route === '/profil/tupoksi-dinas';
  const isHome = route === '/';
  const isLoginPage = route === '/login';
  const isAdminPage = route === '/admin';
  const isAllNewsPage = route === '/berita';
  const isAllGalleryPage = route === '/galeri/semua';
  const isProgramsListPage = route === '/program';
  const programDetailId =
    route.startsWith('/program/') && route.length > '/program/'.length
      ? decodeURIComponent(route.slice('/program/'.length))
      : null;
  const programDetail = programDetailId ? getProgramById(programDetailId) : null;
  const beritaDetailId =
    route.startsWith('/berita/') && route.length > '/berita/'.length
      ? decodeURIComponent(route.slice('/berita/'.length))
      : null;

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
      {navLoaderMounted && <PageNavigationLoader isClosing={navLoaderClosing} />}
      {isLoginPage ? (
        <LoginPage />
      ) : isAdminPage ? (
        <AdminDashboardPage />
      ) : (
        <>
          <Navbar />
          <main>
            {isHome ? (
              <>
                <Hero />
                <LatestNews />
                <Programs />
                <FAQ />
                <Gallery />
              </>
            ) : beritaDetailId ? (
              <NewsDetailPage id={beritaDetailId} />
            ) : isAllNewsPage ? (
              <InnerPageTemplate
                title="Semua Berita"
                subtitle="Arsip berita dan informasi Dinas Lingkungan Hidup Kota Jambi."
              >
                <AllNewsPage />
              </InnerPageTemplate>
            ) : isAllGalleryPage ? (
              <InnerPageTemplate
                title="Semua Galeri"
                subtitle="Dokumentasi foto dan video kegiatan Dinas Lingkungan Hidup Kota Jambi."
              >
                <AllGalleryPage />
              </InnerPageTemplate>
            ) : programDetailId ? (
              <InnerPageTemplate
                title={programDetail?.title ?? 'Program'}
                subtitle={
                  programDetail?.summary ??
                  'Program unggulan Dinas Lingkungan Hidup Kota Jambi.'
                }
                heroImage={programDetail?.coverImage}
              >
                <ProgramDetailPage id={programDetailId} />
              </InnerPageTemplate>
            ) : isProgramsListPage ? (
              <InnerPageTemplate
                title="Program Unggulan"
                subtitle="Inisiatif strategis untuk mendukung pembangunan berkelanjutan dan kesejahteraan masyarakat Kota Jambi."
              >
                <AllProgramsPage />
              </InnerPageTemplate>
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
          <ScrollToTop />
        </>
      )}
    </>
  );
}

export default App;
