export interface TranslationResponse {
  data: Text[];
  page: number;
  per_page: number;
  all_data: number;
  pages: number;
  this_page_url: string;
  next_page_url: string;
  prev_page_url: string;
  from: number;
  to: number;
  last_page: number;
}

export interface Text {
  key: string;
  id: number;
  uz: string;
  kg: string | null;
  tj: string | null;
  en: string | null;
  ru: string | null;
}
