"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="bg-white shadow-md w-full px-4 sm:px-6 lg:px-5">
        <div className="flex items-center justify-between h-20 w-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/Eco2.png" className="h-15 w-auto object-contain" />
          </div>

          {/* Botones + icono */}
          <div className="flex items-center space-x-4 ml-auto">
            <Link
              href="/Home"
              className="text-black bg-white hover:bg-gray-200 rounded-lg px-4 py-2 transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/Perfil"
              className="text-black bg-white hover:bg-gray-200 rounded-lg px-4 py-2 transition duration-300"
            >
              Perfil
            </Link>
            <Link
              href="/Tienda"
              className="text-black bg-white hover:bg-gray-200 rounded-lg px-4 py-2 transition duration-300"
            >
              Tienda
            </Link>

            <Link
              href="/Ranking"
              className="text-black bg-white hover:bg-gray-200 rounded-lg px-4 py-2 transition duration-300"
            >
              Ranking
            </Link>
            <button
              onClick={toggleSidebar}
              className="bg-white hover:bg-gray-200 p-2 rounded-lg transition duration-300"
            >
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

    {/* Sidebar */}
<div
  className={`fixed top-0 right-0 h-full w-64  bg-white shadow-lg  transform ${
    isSidebarOpen ? "translate-x-0" : "translate-x-full"
  } transition-transform duration-300 ease-in-out z-50`}
>
  {/* Logo + botón cerrar en la misma línea */}
 
<div className="shadow-md bg-white">
  <div className="flex items-center justify-between px-4 pt-2 pb-1">
    <img
      src="\Eco.png"
      className="h-12 w-auto object-"
      alt="Logo"
    />
    <button
      onClick={toggleSidebar}
      className="text-gray-600 hover:text-black text-xl transition duration-300 right-12"
    >
      ✕
    </button>
  </div>
</div>

{/* Navegación más cerca del logo */}
<nav className="flex flex-col px-4 pt-2 space-y-2">
  <Link
    href="/Novedades"
    className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg transition duration-200 shadow-sm"
  >
    Referidos
  </Link>
  <Link
    href="/ZonaEducativa"
    className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg transition duration-200 shadow-sm"
  >
    Zona Educativa
  </Link>
  <Link
    href="/Mapa"
    className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg transition duration-200 shadow-sm"
  >
    Mapa
  </Link>
  <Link
    href="/Ayuda"
    className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg transition duration-200 shadow-sm"
  >
    Ayuda
  </Link>
</nav>

</div>


      {/* Overlay para cerrar sidebar al tocar fuera */}
     {isSidebarOpen && (
  <div
    className="fixed inset-0 bg-black z-40"
    style={{ opacity: 0.85 }}
    onClick={toggleSidebar}
  />
)}

    </>
  );
}
