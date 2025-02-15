import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ACCESS_TOKEN_KEY } from "config";
import storage from "services/storage";
import { SettingsResponse } from "./settings.types";

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ROOT_API || "",
    prepareHeaders: (headers) => {
      const access = storage.get(ACCESS_TOKEN_KEY);
      if (access) {
        headers.set("Authorization", `Bearer ${access}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSettingResponse: builder.mutation<SettingsResponse, { url: string }>({
      query: ({ url }) => ({
        url: `api/bitrix/url/?url=${encodeURIComponent(url)}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSettingResponseMutation } = settingsApi;
