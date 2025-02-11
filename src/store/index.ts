import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "services/api/auth/Auth.api";
import { homeApi } from "services/api/home";
export const store = configureStore({
  reducer: {
    auth: authApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(homeApi.middleware)
      .concat(authApi.middleware), // ✅ `authApi.middleware` ham qo‘shildi
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
