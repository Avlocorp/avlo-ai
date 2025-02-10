import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LoginFormFields, LoginResponse } from "./Auth.types";
import storage from "services/storage";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth", "get-me"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ROOT_API || "",
    prepareHeaders(headers) {
      const token = storage.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginFormFields>({
      query: (loginValues) => ({
        url: "/api/token",
        method: "POST",
        body: loginValues,
      }),
      invalidatesTags: ["Auth", "get-me"],
    }),
  }),
});

// ✅ Faqat API uchun `useLoginMutation` ni eksport qilamiz
export const { useLoginMutation } = authApi;
