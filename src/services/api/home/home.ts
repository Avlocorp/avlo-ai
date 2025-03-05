import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { AIResponse } from "./home.type";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "config";
import storage from "services/storage";
import { setUserState } from "../auth";

// Custom baseQuery with 401 handling
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_ROOT_API || "",
  prepareHeaders: (headers) => {
    const access = storage.get(ACCESS_TOKEN_KEY);
    headers.set("Authorization", `Bearer ${access}`);
    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Handle 401 error
  if (result.error && result.error.status === 401) {
    const errorData = result.error.data as { message?: string };
    if (errorData?.message === "Your token is expired") {
      // Clear the token
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      // Dispatch a Redux action to trigger logout
      // api.dispatch({ type: "authApi/logout" });
      api.dispatch(setUserState({ isAuthenticated: false }));
    }
  }

  return result;
};

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: baseQueryWithAuth,
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
