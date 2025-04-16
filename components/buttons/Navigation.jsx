"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuthSelector } from "@/redux/slices/authSlice";
import Clock from "react-live-clock";
import { useDevicesSelector } from "@/redux/slices/devices";
import { TEST_STARTED } from "@/constants/devicesStatus";

const Navigation = () => {
  const { isAuthenticated, userDetail, companyName } = useAuthSelector();
  const { devices } = useDevicesSelector();

  return (
    <div className="flex flex-col justify-center">
      {companyName && (
        <div className="capitalize text-2xl font-bold text-right pr-4">
          {companyName}
        </div>
      )}
      <div>
        <p className="text-end pr-4">
          <span>
            <Clock
              format={"DD-MM-YYYY"}
              // timezone={"locale"}
              className="text-slate-400 text-xl"
            />
          </span>
          <span className="text-2xl text-slate-400"> | </span>
          <span className="text-2xl font-bold text-slate-400">
            <Clock
              format={"HH:mm:ss"}
              ticking={true}
              // timezone={"locale"}
              className="text-slate-400"
            />
          </span>
        </p>
      </div>
      <div className="flex justify-end">
        {isAuthenticated && (
          <>
            {!devices.some((d) => d.status === TEST_STARTED) && (
              <Link href={"/dashboard"}>
                <Image
                  src={`/images/home_icon.svg`}
                  width={80}
                  height={80}
                  alt="home button"
                />
              </Link>
            )}
            <div className="relative">
              <div className="group cursor-pointer relative">
                <Image
                  src={`/images/user-icon.svg`}
                  width={80}
                  height={80}
                  alt="user profile icon image"
                  className="hover:cursor-pointer"
                />
                <div className="ml-2 opacity-0 w-auto bg-primary text-white text-center text-balance text-xs rounded-lg py-2 px-4 absolute z-10 group-hover:opacity-100 pointer-events-none top-20">
                  {userDetail?.username}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
