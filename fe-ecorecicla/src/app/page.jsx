// app/page.jsx
import React from 'react'
import Navbar from "@/components/Nav";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className='w-full h-full'>Pagina Home</div>
    </main>
  )
}
