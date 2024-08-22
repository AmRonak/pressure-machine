'use client'

import LoginButton from "@/components/buttons/LoginButton";
import Navigation from "@/components/buttons/Navigation";

export default function Home() {
  return (
    <main>
      <div className="grid-flow-col mx-auto px-16 pt-10">
        <div className="flex justify-between items-center">
          <p></p>
          <Navigation />
        </div>
      </div>
      <div className="flex gap-10 items-center justify-between px-20 md:px-36 lg:px-28 xl:px-48 py-48 z-10">
        <div>
          <h1 className="font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">hello!</h1>
          <h3 className="font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-[2rem] md:leading-[3rem] lg:leading-[4rem] xl:leading-[5rem]">
            it&rsquo;s good to
          </h3>
          <h3 className="font-light xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            see you back
          </h3>
        </div>
        <LoginButton
          btnStyle="w-60 h-12 w-80 h-16 xl:w-96 xl:h-20 text-2xl tracking-[.4rem] xl:text-3xl xl:tracking-[.5rem]"
          textStyle="py-5"
          isLinkButton={true}
        />
      </div>
    </main>
  );
}
