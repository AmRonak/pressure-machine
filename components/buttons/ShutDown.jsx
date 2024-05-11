'use client';

import { usePathname } from "next/navigation";

const ShutDown = () => {
  const pathname = usePathname();
  console.log({ pathname })

  if(pathname !== '/') return null;

  return (
    <button className="flex flex-col justify-center items-center fixed bottom-20 right-20">
      {/* <Image src={'/images/shutdown-icon.png'} width={60} height={60} alt="shut-down button" /> */}
      <p>SHUT DOWN</p>
    </button>
  );
};

export default ShutDown;
