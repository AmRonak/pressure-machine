'use client';
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { useAuthSelector } from "@/redux/slices/authSlice";
import { useState } from "react";

const currentDateTime = {
  date: moment().format('DD - MM - YYYY'),
  time: moment().format('HH:mm:ss')
}

const Navigation = () => {
  const {isAuthenticated, userDetail} = useAuthSelector();
  const [dateTime,setDateTime] = useState(currentDateTime);

  return (
    <div className="flex flex-col justify-center fixed top-10 right-10">
      <div>
        <p className="text-end pr-4">
          <span className="text-xl text-slate-400">{dateTime.date}</span>
          <span className="text-2xl text-slate-400"> | </span>
          <span className="text-2xl font-bold text-slate-400">{dateTime.time}</span>
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
            <div className="relative">
              <div className="group cursor-pointer relative">
                <Image 
                  src={`/images/user-icon.svg`}
                  width={80}
                  height={80}
                  alt="user profile icon image"
                  className="hover:cursor-pointer"
                />
                <div className="opacity-0 w-auto bg-primary text-white text-center text-balance text-xs rounded-lg py-2 px-4 absolute z-10 group-hover:opacity-100 pointer-events-none top-20">
                  {userDetail?.username}
                </div>
              </div>
            </div>
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
