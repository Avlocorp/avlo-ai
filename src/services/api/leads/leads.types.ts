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

// Main Lead interface (consolidated and consistent)
export interface Lead {
  id: number;
  name: string;
  price?: number;
  responsible_user_id?: number;
  group_id?: number;
  status_id: number;
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

  // Custom fields - simplified type
  custom_fields_values?: CustomFieldValue[] | null;

  // Embedded data
  embedded?: Embedded;
}

// Custom field types for better type safety
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
  status_id?: number;
  responsible_user_id?: number;
}

export interface DealsQueryParams {
  page: number;
  search?: string;
  limit?: number;
  status_id?: number;
}
