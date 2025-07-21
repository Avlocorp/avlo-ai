// qa-dashboard.api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config, { ACCESS_TOKEN_KEY } from "config";
import storage from "services/storage";
import type {
  AudioListResponse,
  ChecklistResponse,
  CriteriaListResponse,
  MetricsResponse,
  ResponseCheckList,
} from "./qa-dashboard.types";

export const qadashboardApi = createApi({
  reducerPath: "qadashboardApi",
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
  tagTypes: ["Checklist", "Criteria", "Metrics", "Status", "Audio"], // Added "Audio" tag type
  endpoints: (builder) => ({
    // ✅ Get Status List
    getStatusList: builder.query<
      ResponseCheckList,
      { search: string; page?: number; per_page?: number }
    >({
      query: ({ search, page = 1, per_page = 10 }) => ({
        url: "/api/stats/crm-statuses/",
        params: { search, page, per_page },
      }),
      providesTags: ["Status"],
    }),
    // ✅ Get Checklist List
    getCheckList: builder.query<ResponseCheckList, void>({
      query: () => ({
        url: "/api/stats/checklists/",
      }),
      providesTags: ["Checklist"],
    }),
    // ✅ Update Status
    updateStatus: builder.mutation<
      void,
      { statusId: number; checklist_id: number }
    >({
      query: ({ statusId, checklist_id }) => ({
        url: `/api/stats/crm-statuses/${statusId}/`,
        method: "PUT",
        body: { checklist_id },
      }),
      invalidatesTags: ["Status"],
    }),
    // ✅ Create Checklist
    createChechlist: builder.mutation<
      ChecklistResponse,
      { name: string; description: string }
    >({
      query: ({ name, description }) => ({
        url: "/api/stats/checklists/",
        method: "POST",
        body: { name, description },
      }),
      invalidatesTags: ["Checklist"],
    }),
    // ✅ Update Checklist
    updateChecklist: builder.mutation<
      void,
      { checklist_id: number; name: string; description: string }
    >({
      query: ({ checklist_id, name, description }) => ({
        url: `/api/stats/checklists/${checklist_id}/`,
        method: "PUT",
        body: { name, description },
      }),
      invalidatesTags: ["Checklist"],
    }),
    // ✅ Delete Checklist
    deleteChecklist: builder.mutation<void, { checklist_id: number }>({
      query: ({ checklist_id }) => ({
        url: `/api/stats/checklists/${checklist_id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Checklist", "Metrics"],
    }),
    // ✅ Create Criterion
    createCriteria: builder.mutation<
      void,
      { checklist_id: number; text: string }
    >({
      query: ({ checklist_id, text }) => ({
        url: `/api/stats/criteria/`,
        method: "POST",
        body: { checklist_id, text },
      }),
      invalidatesTags: ["Criteria", "Metrics"],
    }),
    // ✅ Get Criteria List
    getCriteriaList: builder.query<
      CriteriaListResponse,
      { checklist_id: number }
    >({
      query: ({ checklist_id }) => ({
        url: `/api/stats/checklists/${checklist_id}/criteria/`,
        method: "GET",
      }),
      providesTags: ["Criteria"],
    }),
    // ✅ Update Criterion
    updateCriteria: builder.mutation<
      void,
      { checklist_id: number; criteria_id: number; text: string }
    >({
      query: ({ checklist_id, criteria_id, text }) => ({
        url: `/api/stats/criteria/${criteria_id}/`,
        method: "PUT",
        body: { checklist_id, text },
      }),
      invalidatesTags: ["Criteria", "Metrics"],
    }),
    // ✅ Delete Criterion
    deleteCriteria: builder.mutation<void, { criteria_id: number }>({
      query: ({ criteria_id }) => ({
        url: `/api/stats/criteria/${criteria_id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Criteria", "Metrics"],
    }),
    // ✅ Get All Checklists
    getAllCheckList: builder.query<ResponseCheckList, {}>({
      query: () => ({
        url: "/api/stats/checklists/",
      }),
      providesTags: ["Checklist"],
    }),
    // ✅ Get Metrics with Date Range Support
    getMetrics: builder.query<
      MetricsResponse,
      {
        checklist_id?: number;
        operator_id?: number;
        start_date?: string;
        end_date?: string;
      }
    >({
      query: ({ checklist_id, operator_id, start_date, end_date }) => {
        const params = new URLSearchParams();
        if (checklist_id !== undefined) {
          params.append("checklist_id", checklist_id.toString());
        }
        if (operator_id !== undefined) {
          params.append("operator_id", operator_id.toString());
        }
        if (start_date) {
          params.append("start_date", start_date);
        }
        if (end_date) {
          params.append("end_date", end_date);
        }
        return {
          url: `api/stats/checklist_check/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Metrics"],
    }),
    // ✅ Get Audio List with Pagination and Filters
    getAudioList: builder.query<
      AudioListResponse,
      {
        checklist_id: number;
        start_date: string;
        end_date: string;
        operator_id?: number;
        page?: number; // Added page parameter
        per_page?: number; // Added per_page parameter
      }
    >({
      query: ({ page = 1, per_page = 10 }) => {
        const params = new URLSearchParams();

        params.append("page", page.toString()); // Append page
        params.append("per_page", per_page.toString()); // Append per_page
        return {
          url: `/api/audios/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Audio"], // Changed to "Audio" tag
    }),
  }),
});

export const {
  useGetStatusListQuery,
  useCreateChechlistMutation,
  useGetCheckListQuery,
  useGetCriteriaListQuery,
  useUpdateStatusMutation,
  useCreateCriteriaMutation,
  useDeleteChecklistMutation,
  useUpdateChecklistMutation,
  useUpdateCriteriaMutation,
  useDeleteCriteriaMutation,
  useGetAllCheckListQuery,
  useGetMetricsQuery,
  useGetAudioListQuery,
} = qadashboardApi;
