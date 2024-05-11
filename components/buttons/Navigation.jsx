'use client';
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";

const Navigation = () => {
  
  const date = dayjs().format('DD - MM - YYYY') 
  const time = dayjs().format('HH:mm');
  const pathname = usePathname();
  // console.log({ pathname })

  return (
    <div className="flex flex-col justify-center fixed top-20 right-20">
      <div>
        <p className="text-end pr-4">
          <span className="text-xl text-slate-400">{date}</span>
          <span className="text-2xl text-slate-400"> | </span>
          <span className="text-2xl font-bold text-slate-400">{time}</span>
        </p>
      </div>
      <div className="flex justify-end">
        <Link href={'/'}>
          <Image 
            src={`/images/home_icon.svg`}
            width={100}
            height={100}
            alt="home button"
          />
        </Link>
        <Image 
          src={`/images/user-icon.svg`}
          width={100}
          height={100}
          alt="user profile icon image"
          className="hover:cursor-pointer"
        />
        <Image 
          src={`/images/battery-full.svg`}
          width={100}
          height={100}
          alt="battery status"
          className="hover:cursor-pointer"
        />
      </div>
    </div>
  )
};

export default Navigation;
