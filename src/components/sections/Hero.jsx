import { useEffect, useRef, useState } from 'react';

const HERO_BG =
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80';

const SLIDE_DURATION_MS = 5000;

const heroSlides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80',
    title: 'Forum Perangkat Daerah',
    description: 'Kolaborasi pembangunan berkelanjutan',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
    title: 'Sungai & Tata Ruang Hijau',
    description: 'Pemeliharaan kawasan bantaran dan ruang terbuka hijau Kota Jambi',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1400&q=80',
    title: 'Edukasi Lingkungan Sekolah',
    description: 'Gerakan sekolah hijau di lingkungan Kota Jambi',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    title: 'Monitoring Kualitas Udara',
    description: 'Pemantauan realtime pada titik strategis',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80',
    title: 'Penanaman Pohon Serentak',
    description: 'Dukungan mitigasi perubahan iklim daerah',
  },
];

const weatherRows = [
  { time: '15.00 WIB', cond: 'Hujan Ringan', temp: '23°', hum: '83%' },
  { time: '18.00 WIB', cond: 'Berawan', temp: '22°', hum: '90%' },
  { time: '21.00 WIB', cond: 'Hujan Badai', temp: '21°', hum: '92%' },
  { time: '23.00 WIB', cond: 'Cerah', temp: '20°', hum: '88%' },
];

function getWeatherType(cond) {
  const c = cond.toLowerCase();
  if (c.includes('badai')) return 'storm';
  if (c.includes('hujan')) return 'rain';
  if (c.includes('cerah')) return 'sun';
  return 'cloud';
}

