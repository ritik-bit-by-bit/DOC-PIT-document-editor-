import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Navbar = () => {
  return (
   <nav className='flex items-center h-full w-full'>
  <div className='flex gap-3 items-center pr-6'>
   <Link href="/">
   <Image src="/doc-pit-logo.png" alt="logo" width={36} height={36} className="rounded-lg"></Image>
   </Link>
   <h3 className='text-xl text-shadow-lg shadow-gray-200'>Select Documents Type to proceed</h3>
    </div> 
    </nav>
  )
}

export default Navbar