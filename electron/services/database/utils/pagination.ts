import { getPool } from '../index';
import type {PaginationOptions} from "@models/db";

export const paginationQuery = async (options: PaginationOptions) => {
  options.columns=options?.columns ?? ['*'];
  const {
    tableName,
    searchColumn,
    searchValue,
    page,
    pageSize,
    sortColumn = 'id', // Default sorting column
    sortOrder = 'ASC', // Default sort order
    columns,
  } = options;

  const pool = await getPool();
  const offset = (page - 1) * pageSize;

  // Base query
  let query = `SELECT ${columns.join(', ')} FROM ${tableName}`;
  let countQuery = `SELECT COUNT(*) as totalCount FROM ${tableName}`;

  const parameters: Record<string, any> = {};

  // Add search condition if applicable
  if (searchColumn && searchValue) {
    query += ` WHERE ${searchColumn} LIKE @searchValue`;
    countQuery += ` WHERE ${searchColumn} LIKE @searchValue`;
    parameters['searchValue'] = `%${searchValue}%`;
  }

  // Add sorting and pagination
  query += ` ORDER BY ${sortColumn} ${sortOrder} OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY`;

  parameters['offset'] = offset;
  parameters['pageSize'] = pageSize;

  // Execute queries
  const result = await pool.request()
    .input('offset', parameters['offset'])
    .input('pageSize', parameters['pageSize'])
    .input('searchValue', parameters['searchValue'] || null)
    .query(query);

  const countResult = await pool.request()
    .input('searchValue', parameters['searchValue'] || null)
    .query(countQuery);

  const totalCount = countResult.recordset[0].totalCount;

  return {
    data: result.recordset,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
};