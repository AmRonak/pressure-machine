import { JWT_TOKEN_NAME } from "@/constants/constants";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = { isAuthenticated: false, userDetail: {}, companyName: '' };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
    setAuth: ((state, action) => {
      state.isAuthenticated = true;
      sessionStorage.setItem(JWT_TOKEN_NAME, action.payload);
    }),
    resetAuth: ((state) => {
      sessionStorage.removeItem(JWT_TOKEN_NAME);
      state.isAuthenticated = false;
      state.userDetail = {};
    }),
    setCompanyName: ((state, action) => {
      state.companyName = action.payload
    })
  },
});

export const { setAuth, resetAuth, setUserDetail, setCompanyName } = authSlice.actions;

export const useAuthSelector = () => useSelector(state => state.auth);

export default authSlice.reducer;
