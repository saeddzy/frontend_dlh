export default function InnerPageTemplate({ title, subtitle, children, heroImage }) {
  const heroSrc =
    heroImage ||
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80';
  return (
    <section className="pb-16">
      <div className="relative h-[340px] pt-24 sm:h-[380px] sm:pt-28">
        <div className="absolute inset-0 z-0">
          <img
            src={heroSrc}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-12 text-white sm:px-6 sm:pt-14 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">Dinas Lingkungan Hidup</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/90 sm:text-base">{subtitle}</p>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-100/70 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(34,139,84,0.45)] sm:p-8">
          {children}
        </div>
      </div>
    </section>
  );
}
