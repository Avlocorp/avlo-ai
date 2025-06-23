import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config, { ACCESS_TOKEN_KEY } from "config";
import storage from "services/storage";
import {
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
    }),

    // ✅ Get Checklist List
    getCheckList: builder.query<ResponseCheckList, void>({
      query: () => ({
        url: "/api/stats/checklists/",
      }),
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
    }),

    // ✅ Delete Checklist
    deleteChecklist: builder.mutation<void, { checklist_id: number }>({
      query: ({ checklist_id }) => ({
        url: `/api/stats/checklists/${checklist_id}/`,
        method: "DELETE",
      }),
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
    }),

    // ✅ Delete Criterion
    deleteCriteria: builder.mutation<void, { criteria_id: number }>({
      query: ({ criteria_id }) => ({
        url: `/api/stats/criteria/${criteria_id}/`,
        method: "DELETE",
      }),
    }),

    getAllCheckList: builder.query<ResponseCheckList, {}>({
      query: ({}) => ({
        url: "/api/stats/checklists/",
      }),
    }),

    getMetrics: builder.query<
      MetricsResponse,
      {
        checklist_id?: number;
        operator_id?: number;
      }
    >({
      query: ({ checklist_id, operator_id }) => {
        let url = `api/stats/checklist_check/?checklist_id=${checklist_id}`;
        if (operator_id !== undefined) {
          url += `&operator_id=${operator_id}`;
        }
        return {
          url,
          method: "GET",
        };
      },
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
} = qadashboardApi;
