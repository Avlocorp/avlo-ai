import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import storage from "services/storage";
import config, { ACCESS_TOKEN_KEY } from "config";
import {
  LoginResponse,
  LoginResponseSuccess,
  RegistrResponse,
  RegistrResponseSuccess,
  ResponseError,
} from "./Auth.types";
export const authApi = createApi({
  reducerPath: "authApi",
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
    login: builder.mutation<LoginResponseSuccess, LoginResponse>({
      query: (formValues) => {
        return { url: "/api/token/", method: "POST", body: formValues };
      },
      transformErrorResponse: (response) => {
        return response.data as ResponseError;
      },
    }),
    registr: builder.mutation<RegistrResponseSuccess, RegistrResponse>({
      query: (formValues) => {
        return { url: "/api/register/", method: "POST", body: formValues };
      },
      transformErrorResponse: (response) => {
        return response.data as ResponseError;
      },
    }),
    verifyBitrixAccount: builder.query<
      void,
      { code: string; url: string; member_id: string }
    >({
      query: ({ code, url, member_id }) => {
        return {
          url: "/api/bitrix/authorise/",
          method: "GET",
          params: { code, url, member_id },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrMutation,
  useVerifyBitrixAccountQuery,
} = authApi;
