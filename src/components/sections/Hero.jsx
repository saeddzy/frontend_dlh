export default function Hero() {
  return (
    <section id="beranda" className="relative bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Jaga Lingkungan <br className="hidden md:block"/> untuk Masa Depan
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Lestarikan alam, wujudkan Jambi yang hijau, bersih, dan berkelanjutan. Tanggung jawab kita bersama untuk bumi yang lebih baik.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition shadow-lg shadow-green-300">
              Lihat Program
            </button>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative z-10 flex justify-center">
            {/* Placeholder for Lottie/Illustration */}
            <div className="w-full max-w-md aspect-square bg-white/60 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white shadow-2xl">
              <TreePine className="w-48 h-48 text-green-500 opacity-80" />
            </div>
          </div>
        </div>
      </section>
  );
}