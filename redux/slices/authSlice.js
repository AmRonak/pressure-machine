import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: ((state, action) => {
      state.isAuthenticated = true;
      localStorage.setItem('auth', JSON.stringify({isAuthenticated: true}))
    }),
    resetAuth: ((state) => {
      state.isAuthenticated = false;
      localStorage.setItem('auth', JSON.stringify({isAuthenticated: false}))
    })
  },
});

export const { setAuth, resetAuth } = authSlice.actions;

export default authSlice.reducer;
