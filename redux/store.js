'use client';

import { configureStore  } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import devicesSlice from "./slices/devices";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    devices: devicesSlice
  },
})
