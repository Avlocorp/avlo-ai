export interface LeadList {
  result: Lead[];
  next: number;
  total: number;
  time: Time;
}

export interface Lead {
  ID: string;
  TITLE: string;
  STATUS_ID: string;
  ASSIGNED_BY_ID: string;
  DATE_CREATE: string;
  UF_CRM_1742461360163: unknown;
  UF_CRM_1742461541159: unknown;
  assigned_by: AssignedBy;
  status: string;
  created_at: string;
  lead_score: unknown[];
  description: unknown;
}

export interface AssignedBy {
  name: string;
  last_name: string;
  photo?: string;
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
