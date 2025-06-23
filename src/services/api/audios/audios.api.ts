import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config, { ACCESS_TOKEN_KEY } from "config";
import storage from "services/storage";
import {
  ClientsHistory,
  CustomerInfo,
  OperatorAudiosList,
} from "./audios.types";
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
        url: "/api/audios/",
        params: {
          "filter[operator_id]": operatorId,
          page,
          include: "operator",
        },
      }),
    }),

    getClientsByPhoneNumber: builder.query<ClientsHistory, { phone: string }>({
      query: ({ phone }) => ({
        url: "/api/audios/phonelist/",
        params: {
          phone,
          include: "operator",
        },
      }),
    }),

    getClientsInfo: builder.query<CustomerInfo, { id: number; page: number }>({
      query: ({ id, page }) => ({
        url: `/api/audios/phone/${id}/`,
        params: {
          page,
        },
      }),
    }),

    analyzeAudio: builder.mutation<void, string>({
      query: (ids) => ({
        url: `/api/analyse/`,
        method: "POST",
        body: {
          audios: ids,
        },
      }),
    }),
    getSingleAudio: builder.query<OperatorAudiosList, string>({
      query: (id) => ({
        url: `/api/audios/`,
        params: {
          "filter[id]": id,
          include: "operator",
        },
      }),
    }),
    downloadAudio: builder.query<string, string>({
      query: (id) => ({
        url: `/api/audios/pdf/${id}/`,
      }),
    }),
    refreshAudios: builder.mutation<void, void>({
      query: () => ({
        url: "/api/audios/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetClientsByPhoneNumberQuery,
  useRefreshAudiosMutation,
  useGetClientsInfoQuery,
  useGetOperatorAudiosQuery,
  useAnalyzeAudioMutation,
  useGetSingleAudioQuery,
  useDownloadAudioQuery,
} = audiosApi;
