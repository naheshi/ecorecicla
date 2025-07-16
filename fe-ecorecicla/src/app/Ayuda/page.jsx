"use client";
import { useState } from "react";
import categories from "./preguntasFrec";
import Navbar from "@/components/Nav";
import Footer from "@/components/Footer";



export default function Ayuda() {
  const [activeCategory, setActiveCategory] = useState("cuenta");
  const [openQuestion, setOpenQuestion] = useState(null);

  const activeFaqs = categories.find((c) => c.key === activeCategory)?.faqs || [];

  return (
    <main>
      <Navbar/>
    <div className="min-h-screen bg-pink-95 p-6">

{/* Sección de Barra de Búsqueda */}
<section className="relative h-[420px] rounded-xl overflow-hidden shadow-lg">
  <div className="absolute inset-0 bg-[url('/forest.jpg')] bg-cover bg-center"></div>
  <div className="absolute inset-0 bg-black  opacity-50"></div>
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
    <h1 className="text-3xl sm:text-4xl font-bold mb-6">¿En qué te podemos Ayudar?</h1>
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Buscar"
        className="rounded-l-full px-4 py-3 w-100 sm:w-180 text-black bg-white"
      />
      <button className="rounded-r-full bg-lime-500 text-white px-6 py-2 hover:bg-lime-600 duration-500">Buscar</button>
    </div>
  </div>
</section>


      {/* Sección de Categorías */}
      <section className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              setActiveCategory(cat.key);
              setOpenQuestion(null);
            }}
            className={`rounded-lg border px-4 py-4 shadow-md transition-colors duration-500 ${
              activeCategory === cat.key
                ? "bg-lime-100 border-lime-400"
                : "bg-white"
            }`}
          >
            <div className="text-3xl mb-2">{cat.icon}</div>
            <div className="font-semibold text-sm text-center">{cat.title}</div>
          </button>
        ))}
      </section>

      {/* Sección de Preguntas Frecuentes */}
      <section className="mt-8 space-y-4">
        {activeFaqs.map((faq, idx) => (
          <div key={idx} className="bg-pink-50 shadow-md rounded-lg">
            <button
              onClick={() => setOpenQuestion(openQuestion === idx ? null : idx)}
              className="w-full text-left px-4 py-3 font-semibold flex justify-between items-center"
            >
              {faq.question}
              <span className="text-xl">
                {openQuestion === idx ? "▲" : "▼"}
              </span>
            </button>
            {openQuestion === idx && (
              <div className="px-4 pb-4 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </section>

    </div>
      

      <Footer />
    </main>
    
  );
}
