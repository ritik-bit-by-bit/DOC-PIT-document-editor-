import React from 'react'
import Editor from './editor';
interface GetParams {
  params: { documentid: string };
}

const Page = ({ params }: GetParams) => {

  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
      <Editor/>
    </div>
  )
}

export default Page;
