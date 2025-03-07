import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN_KEY } from "config";
import storage from "services/storage";
import { HistoryList } from "./history.types";

export const historyApi = createApi({
  reducerPath: "historyApi",
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
    getHistoryList: builder.query<
      HistoryList,
      { page: number; until: string; from: string; search: string }
    >({
      query: ({ page, until, from, search }) => ({
        url: `api/company/history/`,
        params: {
          page,
          field: "created_at",
          sort: "-created_at",
          until,
          from,
          search,
        },
      }),
    }),
  }),
});

export const { useGetHistoryListQuery } = historyApi;
