import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN_KEY } from "config";
import storage from "services/storage";
import { OperatorDashboard, OperatorsList } from "./operators.types";

export const operatorsApi = createApi({
  reducerPath: "operatorsApi",
  baseQuery: async (args, api, extraOptions) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000); // 60 seconds

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
    // Operatorlarni qayta sync qilish
    syncOperators: builder.query<{ success: boolean }, void>({
      query: () => ({
        url: `api/operators/reload/`,
        timeout: 60000,
      }),
    }),

    // Operatorlar listini olish
    getOperators: builder.query<
      OperatorsList,
      { page: number; search: string }
    >({
      query: ({ page, search }) => ({
        url: `api/operators/`,
        params: {
          page,
          search,
        },
        timeout: 60000,
      }),
    }),

    // Bitta operatorni filter qilib olish
    getSingleOperator: builder.query<OperatorsList, { operatorId: number }>({
      query: ({ operatorId }) => ({
        url: `api/operators/`,
        params: {
          "filter[operator_id]": operatorId,
        },
        timeout: 60000,
      }),
    }),

    // Operatorlar statistikasini olish
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
        url: `api/operators/statistics/`,
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

    // Operator dashboard uchun umumiy ma'lumot
    getOperatorDashboard: builder.query<
      OperatorDashboard,
      { operatorId: number }
    >({
      query: ({ operatorId }) => ({
        url: `api/leads/price/?operator_id=${operatorId}`,
      }),
    }),

    // Barcha operatorlar uchun umumiy dashboard statistikasi
    getOperatorDashboardStatics: builder.query<OperatorDashboard, void>({
      query: () => ({
        url: `api/leads/price/`,
      }),
    }),
  }),
});

// Export qilish
export const {
  useSyncOperatorsQuery,
  useGetOperatorsQuery,
  useLazyGetOperatorsQuery,
  useGetSingleOperatorQuery,
  useGetOperatorsStatisticsQuery,
  useGetOperatorDashboardQuery,
  useGetOperatorDashboardStaticsQuery,
} = operatorsApi;
