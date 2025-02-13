import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "services/api/auth/Auth.api";
import { homeApi } from "services/api/home";
import AuthReducer from "services/api/auth/Auth";
import { translationApi } from "services/api/localization";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [translationApi.reducerPath]: translationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(homeApi.middleware)
      .concat(translationApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
