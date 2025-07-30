import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div>page
        <Link href="/auth/sign-in">Sign In</Link>
    </div>
  )
}

export default page;