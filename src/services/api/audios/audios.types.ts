import { ResponseDataWithPagination } from "constants/api.types";
import { AverageScore, Operator } from "../operators/operators.types";
import { AIResponse } from "../home/home.type";

export type OperatorAudiosList = ResponseDataWithPagination<OperatorAudio>;

export interface PhoneNumbers {
  all_data: number;
  page: number;
  per_page: number;
  last_page: number;
  next_page_url: string;
  prev_page_url: string;
  from: number;
  to: number;
  data: {
    [key: string]: {
      all_calls: number;
      analysed_calls: AverageScore;
    };
  };
}

export interface OperatorAudio {
  id: number;
  analysed: boolean;
  analysed_data: AIResponse;
  operator_id: number;
  name: string;
  audio_id: string;
  download_link: string;
  detail_link: string;
  size: string;
  file_upload_date: string;
  created_at: string;
  updated_at: string;
  operator: Operator;
}
export interface CustomerInfo {
  all_data: number;
  page: number;
  per_page: number;
  last_page: number;
  next_page_url: string;
  prev_page_url: string;
  from: number;
  to: number;
  data: CustomerData[];
}

export interface CustomerData {
  all_calls: number;
  analysed_calls: AnalysedCalls;
  phone: string;
}

export interface AnalysedCalls {
  overall_performance_score: number;
  communication_skills_score: number;
  problem_handling_score: number;
  customer_management_score: number;
  protocol_adherence_score: number;
  successfully_calls: number;
  unsuccessfully_calls: number;
  total_calls: number;
}
