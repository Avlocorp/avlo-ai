import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AIResponse } from "./home.type";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ROOT_API || "",
  }),
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
          url: `analyze/json?custom_prompt=${encodeURIComponent(message)}`,
          method: "POST",
          body: audio ? formData : undefined,
        };
      },
    }),
  }),
});

export const { useGetAIResponseMutation } = homeApi;
