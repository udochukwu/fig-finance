import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  authIsReady: 'false',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
    },
    authIsReady: (state, action) => {
      state.authIsReady = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout, authIsReady } = authSlice.actions;
export default authSlice.reducer;