function WeatherSymbol({ type, className = '' }) {
  if (type === 'sun') {
    return (
      <svg className={`weather-icon text-yellow-400 ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden>
        <g className="weather-sun-spin" transform="translate(32 32)">
          {Array.from({ length: 8 }, (_, i) => (
            <line
              key={i}
              x1="0"
              y1="-24"
              x2="0"
              y2="-30"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${i * 45})`}
            />
          ))}
        </g>
        <circle className="weather-sun-core" cx="32" cy="32" r="11" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'rain') {
    return (
      <svg className={`weather-icon ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden>
        <path
          className="weather-cloud-drift"
          d="M16 38c-6.627 0-12-5.373-12-12s5.373-12 12-12c1.214 0 2.387.18 3.492.515C22.338 8.173 28.577 4 36 4c9.941 0 18 8.059 18 18 0 .27-.006.54-.018.808C58.519 24.143 62 28.58 62 34c0 7.732-6.268 14-14 14H16z"
          fill="currentColor"
        />
        <line className="weather-rain-drop rain-1" x1="22" y1="46" x2="19" y2="55" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
        <line className="weather-rain-drop rain-2" x1="32" y1="46" x2="29" y2="55" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
        <line className="weather-rain-drop rain-3" x1="42" y1="46" x2="39" y2="55" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'storm') {
    return (
      <svg className={`weather-icon ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden>
        <path
          className="weather-cloud-drift"
          d="M16 38c-6.627 0-12-5.373-12-12s5.373-12 12-12c1.214 0 2.387.18 3.492.515C22.338 8.173 28.577 4 36 4c9.941 0 18 8.059 18 18 0 .27-.006.54-.018.808C58.519 24.143 62 28.58 62 34c0 7.732-6.268 14-14 14H16z"
          fill="currentColor"
        />
        <line className="weather-rain-drop rain-1" x1="20" y1="46" x2="17" y2="55" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
        <line className="weather-rain-drop rain-2" x1="42" y1="46" x2="39" y2="55" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
        <path
          className="weather-lightning-flash"
          d="M34 38l-6 10h5l-3 10 10-14h-5l4-6z"
          fill="#facc15"
        />
      </svg>
    );
  }

  return (
    <svg className={`weather-icon ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden>
      <path
        className="weather-cloud-drift cloud-back"
        d="M23 42c-5.523 0-10-4.477-10-10S17.477 22 23 22c.988 0 1.942.143 2.842.41C28.175 16.978 33.187 13 39 13c8.284 0 15 6.716 15 15 0 .207-.004.413-.012.618C57.708 29.854 60 33.06 60 37c0 5.523-4.477 10-10 10H23z"
        fill="currentColor"
      />
      <path
        className="weather-cloud-drift cloud-front"
        d="M13 45c-4.971 0-9-4.029-9-9s4.029-9 9-9c.885 0 1.737.127 2.542.365C17.633 23.313 22.154 20 27.4 20 34.911 20 41 26.089 41 33.6c0 .188-.004.374-.011.56C44.361 35.279 47 38.02 47 42c0 4.971-4.029 9-9 9H13z"
        fill="currentColor"
        fillOpacity=".88"
      />
    </svg>
  );
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [imageNudge, setImageNudge] = useState(false);
  const [nudgeDirection, setNudgeDirection] = useState(1);
  const [weatherOpen, setWeatherOpen] = useState(false);
  /** Ref sinkron dengan progress autoplay — hindari double advance (loncat slide) saat update state bersamaan */
  const progressRef = useRef(0);
  const nudgeTimerRef = useRef(null);

  const resetSlideTimer = () => {
    progressRef.current = 0;
    setProgress(0);
  };

  useEffect(() => {
    const tickMs = 100;
    const increment = (tickMs / SLIDE_DURATION_MS) * 100;
    const timer = setInterval(() => {
      progressRef.current += increment;
      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setCurrentSlide((old) => (old + 1) % heroSlides.length);
      }
      setProgress(progressRef.current);
    }, tickMs);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
    };
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    resetSlideTimer();
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    resetSlideTimer();
  };

  const handleImageClick = () => {
    const nextDirection = nudgeDirection === 1 ? -1 : 1;
    setNudgeDirection(nextDirection);
    setImageNudge(true);
    if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
    nudgeTimerRef.current = setTimeout(() => setImageNudge(false), 240);
  };

  const btnNav =
    'flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/40 bg-dlh-green text-white shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-900/30 active:translate-y-0 active:scale-95 focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';
  const activeWeatherType = getWeatherType(weatherRows[0].cond);

  return (
    <section className="relative min-h-[88vh] overflow-hidden pb-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/55 via-emerald-800/35 to-emerald-950/75" />

      <div
        className={`fixed right-0 top-1/2 z-[100] flex h-full max-h-[700px] -translate-y-1/2 transform items-center overflow-hidden py-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          weatherOpen ? 'translate-x-0' : 'translate-x-[300px] md:translate-x-[380px]'
        } pointer-events-none`}
      >
        <div className="pointer-events-auto flex w-[75px] flex-col items-center justify-center rounded-bl-2xl rounded-tl-2xl border border-white/25 bg-[#2f3135] p-2 text-white shadow-2xl">
          <h5 className="mb-1 text-3xl font-semibold leading-none">
            23<span className="ml-1 text-xl leading-none text-yellow-500">℃</span>
          </h5>
          <p className="mb-3 text-left text-xs">Hujan Ringan</p>
          <button
            type="button"
            onClick={() => setWeatherOpen((prev) => !prev)}
            className={`weather-toggle-btn inline-flex items-center rounded-full border border-white/25 bg-dlh-green p-2 text-white transition hover:bg-emerald-600 active:scale-95 ${
              weatherOpen ? 'is-open' : ''
            }`}
            aria-label={weatherOpen ? 'Tutup panel cuaca' : 'Buka panel cuaca'}
          >
            <svg className="weather-toggle-chevron h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="pointer-events-auto h-full w-[300px] rounded-bl-2xl rounded-tl-2xl border border-r-0 border-white/25 bg-[#2f3135] p-3 text-white shadow-2xl md:w-[380px]">
          <main className="flex h-full w-full flex-col gap-4">
            <section className="flex w-full flex-col rounded-xl border border-white/20 bg-[#5b5c5f] p-3">
              <header className="flex items-end justify-between gap-2 leading-none text-white">
                <h1 className="text-base font-bold">Hari Ini</h1>
                <p className="text-xs">Rabu, 15 April 2026</p>
              </header>
              <div className="mb-2 flex items-center justify-between">
                <div className="text-white">
                  <div className="mb-2 flex gap-2 text-6xl font-bold leading-none">
                    <h2>23</h2>
                    <span className="mt-4 text-2xl text-yellow-500">℃</span>
                  </div>
                  <p className="text-sm">Hujan Ringan</p>
                </div>
                <div className="text-white/90">
                  <WeatherSymbol type={activeWeatherType} className="h-24 w-24 text-white/90" />
                </div>
              </div>
              <footer className="flex items-center gap-2 text-white">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z" />
                  <circle cx="12" cy="11" r="2.2" />
                </svg>
                <p className="text-sm leading-none">Kota Jambi</p>
              </footer>
            </section>

            <section className="flex w-full flex-col gap-2 rounded-lg border border-white/20 bg-[#5b5c5f] p-3 md:flex-row">
              <div className="flex flex-1 items-center gap-2.5 text-white">
                <div className="rounded-full bg-white/5 p-1">☁</div>
                <article className="text-xs font-medium leading-none">
                  <h3 className="mb-1.5 text-white/85">Kelembapan</h3>
                  <p>83%</p>
                </article>
              </div>
              <hr className="h-px w-full border-none bg-white/15 md:h-full md:w-px" />
              <div className="flex flex-1 items-center gap-2.5 text-white">
                <div className="rounded-full bg-white/5 p-1">〰</div>
                <article className="text-xs font-medium leading-none">
                  <h3 className="mb-1.5 text-white/85">Kecepatan</h3>
                  <p>21.9Km/Jam</p>
                </article>
              </div>
              <hr className="h-px w-full border-none bg-white/15 md:h-full md:w-px" />
              <div className="flex flex-1 items-center gap-2.5 text-white">
                <div className="rounded-full bg-white/5 p-1">⇄</div>
                <article className="text-xs font-medium leading-none">
                  <h3 className="mb-1.5 text-white/85">Arah Angin</h3>
                  <p>Selatan</p>
                </article>
              </div>
            </section>

            <section className="flex flex-col gap-2 overflow-y-auto">
              {weatherRows.map((w) => (
                <div key={w.time} className="flex items-center gap-3 rounded-lg border border-white/20 bg-[#45474c] p-3">
                  <div className="flex rounded-lg bg-white/20 p-1">
                    <WeatherSymbol type={getWeatherType(w.cond)} className="h-[34px] w-[34px] text-white/90" />
                  </div>
                  <article className="flex flex-1 items-center justify-between gap-3 text-white">
                    <div className="text-sm leading-none">
                      <h3 className="mb-2 font-bold">{w.time}</h3>
                      <p>{w.cond}</p>
                    </div>
                    <div className="flex items-center gap-1 font-medium leading-none">
                      <h3>{w.temp}</h3>
                      <p className="-mt-1 text-3xl font-thin">/</p>
                      <h3>{w.hum}</h3>
                    </div>
                  </article>
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-4 pb-40 pt-36 text-center sm:px-6 lg:px-8 lg:pb-44 lg:pt-44">
        <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
          Beyond Clean &amp; Green
        </h1>
        <p className="mt-4 max-w-2xl text-base font-medium text-white/95 sm:text-lg">
          Melayani masyarakat Kota Jambi untuk lingkungan yang bersih, hijau, dan berkelanjutan.
        </p>
      </div>

      <div className="relative z-30 mx-auto -mt-28 max-w-7xl px-4 sm:-mt-32 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[900px]">
          <div className="overflow-hidden rounded-xl shadow-card ring-1 ring-black/5">
            <div className="relative aspect-video w-full">
              <img
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                onClick={handleImageClick}
                className={`absolute inset-0 h-full w-full cursor-pointer object-cover transition-transform duration-300 ease-out ${
                  imageNudge
                    ? nudgeDirection > 0
                      ? 'scale-[1.04] -translate-y-1 translate-x-1'
                      : 'scale-[1.04] -translate-y-1 -translate-x-1'
                    : 'scale-100 translate-x-0 translate-y-0'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/55" />

              <div className="absolute inset-x-0 top-0 flex gap-1.5 p-3 sm:p-4">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => {
                    setCurrentSlide(index);
                    resetSlideTimer();
                  }}
                  className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/25"
                  aria-label={`Slide ${index + 1}`}
                >
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-emerald-400 transition-all duration-100"
                    style={{
                      width:
                        index < currentSlide
                          ? '100%'
                          : index === currentSlide
                            ? `${progress}%`
                            : '0%',
                    }}
                  />
                </button>
              ))}
            </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <h3 className="line-clamp-2 text-base font-bold leading-snug text-white sm:text-lg">
                  {heroSlides[currentSlide].title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-white/90">
                  {heroSlides[currentSlide].description}
                </p>
                <p className="mt-2 text-xs font-semibold text-emerald-200">
                  {currentSlide + 1} dari {heroSlides.length}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <div className="flex gap-2">
              <button type="button" onClick={handlePrev} className={btnNav} aria-label="Sebelumnya">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button type="button" onClick={handleNext} className={btnNav} aria-label="Berikutnya">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pemisah gelombang modern: transisi hero → berita */}
      <div className="relative z-20 mt-10 w-full sm:mt-14" aria-hidden>
        <svg
          className="block h-[64px] w-full text-white sm:h-[80px] md:h-[96px]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heroWaveSoft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d1fae5" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#ecfdf5" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#d1fae5" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            fill="url(#heroWaveSoft)"
            d="M0,72 C180,108 360,36 540,54 C720,72 900,24 1080,48 C1200,64 1320,40 1440,52 L1440,120 L0,120 Z"
          />
          <path
            fill="#ffffff"
            d="M0,88 C240,52 480,112 720,68 C900,40 1080,96 1260,72 C1340,62 1400,78 1440,82 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
    </section>
  );
}
