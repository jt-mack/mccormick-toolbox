
export type PaginationOptions = {
  tableName: string;
  searchColumn?: string; // Column to search in
  searchValue?: string;  // Value to search for
  page: number;
  pageSize: number;
  sortColumn?: string;
  sortOrder?: 'ASC' | 'DESC'; // Default to ASC
  columns?:string[];
}