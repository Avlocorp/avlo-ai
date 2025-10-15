// settings.types.ts

export interface Operator {
  id: number;
  name: string;
  last_name: string;
  second_name: string;
  email: string;
  photo: string | null;
  birthday: string;
  operator_id: string;
  user_type: string | null;
  mobile_phone: string | null;
  work_position: string;
  uf_phone_inner: string | null;
  company_id: number;
  created_at: string;
  updated_at: string;
  all_calls: number;
  avarege_score: AverageScore;
}

export interface AverageScore {
  overall_performance_score: number;
  communication_skills_score: number;
  problem_handling_score: number;
  customer_management_score: number;
  protocol_adherence_score: number;
  successfully_calls: number;
  unsuccessfully_calls: number;
}

export interface SettingsResponse {
  all_data: number;
  page: number;
  per_page: number;
  data: Operator[];
  last_page: number;
  next_page_url: string;
  prev_page_url: string;
  foreignKeys: string[];
  from: number;
  to: number;
}

export interface OperatorDetailResponse {
  id: number;
  operator_id: string;
  name: string;
  last_name: string;
  second_name: any;
  email: string;
  birthday: any;
  user_type: string;
  work_position: any;
  mobile_phone: any;
  uf_phone_inner: string;
  photo: any;
  company: Company;
  analysed_data: AnalysedData;
}

export interface Company {
  id: number;
  name: string;
}

export interface AnalysedData {
  top_strengths: string[];
  top_weaknesses: string[];
}
