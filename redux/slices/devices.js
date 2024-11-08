import { useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOnlineDevicesUpdated: true,
  isLoading: false,
  isError: false,
  devices: [],
  onlineDevices: []
}

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setDevices: (state, action) => {
      state.devices = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setIsOnlineDevicesUpdated: (state, action) => {
      state.isOnlineDevicesUpdated = action.payload;
    },
    setOnlineDevices: (state, action) => {
      state.onlineDevices = action.payload;
    },
  }
});

export const { setDevices, setIsError, setIsLoading, setIsOnlineDevicesUpdated, setOnlineDevices } = devicesSlice.actions;

export const useDevicesSelector = () => useSelector(state => state.devices);

export default devicesSlice.reducer;
