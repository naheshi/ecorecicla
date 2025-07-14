import React from 'react'
import Navbar from '@/components/Nav'
import Footer from '@/components/Footer'
const page = () => {
  return (
    <main>
<Navbar/>
    <div className='flex flex-col w-max max-w-full overflow-auto'>
        <div className='flex w-full h-fit text-center justify-center items-center'>
            <p className='justify-center text-center font-bold'> Hola Mundo</p>
        </div>
    </div>
<Footer/>
    </main>
    
  )
}

export default page