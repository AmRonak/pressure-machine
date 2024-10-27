'use client';
import AxiosHCO from "@/components/axiosHOC/AxiosHCO";
import DeviceButton from "@/components/buttons/DeviceButton";
import Navigation from "@/components/buttons/Navigation";
import { LOGGED_IN, OFFLINE, ONLINE, TEST_STARTED } from "@/constants/devicesStatus";
import handleAxiosRequest from "@/util/handleRequest";
import React, { useEffect, useState } from "react";

const Devices = () => {
  const [isOnlineDevicesUpdated, setIsOnlineDevicesUpdated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [devices, setDevices] = useState([]);
  const [onlineDevices, setOnlineDevices] = useState([]);

  // fetch all devices
  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    const fetchDevices = async () => {
      try {
        const { data } = await handleAxiosRequest({
          api: 'devices',
        });
        setDevices(data)
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }
    fetchDevices();
  }, []);

  // Socket
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000');

      // Register this React client to receive WebSocket messages
      socket.onopen = () => {
          console.log('WebSocket connected');
          socket.send(JSON.stringify({ type: 'react-register' }));
      };

      // Handle messages from the server
      socket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          console.log({ message });
          if (message.type === 'device-login-success') {
              console.log('Received response from device: login success', message);
              setDevices(prev => {
                return prev.map(s => {
                  if (s.deviceId === message.deviceInfo.deviceId) {
                      return { ...s, isLoggedIn: true, status: message?.deviceInfo?.status }
                  }
                  return s
                })
              })
          } else if (message.type === 'device-logout-success') {
            console.log('Received response from device: logout', message);
            setDevices(prev => {
              return prev.map(s => {
                if (s.deviceId === message.deviceInfo.deviceId) {
                    return { ...s, isLoggedIn: false, status: message?.deviceInfo?.status }
                }
                return s
              })
            })
          } else if (message.type === 'new-device-online') {
              console.log('Received response from device new-device-online:', message);
              setDevices(prev => {
                  return prev.map(s => {
                      if (s.deviceId === message.deviceInfo.deviceId) {
                          return { ...s, isOnline: true, status: message?.deviceInfo?.status }
                      }
                      return s
                  })
              });
          } else if (message.type === 'device-test-start') {
              console.log('Received response from device device-test-start:', message);
              setDevices(prev => {
                  return prev.map(s => {
                      if (s.deviceId === message.deviceInfo.deviceId) {
                          return { ...s, isTestStarted: true, status: message?.deviceInfo?.status }
                      }
                      return s
                  })
              });
          } else if (message.type === 'device-test-stop') {
              console.log('Received response from device device-test-stop:', message);
              setDevices(prev => {
                  return prev.map(s => {
                      if (s.deviceId === message.deviceInfo.deviceId) {
                          return { ...s, isTestStarted: false, status: message?.deviceInfo?.status }
                      }
                      return s
                  })
              });
          } else if (message.type === 'online-device-list') {
            console.log(message)
            console.log('Received response from online-device-list: ', message)
            setOnlineDevices(message.devices);
          } else if (message.type === 'device-offline') {
            console.log('Received response from device offline:', message);
            setDevices(prev => {
                return prev.map(s => {
                    if (s.deviceId === message.deviceId) {
                        return { ...s, isOnline: false, status: OFFLINE }
                    }
                    return s
                })
            });
          }
      };

      return () => {
          // Clean up the WebSocket connection
          if (socket) socket.close();
      };
  }, []);

  console.log(devices)

  // onLoad set online device
  useEffect(() => {
    if(devices.length !== 0 && onlineDevices?.length !== 0 && isOnlineDevicesUpdated) {
      setIsOnlineDevicesUpdated(false)
      setDevices(prev => {
        return prev.map(s => {
          const found = onlineDevices.find(d => d.deviceId === s.deviceId)
            if(found) {
              return { ...s, isOnline: true, status: found.status }
            }
            return { ...s, isOnline: false, status: OFFLINE }
        })
      });
    }
  }, [onlineDevices, devices, isOnlineDevicesUpdated])

  return (
    <div className="grid-flow-col mx-auto px-16 pt-10 pb-5">
      <div className="flex justify-between items-center">
        <p className="text-5xl lg:text-6xl font-bold uppercase mb-10 text-wrap max-w-[500px] lg:max-w-[800px]">
          Devices
        </p>
        <Navigation />
      </div>
      <AxiosHCO isLoading={isLoading} isError={isError} errorMessage="Failed to load devices, please try sometimes later.">
        <div className="grid grid-flow-row grid-cols-5 mb-10 mt-5 gap-10">
          {devices.map((device) => (
            <DeviceButton
              key={device.id}
              device={device}
            />
          ))}
        </div>
      </AxiosHCO>
    </div>
  );
};

export default Devices;
