import { configureStore } from "@reduxjs/toolkit";
import { homeApi } from "services/api/home";

export const store = configureStore({
  reducer: {
    [homeApi.reducerPath]: homeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(homeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
