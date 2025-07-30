import Image from "next/image";
import Link from 'next/link'
export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <span><Link href="/auth/sign-up">Sign Up</Link></span>
      <span><Link href="/auth/sign-in">Sign In</Link></span>
      <span><Link href="/documents/123">document</Link></span>
    </div>
  );
}
