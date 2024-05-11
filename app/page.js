'use client'

import LoginButton from "@/components/buttons/LoginButton";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between xl:p-48 sm:p-20 md:p-36 lg:28 z-10">
      <div>
        <h1 className="font-bold xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">hello!</h1>
        <h3 className="font-light xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl sm:leading-[2rem] md:leading-[3rem] lg:leading-[4rem] xl:leading-[5rem]">
          it&rsquo;s good to
        </h3>
        <h3  className="font-light xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          see you back
        </h3>
      </div>
      <LoginButton
        btnStyle="w-60 h-12 sm:w-80 sm:h-16 xl:w-96 xl:h-20 sm:text-2xl sm:tracking-[.4rem] lg: xl:text-3xl xl:tracking-[.5rem]"
        textStyle="py-2 sm:py-4"
        isLinkButton={true}
      />
    </main>
  );
}
