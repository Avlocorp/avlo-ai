// qa-dashboard.types.ts

// Checklist modelining yagona itemi
export interface ChecklistResponse {
  id: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

// CRM Status itemi
export interface StatusItem {
  id: number;
  code: string;
  name: string;
  description: string;
  checklist_id: number;
  created_at: string;
  checklist_name: string;
  checklist_description: string;
  criteria_count: number;
}

// Status list response (paginated)
export interface ResponseCheckList {
  all_data: number;
  page: number;
  per_page: number;
  data: StatusItem[];
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  foreignKeys: string[];
  from: number;
  to: number;
}

// Criteria item
export interface Criteria {
  id: number;
  checklist_id: number;
  text: string;
  checklist_name: string;
  checklist_description: string;
  created_at?: string;
  updated_at?: string;
}

// Criteria list response (paginated)
export interface CriteriaListResponse {
  all_data: number;
  page: number;
  per_page: number;
  data: Criteria[];
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  foreignKeys: string[];
  from: number;
  to: number;
}

// Checklist Status
export interface ChecklistStatus {
  id: string;
  name: string;
  checklist_name: string;
  checklist_description: string;
  checklist_id: string;
}

// Status List Response
export interface StatusListResponse {
  data: ChecklistStatus[];
  total: number;
}

// Component Props
export interface ChecklistModalsProps {
  className?: string;
}

export interface ChecklistDashboardProps {
  className?: string;
}

// Checklist for Dashboard
export interface Checklist {
  id: string;
  name: string;
  description: string;
  complianceRate: number;
  criteriaCount: number;
  assignedStages: string[];
}

// Criteria Results
export interface CriteriaResults {
  positive: number;
  negative: number;
  neutral: number;
  positive_percentage: number;
  negative_percentage: number;
  neutral_percentage: number;
}

// Criteria with Results
export interface CriteriaWithResults {
  id: number;
  text: string;
  results: CriteriaResults;
}

// Metrics Response
export interface MetricsResponse {
  criterias: CriteriaWithResults[];
  overall_compliance?: string;
  total_calls?: string;
  top_criterion?: {
    name: string;
    percentage: string;
  };
  summary?: {
    total_positive: number;
    total_negative: number;
    total_neutral: number;
    overall_compliance_rate: number;
  };
}

// API Error Response
export interface ApiError {
  message: string;
  status: number;
  details?: Record<string, any>;
}

// Date Range Type
export interface DateRange {
  start_date: string;
  end_date: string;
}

// Filter Parameters
export interface MetricsFilters {
  checklist_id?: number;
  operator_id?: number;
  start_date?: string;
  end_date?: string;
}
