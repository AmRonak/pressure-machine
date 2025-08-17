"use client";
import AxiosHCO from "@/components/axiosHOC/AxiosHCO";
import DeviceButton from "@/components/buttons/DeviceButton";
import Navigation from "@/components/buttons/Navigation";
import DeviceInfoModal from "@/components/modals/DeviceInfoModal";
import { useDevicesSelector } from "@/redux/slices/devices";
import React from "react";

const Devices = () => {
  const { isLoading, isError, devices } = useDevicesSelector();

  let maxWidth = 50;
  let devicesCss = `grid grid-cols-5 mb-10 mt-5 gap-10`;

  switch(devices.length){
    case 1:
      maxWidth = 33;
      devicesCss = `grid grid-cols-1 gap-10`;
      break;
    case 2:
      maxWidth = 50;
      devicesCss = `grid grid-cols-2 mt-24 gap-10`;
      break;
    case 3:
      maxWidth = 70;
      devicesCss = `grid grid-cols-3 mt-24 gap-10`;
      break;
    case 4:
      maxWidth = 90;
      devicesCss = `grid grid-cols-4 mt-24 gap-10`;
      break;
    case 5:
      maxWidth = 90;
      devicesCss = `grid grid-cols-5 mt-24 gap-10`;
      break;
    case 6:
      maxWidth = 60;
      devicesCss = `grid grid-cols-3 grid-flow-row mt-10 gap-5`;
      break;
    case 7:
      maxWidth = 48;
      devicesCss = `grid grid-cols-4 grid-flow-row gap-5`;
      break;
    case 8:
      maxWidth = 48;
      devicesCss = `grid grid-cols-4 grid-flow-row gap-5`;
      break;
    case 9:
      maxWidth = 58;
      devicesCss = `grid grid-cols-5 grid-flow-row gap-5`;
      break;
    case 10:
      maxWidth = 58;
      devicesCss = `grid grid-cols-5 grid-flow-row gap-5`;
      break;
    default:
      maxWidth = 20;
      break;
  }

  return (
    <>
      {/* Main container for the page */}
      <div className="grid-flow-col mx-auto px-16 pt-10 pb-5">
        <div className="flex justify-between items-center">
          <p className="text-5xl lg:text-6xl font-bold uppercase mb-10 text-wrap max-w-[500px] lg:max-w-[800px]">
            Devices
          </p>
          <Navigation />
        </div>
        <AxiosHCO
          isLoading={isLoading}
          isError={isError}
          errorMessage="Failed to load devices, please try sometimes later."
        >
          <div className={devicesCss}>
            {devices.map((device) => (
              <DeviceButton key={device.id} device={device} devices={devices} maxWidth={maxWidth || 60} />
            ))}
          </div>
        </AxiosHCO>
        <DeviceInfoModal />
      </div>
    </>
  );
};

export default Devices;
