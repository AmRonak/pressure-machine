'use client'

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between p-48 z-10">
      <div>
        <h1 className="font-bold xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">hello!</h1>
        <h3 className="font-light xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl sm:leading-[2rem] md:leading-[3rem] lg:leading-[4rem] xl:leading-[5rem]">
          it&rsquo;s good to
        </h3>
        <h3  className="font-light xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          see you back
        </h3>
      </div>
      <button className="w-96 h-20 bg-[#4218EF] rounded-full">
        <Link href={'/login'} className="text-white text-3xl font-bold tracking-[.5rem] capitalize">
          LOGIN
        </Link>
      </button>
    </main>
    
  );
}
