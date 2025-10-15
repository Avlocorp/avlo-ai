// Base interfaces for API responses
export interface ApiResponse<T> {
  result: T[];
  next: number | null;
  total: number;
  time: Time;
}

export interface Time {
  start: number;
  finish: number;
  duration: number;
  processing: number;
  date_start: string;
  date_finish: string;
  operating_reset_at: number;
  operating: number;
}

// User/Assignment related interfaces
export interface AssignedBy {
  name: string;
  last_name: string;
  photo?: string;
}

export interface Tag {
  id: number;
  name: string;
  color?: string;
}

export interface Company {
  id: number;
  _links: {
    self: {
      href: string;
    };
  };
}

export interface Embedded {
  tags?: Tag[];
  companies?: Company[];
}

// Main Lead interface (amoCRM tarafidan keladigan leadlar)
export interface Lead {
  id: number;
  name: string;
  price?: number;
  responsible_user_id?: number;
  group_id?: number;
  status_id: string; // string bo‘lishi kerak
  pipeline_id?: number;
  loss_reason_id?: number;
  source_id?: number;
  created_by?: number;
  updated_by?: number;
  closed_at?: number;
  created_at: number;
  updated_at?: number;
  closest_task_at?: number;
  is_deleted?: boolean;
  score?: number;
  account_id?: number;

  // Computed/joined fields
  assigned_by?: AssignedBy;
  status?: string;

  // Custom fields
  custom_fields_values?: CustomFieldValue[] | null;

  // Embedded data
  embedded?: Embedded;
}

// Custom field types
export interface CustomFieldValue {
  field_id?: number;
  field_name?: string;
  field_code?: string;
  field_type?: string;
  values?: CustomFieldValueItem[];
}

export interface CustomFieldValueItem {
  value?: string | number;
  enum_id?: number;
  enum_code?: string;
}

// API response types
export interface LeadsListResponse extends ApiResponse<Lead> {}
export interface DealsListResponse extends ApiResponse<Lead> {}

// Query parameters
export interface LeadsQueryParams {
  page: number;
  search?: string;
  limit?: number;
  status_id?: string;
  responsible_user_id?: number;
}

export interface DealsQueryParams {
  page: number;
  search?: string;
  limit?: number;
  status_id?: string;
}

export interface LeadsNewQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status_id?: string;
  responsible_user_id?: number | string;
  operator_id?: number | string;
  from?: string; // YYYY-MM-DD format
  until?: string; // YYYY-MM-DD format
  field?: string; // masalan: "created_date"
  sort?: "created_date" | "-created_date";
  analysed?: "yes" | "no";
}

export interface Operator {
  id: number;
  name: string;
  last_name: string;
  second_name: string | null;
  email: string;
  photo: string | null;
  birthday: string | null;
  operator_id: string;
  user_type: string;
  mobile_phone: string | null;
  work_position: string | null;
  uf_phone_inner: string | null;
  company_id: number;
  created_at: string;
  updated_at: string;
}

export interface LeadNew {
  id: number;
  crm_id: number;
  created_date: string;
  updated_date: string;
  operator_id: number;
  status_id: string;
  first_call_date: string | null;
  first_success_call_date: string | null;
  first_call_is_success: boolean;
  connection: boolean;
  number_of_calls: number;
  number_of_success_calls: number;
  duration_of_all_calls: number;
  agreement_date: string | null;
  agreement_lost_date: string | null;
  operator: Operator;
}

export interface ResponseNewLeads {
  all_data: number;
  page: number;
  per_page: number;
  data: LeadNew[]; // ✅ asosiy list bu
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  foreignKeys: string[];
  from: number;
  to: number;
  sort: string; // yangi qo'shildi
}

export interface ResponseDetailLead {
  id: number;
  crm_id: number;
  created_date: string;
  updated_date: string;
  operator: Operator;
  status_id: string;
  first_call_date: string;
  first_success_call_date: string;
  first_call_is_success: boolean;
  connection: boolean;
  number_of_calls: number;
  number_of_success_calls: number;
  duration_of_all_calls: number;
  agreement_date: any;
  agreement_lost_date: any;
  analysed: boolean;
  analysed_data: AnalysedData;
  transcriptions: Transcription[][];
}

export interface Operator {
  id: number;
  name: string;
  last_name: string;
  company: string;
}

export interface AnalysedData {
  "Umumiy xulosa": string;
  "Checklist Table": ChecklistTable;
  "Xatolar va kamchiliklar (with timestamps)": XatolarVaKamchiliklarWithTimestamps[];
  "Operator uchun tavsiyalar": string[];
  "Xarid ehtimoli (%)": string;
  "Sotuvni yakunlash uchun nima qilish mumkin edi": string[];
  "Top 3 Strengths": string[];
  "Top 3 Weaknesses": string[];
  "Lead Class": string;
}

export interface ChecklistTable {
  Technique: string[];
  "✅/⚠/❌": string[];
  "Example & time": string[];
  "Depth & comments": string[];
  Recommendations: string[];
}

export interface XatolarVaKamchiliklarWithTimestamps {
  Texnika: string;
  "✅/❌": string;
  "Nima ishlatilgan (yoki ishlatilmagan)": string;
  Tavsiyalar: string;
}

export interface Transcription {
  speaker: string;
  text: string;
}
