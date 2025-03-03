import { ResponseDataWithPagination } from "constants/api.types";

export type OperatorAudiosList = ResponseDataWithPagination<OperatorAudio>;

export interface OperatorAudio {
  id: number;
  operator_id: number;
  name: string;
  audio_id: string;
  download_link: string;
  detail_link: string;
  size: string;
  file_upload_date: string;
  created_at: string;
  updated_at: string;
}
