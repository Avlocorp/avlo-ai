import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "services/api/auth/Auth.api";
import { homeApi } from "services/api/home";
import AuthReducer from "services/api/auth/Auth";
import { translationApi } from "services/api/localization";
import { settingsApi } from "services/api/settings";
import { operatorsApi } from "services/api/operators/operators.api";
import { audiosApi } from "services/api/audios/audios.api";
import { apiErrorMiddleware } from "services/middlewares/apiMiddleware/middleware";
import { historyApi } from "services/api/history/history.api";
import { leadsApi } from "services/api/leads/leads.api";
import { qadashboardApi } from "services/api/qa-dashboard/qa-dshboard.api";
import { statisticsApi } from "services/api/statistics/statistics.api";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [operatorsApi.reducerPath]: operatorsApi.reducer,
    [audiosApi.reducerPath]: audiosApi.reducer,
    [translationApi.reducerPath]: translationApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
    [leadsApi.reducerPath]: leadsApi.reducer,
    [qadashboardApi.reducerPath]: qadashboardApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(homeApi.middleware)
      .concat(translationApi.middleware)
      .concat(authApi.middleware)
      .concat(operatorsApi.middleware)
      .concat(audiosApi.middleware)
      .concat(settingsApi.middleware)
      .concat(historyApi.middleware)
      .concat(leadsApi.middleware)
      .concat(apiErrorMiddleware)
      .concat(qadashboardApi.middleware)
      .concat(statisticsApi.middleware), // Custom middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
