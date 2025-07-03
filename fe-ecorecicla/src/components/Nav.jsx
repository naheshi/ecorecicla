import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md w-full px-4 sm:px-6 lg:px-5 ">
      <div className="flex items-center justify-between h-20 w-full ">
        
        {/* Logo a la izquierda */}
        <div className="flex-shrink-0">
          <img src="/Eco2.png" className="h-70 w-auto object-contain " />
        </div>

        {/* Botones + icono a la derecha */}
        <div className="flex items-center space-x-4 ml-auto">
          <Link
            href="/Home"
            className="text-black bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 transition-colors duration-500 ease-in-out"
          >
            Home
          </Link>
          <Link
            href="/Perfil"
            className="text-black bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 transition-colors duration-500 ease-in-out"
          >
            Perfil
          </Link>
          <Link
            href="/Tienda"
            className="text-black bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 transition-colors duration-500 ease-in-out"
          >
            Tienda
          </Link>
          <Link
            href="/Ranking"
            className="text-black bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 transition-colors duration-500 ease-in-out"
          >
            Ranking
          </Link>
          <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors duration-500 ease-in-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
