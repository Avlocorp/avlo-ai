import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import storage from "services/storage";
import { LoginResponse } from "./Auth.types";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "config";

const initialState: Partial<LoginResponse> = {
  access: storage.get(ACCESS_TOKEN_KEY) || undefined,
  refresh: storage.get(REFRESH_TOKEN_KEY) || undefined,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<LoginResponse>) => {
      const { refresh, access } = action.payload;
      state.access = access;
      state.refresh = refresh;
      state.isAuthenticated = true;
      storage.set(ACCESS_TOKEN_KEY, access);
      storage.set(REFRESH_TOKEN_KEY, refresh);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.access = undefined;
      state.refresh = undefined;
      storage.remove(ACCESS_TOKEN_KEY);
      storage.remove(REFRESH_TOKEN_KEY);
    },
    setUserState: (state, action: PayloadAction<Partial<LoginResponse>>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logout, setUserState } = authSlice.actions;

export default authSlice.reducer;
