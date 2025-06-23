import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type {
  AIResponse,
  DashboardStatistics,
  TotalDuration,
} from "./home.type";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "config";
import storage from "services/storage";
import { setUserState } from "../auth";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_ROOT_API || "",
  prepareHeaders: (headers) => {
    const access = storage.get(ACCESS_TOKEN_KEY);
    if (access) {
      headers.set("Authorization", `Bearer ${access}`);
    }
    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const errorData = result.error.data as { message?: string };
    if (errorData?.message === "Your token is expired") {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      api.dispatch(setUserState({ isAuthenticated: false }));
    }
  }

  return result;
};

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getAIResponse: builder.mutation<
      AIResponse,
      { message: string; audio?: File }
    >({
      query: ({ message, audio }) => {
        const formData = new FormData();
        if (audio) {
          formData.append("file", audio);
        }
        return {
          url: `api/analysis/?custom_prompt=${encodeURIComponent(message)}`,
          method: "POST",
          body: audio ? formData : undefined,
        };
      },
    }),
    getStatistics: builder.query<DashboardStatistics, void>({
      query: () => "api/dashboard/",
    }),
    getTotalTalkTime: builder.query<
      TotalDuration,
      { start_date?: string; end_date?: string }
    >({
      query: ({ start_date, end_date }) => ({
        url: "api/dashboard/",
        method: "GET",
        params: { start_date, end_date },
      }),
    }),
  }),
});

export const {
  useGetAIResponseMutation,
  useGetStatisticsQuery,
  useGetTotalTalkTimeQuery,
} = homeApi;
