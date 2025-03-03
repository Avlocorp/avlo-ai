export interface ResponseDataWithPagination<T> {
  all_data: number;
  page: number;
  per_page: number;
  data: T[];
  last_page: number;
  next_page_url: string;
  prev_page_url: string;
  foreignKeys: string[];
  from: number;
  to: number;
}
