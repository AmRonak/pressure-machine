'use client';
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const date = dayjs().format('DD - MM - YYYY') 
const time = dayjs().format('HH:mm');

const Navigation = () => {
  const {isAuthenticated} = useSelector(state => state.auth);

  return (
    <div className="flex flex-col justify-center fixed top-10 right-10">
      <div>
        <p className="text-end pr-4">
          <span className="text-xl text-slate-400">{date}</span>
          <span className="text-2xl text-slate-400"> | </span>
          <span className="text-2xl font-bold text-slate-400">{time}</span>
        </p>
      </div>
      <div className="flex justify-end">
        {
        isAuthenticated && (
          <>
            <Link href={'/dashboard'}>
              <Image 
                src={`/images/home_icon.svg`}
                width={80}
                height={80}
                alt="home button"
              />
            </Link>
            <Image 
              src={`/images/user-icon.svg`}
              width={80}
              height={80}
              alt="user profile icon image"
              className="hover:cursor-pointer"
            />
          </>
        )}
        <Image 
          src={`/images/battery-full.svg`}
          width={80}
          height={80}
          alt="battery status"
          className="hover:cursor-pointer"
        />
      </div>
    </div>
  )
};

export default Navigation;
