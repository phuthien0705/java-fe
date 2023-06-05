export interface IPaginationMeta {
  limit: number;
  page: number;
  totalPages: number;
  totalResults: number;
}

export interface IPaginationResponse<T = any> extends IPaginationMeta {
  datas: T[];
}
