export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="font-bold text-xl leading-tight text-gray-900">DLH</h1>
                <p className="text-xs text-green-600 font-semibold">Kota Jambi</p>
              </div>
            </div>
            {/* Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#beranda" className="text-green-600 font-medium border-b-2 border-green-600 pb-1">Beranda</a>
              <a href="#profil" className="text-gray-500 hover:text-green-600 transition">Profil</a>
              <a href="#berita" className="text-gray-500 hover:text-green-600 transition">Berita</a>
              <a href="#galeri" className="text-gray-500 hover:text-green-600 transition">Galeri</a>
              <a href="#kontak" className="text-gray-500 hover:text-green-600 transition">Kontak</a>
            </div>
            {/* Login Button */}
            <div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium transition shadow-md shadow-green-200">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>
  );
}