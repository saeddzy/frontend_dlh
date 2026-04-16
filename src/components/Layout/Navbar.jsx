import { useEffect, useRef, useState } from 'react';

const menus = [
  {
    href: '#/profil/struktur-organisasi',
    label: 'Profil',
    children: [
      { href: '#/profil/struktur-organisasi', label: 'Struktur Organisasi' },
      { href: '#/profil/tupoksi-dinas', label: 'Tupoksi Dinas' },
    ],
  },
  {
    href: '#/unit-kerja',
    label: 'Unit Kerja',
    children: [{ href: '#/unit-kerja/sekretariat', label: 'Sekretariat' }],
  },
  { href: '#/dokumen', label: 'Dokumen' },
  { href: '#/aplikasi', label: 'Aplikasi' },
  {
    href: '#/galeri',
    label: 'Galeri',
    children: [
      { href: '#/galeri/foto', label: 'Foto' },
      { href: '#/galeri/video', label: 'Video' },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState('');
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const desktopMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setOpenDesktopDropdown('');
      }
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!desktopMenuRef.current) return;
      if (!desktopMenuRef.current.contains(event.target)) {
        setOpenDesktopDropdown('');
      }
    };

    if (openDesktopDropdown) {
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [openDesktopDropdown]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpenDesktopDropdown('');
      }
    };

    if (openDesktopDropdown) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [openDesktopDropdown]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (open) {
      const first = menus.find((m) => m.children);
      if (first) setOpenMobileDropdown(first.label);
    } else {
      setOpenMobileDropdown('');
    }
  }, [open]);

  const closeMenu = () => setOpen(false);

  const toggleSection = (label) => {
    setOpenMobileDropdown((prev) => (prev === label ? '' : label));
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[padding,background-color] duration-300 ${
        scrolled ? 'py-2 sm:py-3' : 'pt-3 sm:pt-3'
      }`}
    >
      <div className="px-3 sm:px-5">
        <nav
          className={`mx-auto max-w-7xl rounded-[2rem] px-4 py-3 shadow-2xl transition-colors duration-300 sm:rounded-[2.25rem] sm:px-6 lg:px-8 ${
            scrolled
              ? 'bg-white/80 text-gray-800 shadow-lg backdrop-blur-xl'
              : 'bg-black/45 text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl'
          }`}
        >
          <div className="flex items-center justify-between">
            <a href="#/" className="flex items-center gap-3">
              <span className="flex h-12 shrink-0 items-center">
                <img src="/logo.png" alt="Logo DLH Kota Jambi" className="h-11 w-auto object-contain drop-shadow-sm" />
              </span>
              <span className="text-left leading-tight">
                <span
                  className={`block text-sm font-semibold tracking-wide ${
                    scrolled ? 'text-gray-900' : 'text-white'
                  }`}
                >
                  Dinas Lingkungan Hidup
                </span>
                <span
                  className={`block text-xs font-medium ${
                    scrolled ? 'text-gray-600' : 'text-white/90'
                  }`}
                >
                  Kota Jambi
                </span>
              </span>
            </a>
            <ul ref={desktopMenuRef} className="hidden items-center gap-4 text-sm font-medium lg:flex xl:gap-5">
              {menus.map((menu) => (
                <li key={menu.label} className="relative">
                  {menu.children ? (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDesktopDropdown((prev) => (prev === menu.label ? '' : menu.label))
                      }
                      className={
                        scrolled
                          ? 'inline-flex items-center rounded-md px-2 py-1 text-gray-700 transition hover:bg-dlh-green/10 hover:text-dlh-green'
                          : 'inline-flex items-center rounded-md px-2 py-1 text-white/95 transition hover:bg-white/15 hover:text-white'
                      }
                      aria-expanded={openDesktopDropdown === menu.label}
                    >
                      {menu.label}
                      <svg
                        className={`ml-1 h-4 w-4 transition-transform ${
                          openDesktopDropdown === menu.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <a
                      href={menu.href}
                      className={
                        scrolled
                          ? 'inline-flex items-center rounded-md px-2 py-1 text-gray-700 transition hover:bg-dlh-green/10 hover:text-dlh-green'
                          : 'inline-flex items-center rounded-md px-2 py-1 text-white/95 transition hover:bg-white/15 hover:text-white'
                      }
                    >
                      {menu.label}
                    </a>
                  )}
                  {menu.children && (
                    <ul
                      className={`absolute left-0 top-full mt-2 min-w-[210px] rounded-xl p-2 shadow-xl transition duration-150 ${
                        openDesktopDropdown === menu.label
                          ? 'pointer-events-auto translate-y-0 opacity-100'
                          : 'pointer-events-none -translate-y-1 opacity-0'
                      } ${
                        scrolled ? 'bg-white/95' : 'bg-black/70 backdrop-blur-xl'
                      }`}
                    >
                      {menu.children.map((child) => (
                        <li key={child.label}>
                          <a
                            href={child.href}
                            onClick={() => setOpenDesktopDropdown('')}
                            className={
                              scrolled
                                ? 'block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-dlh-green/10 hover:text-dlh-green'
                                : 'block rounded-lg px-3 py-2 text-sm text-white/95 transition hover:bg-white/15'
                            }
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className={
                scrolled
                  ? 'rounded-lg bg-white/60 px-3 py-2 text-gray-800 transition-all duration-300 hover:bg-white active:scale-95 lg:hidden'
                  : 'rounded-lg bg-black/30 px-3 py-2 text-white transition-all duration-300 hover:bg-white/15 active:scale-95 lg:hidden'
              }
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={open}
            >
              <span className="relative block h-5 w-6" aria-hidden>
                <span
                  className={`absolute left-0 top-[3px] block h-0.5 w-6 origin-center rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                    open ? 'top-[9px] translate-y-0 rotate-45' : 'translate-y-0 rotate-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[9px] block h-0.5 w-6 origin-center rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                    open ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[15px] block h-0.5 w-6 origin-center rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                    open ? 'top-[9px] -rotate-45' : 'translate-y-0 rotate-0'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col bg-black/60 backdrop-blur-2xl transition-opacity duration-200 lg:hidden ${
          open ? 'pointer-events-auto visible opacity-100' : 'invisible pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div
          className={`flex min-h-0 flex-1 flex-col text-white transition-transform duration-200 ${
            open ? 'translate-y-0' : 'translate-y-2'
          }`}
        >
          <div className="shrink-0 px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <span className="flex h-11 shrink-0 items-center">
                  <img src="/logo.png" alt="Logo DLH Kota Jambi" className="h-10 w-auto object-contain drop-shadow-sm" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-emerald-200/90">
                    beyond clean &amp; green
                  </p>
                  <p className="text-sm font-semibold leading-snug">Dinas Lingkungan Hidup</p>
                  <p className="text-xs text-white/75">Kota Jambi</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeMenu}
                className="group shrink-0 rounded-full p-2 text-white/90 transition-all duration-300 hover:rotate-90 hover:bg-white/15 active:scale-90"
                aria-label="Tutup menu"
              >
                <svg
                  className="h-7 w-7 transition-transform duration-300 ease-out group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-4 h-px w-full bg-white/10" />
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <ul className="flex flex-col gap-0.5 py-1">
              {menus.map((menu) => {
                const expanded = menu.children && openMobileDropdown === menu.label;
                return (
                  <li key={menu.label}>
                    {menu.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleSection(menu.label)}
                          className="flex w-full items-center justify-between gap-3 py-3.5 text-left text-base font-medium text-white"
                        >
                          <span>{menu.label}</span>
                          <svg
                            className={`h-5 w-5 shrink-0 text-white/80 transition-transform ${
                              expanded ? '-rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {expanded && (
                          <ul className="relative mb-3 ml-1 space-y-0.5 border-l border-white/20 pl-4">
                            {menu.children.map((child) => (
                              <li key={child.label}>
                                <a
                                  href={child.href}
                                  onClick={closeMenu}
                                  className="block py-2.5 text-sm font-medium text-white/90 transition hover:text-white"
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <a
                        href={menu.href}
                        onClick={closeMenu}
                        className="block py-3.5 text-base font-medium text-white"
                      >
                        {menu.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
