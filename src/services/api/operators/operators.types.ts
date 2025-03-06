import { ResponseDataWithPagination } from "constants/api.types";

// export OperatorsList
export type OperatorsList = ResponseDataWithPagination<Operator>;

export interface Operator {
  id: number;
  name: string;
  all_calls: number;
  avarege_score: AverageScore;
  last_name: string;
  second_name?: string;
  email: string;
  photo?: string;
  birthday?: string;
  operator_id: string;
  user_type: string;
  mobile_phone?: string;
  work_position?: string;
  uf_phone_inner?: string;
  company_id: number;
  created_at: string;
  updated_at: string;
}

export type AverageScore = {
  overall_performance_score: number;
  communication_skills_score: number;
  problem_handling_score: number;
  customer_management_score: number;
  protocol_adherence_score: number;
  successfully_calls: number;
  unsuccessfully_calls: number;
};
