import { TParams } from "services/types";

const queryBuilder = (
  url: string,
  {
    fields = [],
    include = "",
    append = "",
    limit = 0,
    sort = "",
    filter = {},
    page = 1,
    extra = {},
  }: TParams = {}
): string => {
  const params = new URLSearchParams();

  // Handle `fields`
  if (fields?.length) {
    params.append("fields", fields.join(","));
  }

  // Handle `include`
  if (include) {
    params.append(
      "include",
      Array.isArray(include) ? include.join(",") : include
    );
  }

  // Handle `append`
  if (append) {
    params.append("append", Array.isArray(append) ? append.join(",") : append);
  }

  // Handle `limit` (per_page)
  if (limit > 0) {
    params.append("per_page", limit.toString());
  }

  // Handle `sort`
  if (sort) {
    params.append("sort", sort);
  }

  // Handle `filter`
  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(`filter[${key}]`, String(value));
    }
  });

  // Handle `extra`
  Object.entries(extra).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  // Handle `page`
  if (page && page > 1) {
    params.append("page", page.toString());
  }

  // Build and return the final URL
  return `${url}?${params.toString()}`;
};

export default queryBuilder;
