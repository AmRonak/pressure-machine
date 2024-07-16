import { JWT_TOKEN_NAME } from "@/constants/constants";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = { isAuthenticated: false, userDetail: {} };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
    setAuth: ((state, action) => {
      state.isAuthenticated = true;
      localStorage.setItem(JWT_TOKEN_NAME, action.payload);
    }),
    resetAuth: ((state) => {
      localStorage.removeItem(JWT_TOKEN_NAME);
      state.isAuthenticated = false;
      state.userDetail = {};
    })
  },
});

export const { setAuth, resetAuth, setUserDetail } = authSlice.actions;

export const useAuthSelector = () => useSelector(state => state.auth);

export default authSlice.reducer;
