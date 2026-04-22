import { useId } from 'react';

function Meta({ index, total }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
      <span className="font-mono text-[11px] font-medium tabular-nums text-slate-700/90">
        {String(index + 1).padStart(2, '0')}
        <span className="text-slate-400"> / {String(total).padStart(2, '0')}</span>
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900/70">Program</span>
    </div>
  );
}

/**
 * Efek air mengisi, tumbuhan, atau awan (loop) — tanpa gambar eksternal.
 * @param {'water' | 'plant' | 'cloud' | string} visual — disarankan `getProgramCardVisual()` dari `program.js`
 */
export default function ProgramCardArt({
  visual = 'plant',
  index,
  total,
  className = '',
  variant = 'banner',
}) {
  const uid = useId().replace(/:/g, '');
  const showMeta = variant === 'banner';
  const mode = visual === 'water' || visual === 'cloud' ? visual : 'plant';
  const svgInteractive =
    variant === 'watermark'
      ? 'program-card-art-svg-interactive h-full w-full motion-reduce:transition-none'
      : 'h-full w-full transition duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.04]';

  if (mode === 'water') {
    const g = `w-${uid}`;
    return (
      <div className={`relative h-full w-full overflow-hidden bg-sky-100 ${className}`}>
        <svg
          className={svgInteractive}
          viewBox="0 0 400 250"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <linearGradient id={`${g}-sky`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#f0f9ff" />
            </linearGradient>
            <linearGradient id={`${g}-deep`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id={`${g}-surface`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#bae6fd" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <rect width="400" height="250" fill={`url(#${g}-sky)`} />

          {/* Massa air: naik-turun seperti mengisi */}
          <g transform="translate(0,250)">
            <g className="program-art-water-fill">
              <rect x="0" y="-145" width="400" height="145" fill={`url(#${g}-deep)`} />
              <path
                d="M0 105 Q50 95 100 105 T200 105 T300 105 T400 105 L400 145 L0 145 Z"
                fill={`url(#${g}-surface)`}
                opacity="0.9"
              />
            </g>
          </g>

          {/* Gelembung */}
          <circle className="program-art-water-bubble program-art-water-bubble-a" cx="80" cy="180" r="4" fill="#e0f2fe" fillOpacity="0.55" />
          <circle className="program-art-water-bubble program-art-water-bubble-b" cx="220" cy="200" r="3" fill="#e0f2fe" fillOpacity="0.45" />
          <circle className="program-art-water-bubble program-art-water-bubble-c" cx="320" cy="175" r="3.5" fill="#f0f9ff" fillOpacity="0.5" />

          <path
            d="M0 118 Q100 108 200 118 T400 112"
            fill="none"
            stroke="#7dd3fc"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            className="program-art-water-shimmer"
          />
        </svg>
        {showMeta ? <Meta index={index} total={total} /> : null}
      </div>
    );
  }

  if (mode === 'cloud') {
    const g = `c-${uid}`;
    return (
      <div className={`relative h-full w-full overflow-hidden bg-sky-50 ${className}`}>
        <svg
          className={svgInteractive}
          viewBox="0 0 400 250"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <linearGradient id={`${g}-sky`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#f0f9ff" />
            </linearGradient>
            <linearGradient id={`${g}-cloud`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.82" />
            </linearGradient>
          </defs>
          <rect width="400" height="250" fill={`url(#${g}-sky)`} />

          {/* Awan jauh */}
          <g className="program-art-cloud-layer-back">
            <path
              d="M30 78c0-10 10-18 24-18 5-8 16-13 29-13 18 0 33 9 38 22 14 1 25 9 25 19 0 11-12 20-27 20H58c-16 0-28-9-28-20z"
              fill="#ffffff"
              fillOpacity="0.72"
            />
            <path
              d="M258 66c0-9 9-16 22-16 5-8 15-13 28-13 17 0 31 9 36 21 13 1 23 8 23 18 0 10-11 19-25 19h-57c-15 0-27-8-27-18z"
              fill="#eff6ff"
              fillOpacity="0.78"
            />
          </g>

          {/* Awan utama (lebih natural, bukan lonjong) */}
          <g className="program-art-cloud-layer-front">
            <path
              d="M110 160c0-16 15-28 35-28 8-12 24-20 42-20 27 0 49 15 55 36 21 1 38 14 38 30 0 17-19 31-42 31h-88c-22 0-40-13-40-29 0-7 3-14 10-20z"
              fill="#ffffff"
              fillOpacity="0.94"
            />
            <path
              d="M18 184c0-12 11-22 26-22 6-9 18-15 31-15 20 0 36 11 40 27 15 1 27 10 27 22 0 13-14 23-31 23H49c-17 0-31-10-31-22 0-5 2-9 6-13z"
              fill="#ffffff"
              fillOpacity="0.88"
            />
          </g>

          {/* Layer ekstra untuk parallax halus */}
          <g className="program-art-cloud-layer-mid">
            <path
              d="M228 112c0-8 8-15 19-15 4-7 13-11 22-11 14 0 26 8 30 19 11 1 19 7 19 15 0 9-9 16-21 16h-48c-12 0-21-7-21-16z"
              fill="#ffffff"
              fillOpacity="0.74"
            />
            <path
              d="M6 132c0-7 7-13 16-13 4-6 11-10 19-10 12 0 22 6 25 16 8 1 14 6 14 13 0 8-7 14-16 14H22c-9 0-16-6-16-14 0-2 0-4 1-6z"
              fill="#ffffff"
              fillOpacity="0.68"
            />
          </g>

          <path
            d="M0 208 Q120 196 240 208 T400 204"
            fill="none"
            stroke="#bae6fd"
            strokeOpacity="0.65"
            strokeWidth="1.4"
            className="program-art-cloud-haze"
          />

          {/* highlight tipis biar awan lebih kebaca */}
          <path
            d="M18 184 Q108 172 190 182 T382 178"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.55"
            strokeWidth="1"
            className="program-art-cloud-haze"
          />
        </svg>
        {showMeta ? <Meta index={index} total={total} /> : null}
      </div>
    );
  }

  /* plant */
  const g = `p-${uid}`;
  return (
    <div className={`relative h-full w-full overflow-hidden bg-emerald-50 ${className}`}>
      <svg
        className={svgInteractive}
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id={`${g}-bg`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ecfdf5" />
            <stop offset="100%" stopColor="#d1fae5" />
          </linearGradient>
          <linearGradient id={`${g}-leaf`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <rect width="400" height="250" fill={`url(#${g}-bg)`} />

        <g transform="translate(200, 248)">
          <g className="program-art-plant-stalk program-art-plant-a">
            <path d="M0 0 Q-8 -35 -25 -70" fill="none" stroke="#059669" strokeOpacity="0.45" strokeWidth="2.2" strokeLinecap="round" />
            <ellipse cx="-28" cy="-78" rx="22" ry="14" fill={`url(#${g}-leaf)`} transform="rotate(-35 -28 -78)" />
          </g>
          <g className="program-art-plant-stalk program-art-plant-b">
            <path d="M0 0 Q5 -45 15 -88" fill="none" stroke="#10b981" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="18" cy="-95" rx="20" ry="13" fill={`url(#${g}-leaf)`} transform="rotate(25 18 -95)" />
          </g>
          <g className="program-art-plant-stalk program-art-plant-c">
            <path d="M0 0 Q-3 -28 -12 -58" fill="none" stroke="#047857" strokeOpacity="0.4" strokeWidth="1.8" strokeLinecap="round" />
            <ellipse cx="-14" cy="-64" rx="16" ry="10" fill={`url(#${g}-leaf)`} transform="rotate(-20 -14 -64)" />
          </g>
          <g className="program-art-plant-stalk program-art-plant-d">
            <ellipse cx="35" cy="-40" rx="18" ry="11" fill="#6ee7b7" fillOpacity="0.55" transform="rotate(40 35 -40)" />
          </g>
        </g>

        <g className="program-art-plant-sparkle" opacity="0.55">
          <circle cx="120" cy="60" r="2" fill="#10b981" />
          <circle cx="280" cy="90" r="1.5" fill="#34d399" />
          <circle cx="340" cy="40" r="1.5" fill="#059669" />
        </g>
      </svg>
      {showMeta ? <Meta index={index} total={total} /> : null}
    </div>
  );
}
