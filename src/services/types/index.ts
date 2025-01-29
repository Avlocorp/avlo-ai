export type TParams = {
  fields?: object[];
  include?: string | string[];
  append?: string | string[];
  limit?: number;
  sort?: string | null;
  filter?: {
    [key: string]: number | string | boolean | [] | object | undefined | null;
  };
  page?: number | undefined | null;
  extra?: {
    [key: string]: number | string | boolean | [] | object | undefined | null;
  };
};

export type TMeta = {
  currentPage: number;
  pageCount: number;
  perPage: number;
  totalCount: number;
};

export type TMethod = "post" | "put" | "delete" | "patch" | "get";
export type TObject = Record<string, unknown>;
