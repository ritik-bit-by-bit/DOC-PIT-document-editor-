'use client'
import React from 'react'
import SearchInput from './search-input';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './navbar';
import TemplateGallery from './Template'
const NewDoCSection = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex top-0 left-0 right-0 z-10 h-16 bg-white p-4'>
      <Navbar/>
      </div>
      <div className='mt-16'>
        <TemplateGallery/>
      </div>
    </div>
  )
}

export default NewDoCSection;