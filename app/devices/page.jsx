"use client";
import AxiosHCO from "@/components/axiosHOC/AxiosHCO";
import DeviceButton from "@/components/buttons/DeviceButton";
import Navigation from "@/components/buttons/Navigation";
import DeviceInfoModal from "@/components/modals/DeviceInfoModal";
import { useDevicesSelector } from "@/redux/slices/devices";
import React from "react";

const Devices = () => {
  const { isLoading, isError, devices } = useDevicesSelector();
  // console.log({devices})
  return (
    <>
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
          <div className="grid grid-flow-row grid-cols-5 mb-10 mt-5 gap-10">
            {devices.map((device) => (
              <DeviceButton key={device.id} device={device} />
            ))}
          </div>
        </AxiosHCO>

        <DeviceInfoModal />
      </div>
    </>
  );
};

export default Devices;
