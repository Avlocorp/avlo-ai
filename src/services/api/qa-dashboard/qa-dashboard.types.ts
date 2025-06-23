// Checklist modelining yagona itemi
export interface ChecklistResponse {
  id: number;
  name: string;
  description: string;
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

export interface ChecklistStatus {
  id: string;
  name: string;
  checklist_name: string;
  checklist_description: string;
  checklist_id: string;
}

export interface StatusListResponse {
  data: ChecklistStatus[];
  total: number;
}

export interface ChecklistModalsProps {
  className?: string;
}
export interface Checklist {
  id: string;
  name: string;
  description: string;
  complianceRate: number;
  criteriaCount: number;
  assignedStages: string[];
}

export interface ChecklistDashboardProps {
  className?: string;
}

export interface Criteria {
  id: number;
  text: string;
  results: {
    positive: number;
    negative: number;
    neutral: number;
    positive_percentage: number;
    negative_percentage: number;
    neutral_percentage: number;
  };
}

export interface MetricsResponse {
  criterias: Criteria[];
}
