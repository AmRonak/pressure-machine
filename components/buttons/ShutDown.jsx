'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";

const ShutDown = () => {
  const pathname = usePathname();

  if(pathname !== '/') return null;

  return (
    <button className="flex flex-col justify-center items-center fixed bottom-20 right-20">
      <Image
        src={'/images/shutdown-btn.svg'}
        width={60}
        height={60}
        alt="shut-down button"
      />
      <p className="uppercase p-2">shut down</p>
    </button>
  );
};

export default ShutDown;
