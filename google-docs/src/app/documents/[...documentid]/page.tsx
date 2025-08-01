import React from 'react'
import Editor from './editor';
import ToolBar from './ToolBar';

export interface GetParams {
  params: { documentid: string };
}

const Page = ({ params }: GetParams) => {

  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
      <ToolBar/>
      <Editor/>
    </div>
  )
}

export default Page;
