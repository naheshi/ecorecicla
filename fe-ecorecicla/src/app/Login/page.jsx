import React from 'react';
import Link from 'next/link';

const Login = () => {
    return (
        <div className="min-h-screen bg-[url('/fondo-login.jpg')] bg-cover bg-center flex items-center justify-center px-4">
            <div className="bg-white bg-opacity-90 p-10 rounded-2xl shadow-xl w-full max-w-md flex flex-col items-center">
                {/* Logo */}
                <Link href="/Home">
                    <img src="/Eco2.png" alt="Logo" className="w-48 h-full mb-6 cursor-pointer" />
                </Link>


                {/* Formulario */}
                <form className="w-full flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A5AF22]"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A5AF22]"
                    />

                    <button
                        type="submit"
                        className="w-full bg-[#A5AF22] text-white font-semibold py-3 rounded-md hover:bg-[#c4cd3f] transition"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                {/* Olvidaste contraseña */}
                <p className="mt-4 text-sm text-gray-600 hover:underline cursor-pointer">
                    ¿Olvidaste tu contraseña?
                </p>

                {/* Registro dentro del div blanco */}
                <p className="mt-8 text-sm text-gray-600">
                    ¿No tienes cuenta?{' '}
                    <a href="#" className="text-[#A5AF22] font-semibold hover:underline">
                        Regístrate
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
