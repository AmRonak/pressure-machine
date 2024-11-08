import { OFFLINE } from '@/constants/devicesStatus';
import { setDevices, setIsError, setIsLoading, useDevicesSelector, setIsOnlineDevicesUpdated, setOnlineDevices } from '@/redux/slices/devices';
import handleAxiosRequest from '@/util/handleRequest';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function useWebSocket() {
  const {
    isOnlineDevicesUpdated,
    devices,
    onlineDevices
  } = useDevicesSelector();

  const dispatch = useDispatch();

  // fetch all devices
  useEffect(() => {
    dispatch(setIsError(false));
    dispatch(setIsLoading(true));
    const fetchDevices = async () => {
      try {
        const { data } = await handleAxiosRequest({
          api: 'devices',
        });
        dispatch(setDevices(data))
        dispatch(setIsLoading(false));
      } catch (error) {
        dispatch(setIsError(true));
        dispatch(setIsLoading(false));
      }
    }
    fetchDevices();
  }, [dispatch]);

  // Socket
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000');

      // Register this React client to receive WebSocket messages
      socket.onopen = () => {
          // console.log('WebSocket connected');
          socket.send(JSON.stringify({ type: 'react-register' }));
      };

      // Handle messages from the server
      socket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          // console.log({ message });
          if (message.type === 'device-login-success') {
              // console.log('Received response from device: login success', message);
              dispatch(setDevices(devices.map(s => {
                  if (s.deviceId === message.deviceInfo.deviceId) {
                      return { ...s, loggedIn: true, status: message?.deviceInfo?.status }
                  }
                  return s
                })
              ))
          } else if (message.type === 'device-logout-success') {
            // console.log('Received response from device: logout', message);
            dispatch(setDevices(devices.map(s => {
                if (s.deviceId === message.deviceInfo.deviceId) {
                    return { ...s, loggedIn: false, status: message?.deviceInfo?.status }
                }
                return s
              })
            ))
          } else if (message.type === 'new-device-online') {
              // console.log('Received response from device new-device-online:', message);
              dispatch(setDevices(devices.map(s => {
                  if (s.deviceId === message.deviceInfo.deviceId) {
                      return { ...s, isOnline: true, status: message?.deviceInfo?.status }
                  }
                  return s
                })
              ));
          } else if (message.type === 'device-test-start') {
              // console.log('Received response from device device-test-start:', message);
              dispatch(setDevices(devices.map(s => {
                  if (s.deviceId === message.deviceInfo.deviceId) {
                      return { ...s, isTestStarted: true, status: message?.deviceInfo?.status }
                  }
                  return s
                })
              ));
          } else if (message.type === 'device-test-stop') {
              // console.log('Received response from device device-test-stop:', message);
              dispatch(setDevices(devices.map(s => {
                  if (s.deviceId === message.deviceInfo.deviceId) {
                      return { ...s, isTestStarted: false, status: message?.deviceInfo?.status }
                  }
                  return s
                })
              ));
          } else if (message.type === 'online-device-list') {
            // console.log(message.devices)
            dispatch(setOnlineDevices(message.devices));
          } else if (message.type === 'device-offline') {
            // console.log('Received response from device offline:', message);
            dispatch(setDevices(devices.map(s => {
                if (s.deviceId === message.deviceId) {
                    return { ...s, isOnline: false, status: OFFLINE }
                }
                return s
              })
            ));
          }
      };

      return () => {
          // Clean up the WebSocket connection
          if (socket) socket.close();
      };
  }, [devices, dispatch]);

  // console.log(devices)

  // onLoad set online device
  useEffect(() => {
    if(devices.length !== 0 && onlineDevices?.length !== 0 && isOnlineDevicesUpdated) {
      dispatch(setIsOnlineDevicesUpdated(false))
      dispatch(setDevices(devices.map(s => {
          const found = onlineDevices.find(d => d.deviceId === s.deviceId)
          if(found) {
            return { ...s, isOnline: true, status: found.status, ...found }
          }
          return { ...s, isOnline: false, status: OFFLINE }
        })
      ));
    }
  }, [onlineDevices, devices, isOnlineDevicesUpdated, dispatch])
}

export default useWebSocket;
