import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN_KEY } from "config";
import storage from "services/storage";
import type { StatisticsResponse } from "./statistics.type";

export const statisticsApi = createApi({
  reducerPath: "statisticsApi",
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
    // 📊 Statistika olish
    getStatisticsResponse: builder.mutation<
      StatisticsResponse,
      { start_date?: string; end_date?: string; operators?: string }
    >({
      query: ({ start_date, end_date, operators }) => ({
        url: "api/stats/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          start_date,
          end_date,
          ...(operators && { operators }),
        },
      }),
    }),

    // 📄 Oddiy PDF yuklash
    getStatisticsPdf: builder.mutation<
      Blob,
      { start_date?: string; end_date?: string; operators?: string }
    >({
      query: ({ start_date, end_date, operators }) => ({
        url: "api/stats/pdf/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          start_date,
          end_date,
          ...(operators && { operators }),
        },
        responseHandler: (response) => response.blob(),
      }),
    }),

    // 📤 Tayyor statistik JSON'ni yuborib PDF olish
    sendStatisticsJson: builder.mutation<
      Blob,
      { statistics_data: StatisticsResponse }
    >({
      query: ({ statistics_data }) => ({
        url: "api/stats/pdf/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(statistics_data),
        responseHandler: async (response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const contentType = response.headers.get("content-type");

          if (contentType?.includes("application/pdf")) {
            return response.blob();
          } else {
            const text = await response.text();
            try {
              const json = JSON.parse(text);
              throw new Error(
                json.message || "Server returned non-PDF response"
              );
            } catch {
              throw new Error("Invalid response format");
            }
          }
        },
      }),
    }),
  }),
});

export const {
  useGetStatisticsResponseMutation,
  useGetStatisticsPdfMutation,
  useSendStatisticsJsonMutation,
} = statisticsApi;
