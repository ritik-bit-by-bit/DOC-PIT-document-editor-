import React from 'react';
import Editor from './editor';
import ToolBar from './ToolBar';
import Navbar from './navbar';

// Define the props for the Page component

const Page = () => {
  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
      <div className='flex flex-col px-2 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-white print:hidden'>
        <Navbar />
        <ToolBar />
      </div>
      <div className='pt-[114px] print:pt-0'>
        <Editor />
      </div>
    </div>
  );
};

export default Page;
