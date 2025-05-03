import { OFFLINE } from '@/constants/devicesStatus';
import {
  setDevices,
  setIsError,
  setIsLoading,
  useDevicesSelector,
  setIsOnlineDevicesUpdated,
  setOnlineDevices,
  resetDataChanged
} from '@/redux/slices/devices';
import handleAxiosRequest from '@/util/handleRequest';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation'

function useWebSocket() {
  const {
    isOnlineDevicesUpdated,
    devices,
    onlineDevices,
    dataChanged,
  } = useDevicesSelector();
  const pathname = usePathname();

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
      socket.send(JSON.stringify({ type: 'react-register' }));

      socket.send(JSON.stringify({ type: 'is-in-device-page', isDevicePage: pathname.includes('/devices') }));

      if (dataChanged) {
        socket.send(JSON.stringify({ type: 'data-changed' }))
        dispatch(resetDataChanged());
      }
    };

    // Handle messages from the server
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'device-login-success') {
        dispatch(setDevices(devices.map(s => {
          if (s.deviceId === message.deviceInfo.deviceId) {
            return { ...s, loggedIn: true, status: message?.deviceInfo?.status }
          }
          return s
        })
        ))
      } else if (message.type === 'device-logout-success') {
        dispatch(setDevices(devices.map(s => {
          if (s.deviceId === message.deviceInfo.deviceId) {
            return { ...s, loggedIn: false, status: message?.deviceInfo?.status }
          }
          return s
        })
        ))
      } else if (message.type === 'new-device-online') {
        dispatch(setDevices(devices.map(s => {
          if (s.deviceId === message.deviceInfo.deviceId) {
            return { ...s, isOnline: true, status: message?.deviceInfo?.status }
          }
          return s
        })
        ));
      } else if (message.type === 'device-test-start') {
        dispatch(setDevices(devices.map(s => {
          if (s.deviceId === message.deviceInfo.deviceId) {
            return { ...s, isTestStarted: true, status: message?.deviceInfo?.status }
          }
          return s
        })
        ));
      } else if (message.type === 'device-test-stop') {
        dispatch(setDevices(devices.map(s => {
          if (s.deviceId === message.deviceInfo.deviceId) {
            return { ...s, isTestStarted: false, status: message?.deviceInfo?.status }
          }
          return s
        })
        ));
      } else if (message.type === 'online-device-list') {
        dispatch(setOnlineDevices(message.devices));
      } else if (message.type === 'device-offline') {
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
  }, [devices, dispatch, dataChanged, pathname]);

  // onLoad set online device
  useEffect(() => {
    if (devices.length !== 0 && onlineDevices?.length !== 0 && isOnlineDevicesUpdated) {
      dispatch(setIsOnlineDevicesUpdated(false))
      dispatch(setDevices(devices.map(s => {
        const found = onlineDevices.find(d => d.deviceId === s.deviceId)
        if (found) {
          return { ...s, isOnline: true, status: found.status, ...found }
        }
        return { ...s, isOnline: false, status: OFFLINE }
      })
      ));
    }
  }, [onlineDevices, devices, isOnlineDevicesUpdated, dispatch])
}

export default useWebSocket;
