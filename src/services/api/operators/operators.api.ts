import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ACCESS_TOKEN_KEY } from "config";
import storage from "services/storage";
import { OperatorsList } from "./operators.types";

export const operatorsApi = createApi({
  reducerPath: "operatorsApi",
  baseQuery: async (args, api, extraOptions) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000); // 30 seconds

    try {
      return await fetchBaseQuery({
        baseUrl: import.meta.env.VITE_ROOT_API || "",
        prepareHeaders: (headers) => {
          const access = storage.get(ACCESS_TOKEN_KEY);
          if (access) {
            headers.set("Authorization", `Bearer ${access}`);
          }
          return headers;
        },
      })({ ...args, signal: controller.signal }, api, extraOptions);
    } finally {
      clearTimeout(timeout);
    }
  },
  endpoints: (builder) => ({
    syncOperators: builder.query<{ success: boolean }, void>({
      query: () => ({
        url: `api/company/operators/reload/`,
      }),
    }),
    getOperators: builder.query<OperatorsList, number>({
      query: (page) => ({
        url: `api/company/operators/`,
        params: {
          page,
        },
      }),
    }),
  }),
});

export const { useSyncOperatorsQuery, useLazyGetOperatorsQuery } = operatorsApi;
