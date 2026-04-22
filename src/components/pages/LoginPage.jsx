import { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-2xl lg:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-emerald-600/90 via-emerald-700/85 to-emerald-900/85 p-10 text-white lg:block">
          <p className="inline-flex rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
            Portal Internal
          </p>
          <h1 className="mt-6 text-3xl font-bold leading-tight">Selamat Datang di Layanan DLH Kota Jambi</h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/90">
            Masuk untuk mengakses dokumen internal, dashboard monitoring, dan layanan administrasi digital.
          </p>
          <div className="mt-10 space-y-3 text-sm text-white/90">
            <p>• Akses cepat dan aman</p>
            <p>• Dashboard terintegrasi</p>
            <p>• Manajemen data lingkungan</p>
          </div>
        </div>

        <div className="bg-white/95 p-6 sm:p-9">
          <div className="mb-6 flex items-center gap-3">
            <img src="/logo.png" alt="Logo DLH Kota Jambi" className="h-11 w-auto object-contain" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Dinas Lingkungan Hidup</p>
              <p className="text-xs text-gray-500">Kota Jambi</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">Login Akun</h2>
          <p className="mt-1 text-sm text-gray-500">Masuk menggunakan akun yang telah terdaftar.</p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">Email</span>
              <input
                type="email"
                placeholder="contoh@dlh.jambikota.go.id"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">Password</span>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between gap-3">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                Ingat saya
              </label>
              <a href="#/" className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800">
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              onClick={() => {
                window.location.hash = '/admin';
              }}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700 active:translate-y-0"
            >
              Masuk
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            Akses halaman ini hanya melalui URL <span className="font-semibold text-emerald-700">#/login</span>
          </p>
        </div>
      </div>
    </section>
  );
}
