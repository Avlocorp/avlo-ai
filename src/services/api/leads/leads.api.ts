import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config, { ACCESS_TOKEN_KEY } from "config";
import storage from "services/storage";
import type {
  Lead,
  LeadsListResponse,
  DealsListResponse,
  LeadsQueryParams,
  DealsQueryParams,
  LeadsNewQueryParams,
  ResponseNewLeads,
  ResponseDetailLead,
} from "./leads.types";

export const leadsApi = createApi({
  reducerPath: "leadsApi",
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
  tagTypes: ["Lead", "Deal"],
  endpoints: (builder) => ({
    getLeadsList: builder.query<LeadsListResponse, LeadsQueryParams>({
      query: ({
        page,
        search,
        limit = 50,
        status_id,
        responsible_user_id,
      }) => ({
        url: "/api/leads/",
        params: {
          page,
          limit,
          ...(search && { search }),
          ...(status_id && { status_id }),
          ...(responsible_user_id && { responsible_user_id }),
        },
      }),
      providesTags: ["Lead"],
      transformResponse: (response: any): LeadsListResponse => {
        if (Array.isArray(response)) {
          return {
            result: response,
            total: response?.length,
            next: null,
            time: defaultTime(),
          };
        }
        return {
          result: response.result || response.data || [],
          total: response.total || response.count || 0,
          next: response.next || null,
          time: response.time || defaultTime(),
        };
      },
    }),

    getLeadsListNew: builder.query<ResponseNewLeads, LeadsNewQueryParams>({
      query: ({
        page,
        search,
        limit = 50,
        status_id,
        responsible_user_id,
        operator_id,
        from,
        until,
        sort,
        analysed,
        field = "created_date",
      }) => ({
        url: "/api/stats/",
        method: "POST",
        params: {
          page,
          per_page: limit, // ✅ chunki sizda `per_page` ishlatiladi
          ...(search && { search }),
          ...(operator_id && { "filter[operator_id]": operator_id }),
          ...(status_id && { "filter[status_id]": status_id }),
          ...(responsible_user_id && { responsible_user_id }),
          ...(from && { from }),
          ...(until && { until }),
          ...(field && { field }),
          ...(analysed && { analysed }),
          ...(sort && { sort }),

          include: "operator",
        },
      }),
      providesTags: ["Lead"],
      transformResponse: (response: any): ResponseNewLeads => {
        return {
          all_data: response.all_data,
          page: response.page,
          per_page: response.per_page,
          data: response.data || [],
          last_page: response.last_page,
          next_page_url: response.next_page_url,
          prev_page_url: response.prev_page_url,
          foreignKeys: response.foreignKeys || [],
          from: response.from,
          to: response.to,
          sort: response.sort || [],
        };
      },
    }),
    getDetailLead: builder.query<ResponseDetailLead, { leadId: number }>({
      query: ({ leadId }) => `/api/stats/${leadId}`,
      providesTags: (_result, _error, { leadId }) => [
        { type: "Lead", id: leadId },
      ],
    }),

    getDealsList: builder.query<DealsListResponse, DealsQueryParams>({
      query: ({ page, search, limit = 50, status_id }) => ({
        url: "/api/deals/",
        params: {
          page,
          limit,
          ...(search && { search }),
          ...(status_id && { status_id }),
        },
      }),
      providesTags: ["Deal"],
      transformResponse: (response: any): DealsListResponse => {
        if (Array.isArray(response)) {
          return {
            result: response,
            total: response?.length,
            next: null,
            time: defaultTime(),
          };
        }
        return {
          result: response.result || response.data || [],
          total: response.total || response.count || 0,
          next: response.next || null,
          time: response.time || defaultTime(),
        };
      },
    }),

    getLeadById: builder.query<Lead, { leadId: number }>({
      query: ({ leadId }) => `/api/leads/${leadId}/`,
      providesTags: (_result, _error, { leadId }) => [
        { type: "Lead", id: leadId },
      ],
    }),

    updateLead: builder.mutation<Lead, { leadId: number; data: Partial<Lead> }>(
      {
        query: ({ leadId, data }) => ({
          url: `/api/leads/${leadId}/`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: (_result, _error, { leadId }) => [
          { type: "Lead", id: leadId },
          "Lead",
        ],
      }
    ),

    deleteLead: builder.mutation<void, { leadId: number }>({
      query: ({ leadId }) => ({
        url: `/api/leads/${leadId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lead"],
    }),

    getSingleStatus: builder.query<any, { statusId: number }>({
      query: ({ statusId }) => ({
        url: `/api/stats/crm-statuses/`,
        params: {
          "filter[code]": statusId,
        },
      }),
    }),

    getLeadAnalysis: builder.query<any, number>({
      query: (leadId) => ({
        url: `/api/leads/analyse/${leadId}`,
        // {{url}}/api/leads/analyse/19659
      }),
    }),
  }),
});

// 📝 Default time generator
const defaultTime = () => ({
  start: Date.now(),
  finish: Date.now(),
  duration: 0,
  processing: 0,
  date_start: new Date().toISOString(),
  date_finish: new Date().toISOString(),
  operating_reset_at: 0,
  operating: 0,
});

export const {
  useGetLeadsListQuery,
  useGetDealsListQuery,
  useGetLeadByIdQuery,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
  useGetSingleStatusQuery,
  useGetLeadsListNewQuery,
  useLazyGetLeadAnalysisQuery,
  useGetDetailLeadQuery,
} = leadsApi;
