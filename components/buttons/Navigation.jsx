'use client';
import Link from "next/link";
import Image from "next/image";
import { setCompanyName, useAuthSelector } from "@/redux/slices/authSlice";
import Clock from 'react-live-clock';
import handleAxiosRequest from "@/util/handleRequest";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Navigation = () => {
  const {isAuthenticated, userDetail, companyName} = useAuthSelector();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        const { data } = await handleAxiosRequest({api: 'parameterSetting/getCompanyname'});
        dispatch(setCompanyName(data.companyName))
      } catch (error) {
        // 
      }
    };
    fetchCompanyName();
  }, [dispatch])
  
  return (
    <div className="flex flex-col justify-center">
      {
        companyName && <div>
          {/* <span className="text-xl">Company Name:</span> */}
          <span className="capitalize text-2xl font-bold ml-1">{companyName}</span>
        </div>
      }
      <div>
        <p className="text-end pr-4">
          <span>
            <Clock
              format={'DD-MM-YYYY'}
              timezone={'locale'}
              className="text-slate-400 text-xl"
            />
          </span>
          <span className="text-2xl text-slate-400"> | </span>
          <span className="text-2xl font-bold text-slate-400">
            <Clock
            format={'HH:mm:ss'}
            ticking={true}
            timezone={'locale'}
            className="text-slate-400"
          />
          </span>
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
                <div className="ml-2 opacity-0 w-auto bg-primary text-white text-center text-balance text-xs rounded-lg py-2 px-4 absolute z-10 group-hover:opacity-100 pointer-events-none top-20">
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
