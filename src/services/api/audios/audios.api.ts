import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config, { ACCESS_TOKEN_KEY } from "config";
import storage from "services/storage";
import { OperatorAudiosList } from "./audios.types";
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
        },
      }),
    }),
  }),
});

export const { useGetOperatorAudiosQuery } = audiosApi;
