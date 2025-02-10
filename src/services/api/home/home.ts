import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AIResponse } from "./home.type";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ROOT_API || "",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5MjEyMzExLCJpYXQiOjE3MzkyMTA1MTEsImp0aSI6ImZjMmJhYmI3YWUyZDQ5NzA5MTUwZmJkNTk1YTI0NDEwIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiIn0.23G8NY1OTIUURWtBEnfL9NfyfIIOl9XnqAuKdCsN3No"
      );
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
          url: `analyze/json?custom_prompt=${encodeURIComponent(message)}`,
          method: "POST",
          body: audio ? formData : undefined,
        };
      },
    }),
  }),
});

export const { useGetAIResponseMutation } = homeApi;
