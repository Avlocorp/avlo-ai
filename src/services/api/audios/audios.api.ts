import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config, { ACCESS_TOKEN_KEY } from "config";
import storage from "services/storage";
import { OperatorAudiosList, PhoneNumbers } from "./audios.types";
// import { TranslationResponse } from "./translation.types";

export const audiosApi = createApi({
  reducerPath: "audiosApi",
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
    getOperatorAudios: builder.query<
      OperatorAudiosList,
      { operatorId: number; page: number }
    >({
      query: ({ operatorId, page }) => ({
        url: "/api/company/audios/",
        params: {
          //   sort: "-file_upload_date",
          "filter[operator_id]": operatorId,
          page,
          include: "operator",
        },
      }),
    }),
    getClientsByPhoneNumber: builder.query<PhoneNumbers, { page: number }>({
      query: ({ page }) => ({
        url: "/api/company/audios/phone/",
        params: {
          page,
        },
      }),
    }),
    analyzeAudio: builder.mutation<void, string>({
      query: (ids) => ({
        url: `/api/company/analyse/`,
        method: "POST",
        body: {
          audios: ids,
        },
      }),
    }),
    getSingleAudio: builder.query<OperatorAudiosList, string>({
      query: (id) => ({
        url: `/api/company/audios/`,
        params: {
          "filter[id]": id,
          include: "operator",
        },
      }),
    }),
    downloadAudio: builder.query<string, string>({
      query: (id) => ({
        url: `/api/company/audios/pdf/${id}/`,
      }),
    }),
    refreshAudios: builder.mutation<void, void>({
      query: () => ({
        url: "/api/company/audios/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetClientsByPhoneNumberQuery,
  useRefreshAudiosMutation,
  useGetOperatorAudiosQuery,
  useAnalyzeAudioMutation,
  useGetSingleAudioQuery,
  useDownloadAudioQuery,
} = audiosApi;
