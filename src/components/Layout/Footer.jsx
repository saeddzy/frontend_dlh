const footerCols = [
  {
    title: 'Profil',
    links: ['Visi & Misi', 'Struktur Organisasi', 'Pejabat', 'Sejarah'],
  },
  {
    title: 'Informasi Publik',
    links: ['Berita', 'Pengumuman', 'Agenda', 'Download'],
  },
  {
    title: 'Layanan',
    links: ['Perizinan', 'Pengaduan', 'Konsultasi', 'E-PPID'],
  },
];

function IconMap() {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="ppid" className="bg-dlh-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 border-b border-white/15 pb-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-14 shrink-0 items-center">
              <img src="/logo.png" alt="Logo DLH Kota Jambi" className="h-12 w-auto object-contain drop-shadow-sm" />
            </span>
            <div>
              <p className="font-bold leading-snug">Dinas Lingkungan Hidup</p>
              <p className="text-sm text-white/85">Kota Jambi</p>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="flex gap-3 text-sm">
              <IconMap />
              <div>
                <p className="font-semibold">Alamat</p>
                <p className="mt-1 text-white/85">
                 Paal Lima, Kota Baru, Jambi City, Jambi 36129
                </p>
              </div>
            </div>
            <div className="flex gap-3 text-sm">
              <IconMail />
              <div>
                <p className="font-semibold">Email</p>
                <a href="mailto:info@dlh.jambikota.go.id" className="mt-1 block text-white/85 hover:underline">
                  info@dlh.jambikota.go.id
                </a>
              </div>
            </div>
            <div className="flex gap-3 text-sm">
              <IconPhone />
              <div>
                <p className="font-semibold">Nomor Telepon</p>
                <p className="mt-1 text-white/85">(0741) 123456</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold">Sosial Media</p>
              <div className="mt-2 flex gap-3">
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 hover:bg-white/20"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 hover:bg-white/20"
                  aria-label="X"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 hover:bg-white/20"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {footerCols.map((col) => (
            <div
              key={col.title}
              id={
                col.title === 'Profil'
                  ? 'profil'
                  : col.title === 'Layanan'
                    ? undefined
                    : col.title === 'Informasi Publik'
                      ? undefined
                      : undefined
              }
              className="scroll-mt-24"
            >
              <h4 className="text-sm font-bold text-white">{col.title}</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-white hover:underline">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div id="ppid" className="scroll-mt-24 lg:col-span-2">
            <h4 className="text-sm font-bold text-white">Lokasi Kami</h4>
            <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-white/20">
              <iframe
                title="Lokasi Dinas Lingkungan Hidup Kota Jambi"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15952.806875901106!2d103.6069464!3d-1.6310873!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e25862733aa8b23%3A0xdb29dabcd18dd52d!2sDinas%20Lingkungan%20Hidup%20Kota%20Jambi!5e0!3m2!1sen!2sid!4v1717553457873!5m2!1sen!2sid"
                className="h-48 w-full border-0 lg:h-56"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/20 bg-black/20 py-4 text-center text-xs text-white/75">
        Copyright © 2024 Dinas Lingkungan Hidup Kota Jambi
      </div>
    </footer>
  );
}
