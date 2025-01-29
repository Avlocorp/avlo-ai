// // Need to use the React-specific entry point to import createApi
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type {
//   LoginFormFields,
//   LoginResponse,
//   TGetMeResponse,
// } from "./Auth.types";
// // import config from "config";
// import storage from "services/storage";
// // import { getMe } from "store/auth";

// // Define a service using a base URL and expected endpoints
// export const authApi = createApi({
//   reducerPath: "authApi",
//   tagTypes: ["Auth", "get-me"],
//   baseQuery: fetchBaseQuery({
//     // baseUrl: config.API_ROOT,
//     prepareHeaders(headers) {
//       const token = storage.get("token");
//       headers.set("Authorization", `Bearer ${token}` as string);
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     login: builder.mutation<LoginResponse, LoginFormFields>({
//       query: (loginValues) => {
//         return {
//           url: "/oauth/sign-in",
//           method: "POST",
//           body: loginValues,
//         };
//       },
//       invalidatesTags: ["Auth", "get-me"],
//     }),
//     getMe: builder.query({
//       query: () => {
//         const token = storage.get("token");
//         return `/user/find-by-token?token=${token}`;
//       },
//       async onQueryStarted(_, { dispatch, queryFulfilled }) {
//         // `onStart` side-effect
//         try {
//           const { data } = await queryFulfilled;
//           const userData = (data as TGetMeResponse).user;
//           dispatch(
//             getMe({
//               email: userData.email,
//               isLoggedIn: "yes",
//               name: userData.name,
//               token: storage.get("token") as string,
//             })
//           );
//           // `onSuccess` side-effect
//         } catch (err) {
//           // `onError` side-effect
//         }
//       },
//       providesTags: ["Auth", "get-me"],
//     }),
//   }),
// });

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const { useLoginMutation, useGetMeQuery } = authApi;
