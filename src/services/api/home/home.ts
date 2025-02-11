import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AIResponse } from "./home.type";
import { ACCESS_TOKEN_KEY } from "config";
import storage from "services/storage";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ROOT_API || "",
    prepareHeaders: (headers) => {
      const access = storage.get(ACCESS_TOKEN_KEY);
      console.log(access);
      headers.set("Authorization", `Bearer ${access}`);
      return headers;
    },
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
          url: `api/analysis/?custom_prompt=${encodeURIComponent(message)}`,
          method: "POST",
          body: audio ? formData : undefined,
        };
      },
    }),
  }),
});

export const { useGetAIResponseMutation } = homeApi;
