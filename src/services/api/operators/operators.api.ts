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
        timeout: 60000,
      }),
    }),
    getOperators: builder.query<
      OperatorsList,
      { page: number; search: string }
    >({
      query: ({ page, search }) => ({
        url: `api/company/operators/`,
        params: {
          page,
          search,
        },
        timeout: 60000,
      }),
    }),
    getSingleOperator: builder.query<OperatorsList, { operatorId: number }>({
      query: ({ operatorId }) => ({
        url: `api/company/operators/`,
        params: {
          "filter[id]": operatorId,
        },
        timeout: 60000,
      }),
    }),
    getOperatorsStatistics: builder.query<
      OperatorsList,
      {
        page: number;
        search: string;
        reversed: boolean;
        from?: string;
        until?: string;
      }
    >({
      query: ({ page, search, reversed, from, until }) => ({
        url: `api/company/operators/statistics/`,
        params: {
          page,
          search,
          reversed,
          from,
          until,
        },
        timeout: 60000,
      }),
    }),
  }),
});

export const {
  useGetOperatorsStatisticsQuery,
  useSyncOperatorsQuery,
  useGetOperatorsQuery,
  useLazyGetOperatorsQuery,
  useGetSingleOperatorQuery,
} = operatorsApi;
