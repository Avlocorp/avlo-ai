import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config, { ACCESS_TOKEN_KEY } from "config";
import storage from "services/storage";
import { TranslationResponse } from "./translation.types";

export const translationApi = createApi({
  reducerPath: "translationApi",
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
    getAllTranslations: builder.query<
      TranslationResponse,
      { search: string; page: number }
    >({
      query: ({ search, page }) => ({
        url: "/api/translate/admin/?search=" + search + "&page=" + page,
      }),
    }),
    changeTranslation: builder.mutation<
      unknown,
      { langCode: string; key: string; value: string }
    >({
      query: ({ langCode, key, value }) => ({
        url: `/api/translate/${langCode}`,
        method: "post",
        body: { [key]: value },
      }),
    }),
  }),
});

export const { useGetAllTranslationsQuery, useChangeTranslationMutation } =
  translationApi;
