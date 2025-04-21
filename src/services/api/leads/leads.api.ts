import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config, { ACCESS_TOKEN_KEY } from "config";
import storage from "services/storage";
import { Lead } from "./leads.types";
// import { TranslationResponse } from "./translation.types";

export const leadsApi = createApi({
  reducerPath: "leadsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_ROOT,
    prepareHeaders(headers) {
      const access = storage.get(ACCESS_TOKEN_KEY);
      if (access) {
        headers.set("Authorization", `Bearer ${access}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLeadsList: builder.query<Lead[], { page: number; search: string }>({
      query: ({ page, search }) => ({
        url: "/api/leads/",
        params: {
          page,
          search: search || undefined,
        },
      }),
    }),
  }),
});

export const { useGetLeadsListQuery } = leadsApi;
