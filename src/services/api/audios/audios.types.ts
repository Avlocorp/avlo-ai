import { ResponseDataWithPagination } from "constants/api.types";
import { Operator } from "../operators/operators.types";
import { AIResponse } from "../home/home.type";

export type OperatorAudiosList = ResponseDataWithPagination<OperatorAudio>;

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
