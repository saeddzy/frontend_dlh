const programs = [
  {
    icon: (
      <span className="text-2xl" aria-hidden>
        🌿
      </span>
    ),
    title: 'Taman Kehati Kota Jambi',
    desc: 'Pelestarian keanekaragaman hayati dan edukasi lingkungan melalui kawasan konservasi serta kegiatan masyarakat.',
  },
  {
    icon: (
      <span className="text-2xl" aria-hidden>
        💧
      </span>
    ),
    title: 'Sungai & Kawasan Hijau',
    desc: 'Program terpadu untuk menjaga kualitas perairan perkotaan, mengendalikan pencemaran, dan melibatkan masyarakat Kota Jambi.',
  },
  {
    icon: (
      <span className="text-2xl" aria-hidden>
        ♻
      </span>
    ),
    title: 'Sampah Kita',
    desc: 'Gerakan pengelolaan sampah dari hulu ke hilir: pilah, kurangi, dan manfaatkan untuk lingkungan yang lebih bersih.',
  },
];

export default function Programs() {
  return (
    <section id="layanan" className="scroll-mt-20 bg-dlh-muted py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Program Unggulan DLH Kota Jambi</h2>
          <p className="mt-3 text-sm text-gray-600 sm:text-base">
            Inisiatif strategis untuk mendukung pembangunan berkelanjutan dan kesejahteraan masyarakat Kota Jambi.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {programs.map((p, idx) => (
            <article
              key={p.title}
              className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-3xl border border-emerald-100/70 bg-gradient-to-b from-white to-emerald-50/35 p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-xl"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-200/40 blur-2xl transition duration-300 group-hover:bg-emerald-300/60" />
              <div className="pointer-events-none absolute -bottom-10 -left-8 h-24 w-24 rounded-full bg-emerald-100/40 blur-2xl transition duration-300 group-hover:bg-emerald-200/50" />

              <div className="mb-3 inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                Program {idx + 1}
              </div>

              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl ring-1 ring-emerald-100 transition duration-300 group-hover:scale-110 group-hover:bg-emerald-100 group-hover:ring-emerald-200">
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-emerald-700">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{p.desc}</p>

              <a
                href="#"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100/80 px-4 py-2 text-sm font-semibold text-dlh-green transition-all duration-300 hover:bg-dlh-green hover:text-white"
              >
                Selengkapnya
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                  →
                </span>
              </a>

              <div className="mt-5 h-1 w-full rounded-full bg-gradient-to-r from-emerald-400 to-dlh-green/90" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
