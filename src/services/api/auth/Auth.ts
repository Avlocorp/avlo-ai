import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import storage from "services/storage";
import { LoginResponse } from "./Auth.types";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "config";

const initialState: Partial<LoginResponse> = {
  access: storage.get(ACCESS_TOKEN_KEY) || undefined,
  refresh: storage.get(REFRESH_TOKEN_KEY) || undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<LoginResponse>) => {
      const { refresh, access } = action.payload;
      state.access = access;
      state.refresh = refresh;
      storage.set(ACCESS_TOKEN_KEY, access);
      storage.set(REFRESH_TOKEN_KEY, refresh);
    },
  },
});

// Action creators are generated for each case reducer function
export const { logIn } = authSlice.actions;

export default authSlice.reducer;
