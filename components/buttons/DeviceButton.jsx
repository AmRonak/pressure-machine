'use client';

import { LOGGED_IN, OFFLINE, ONLINE, TEST_STARTED } from "@/constants/devicesStatus";
import axios from "axios";
import Image from "next/image";
import { useAuthSelector } from "@/redux/slices/authSlice";
import { SUPER_ADMIN } from "@/constants/constants";
import { useMemo } from "react";

const DeviceButton = ({
  device: {
    deviceId,
    pin,
    status,
  },
}) => {
  let color = 'grey';

  const state = useAuthSelector();

  switch(status){
    case ONLINE: color = 'blue'; break;
    case OFFLINE: color = 'grey'; break;
    case TEST_STARTED: color = 'yellow'; break;
    case LOGGED_IN: color = 'green'; break;
    default: color = 'grey'; break;
  }

  const handleSendData = () => {
    axios.post('http://localhost:5000/send-data', {
        deviceId,
        isSuperUser: state?.userDetail?.userLevel === SUPER_ADMIN,
        data: { message: deviceId, pin },
    })
      .then((response) => {
          console.log('Data sent:', response.data);
      })
      .catch((error) => {
          console.error('Error sending data:', error);
      });
  };

  const disabled = status === OFFLINE || status === undefined || status === null

  return (
    <div className="flex flex-col items-center">
      <Image
        src={`/images/pressure-${color}.svg`}
        width={250}
        height={250}
        alt={`device ${deviceId} button`}
      />
      <p className="text-2xl font-extrabold">
        {deviceId}
      </p>
      <button
        disabled={disabled}
        type="button"
        className={`
          login-btn-common
          w-auto h-auto px-5 py-2 mt-4 text-lg xl:text-3xl
          ${status === ONLINE && 'cursor-pointer'}
          ${disabled && 'opacity-50'}
        `}
        onClick={handleSendData}
      >
        {(status === LOGGED_IN || status === TEST_STARTED) ? 'Logged In' : 'Login'}
      </button>
    </div>
  );
};

export default DeviceButton
;
