import { query as dbQuery, format } from '@nc/utils/db';

export function buildQueryString(userId,
  page: number | undefined,
  pageSize: number | undefined,
  filter: string | undefined,
  filterBy: string | undefined,
  sort: 'asc' | 'desc' | undefined,
  sortBy: string | undefined): string {
  let query = format('SELECT * FROM expenses WHERE user_id = %L', userId);

  query = addFiltering(filter, filterBy, query);
  query = addSorting(sort, sortBy, query);
  query = addPagination(page, pageSize, query);

  return query;
}

function addSorting(sort: 'asc' | 'desc' | undefined, sortBy: string, query: string) {
  if (sortBy && !sort) {
    sort = 'asc';
  }
  if (sortBy) {
    query += format(' ORDER BY %I %s', sortBy, sort);
  }
  return query;
}

function addPagination(page: number, pageSize: number, query: string) {
  if (page === undefined) {
    page = 0;
  }
  const defaultPageSize = 20;
  if (pageSize === undefined) {
    pageSize = defaultPageSize;
  }

  if (page > 0) {
    query += format(' OFFSET %L', page * pageSize);
  }

  query += format(' LIMIT %L', pageSize);

  return query;
}

function addFiltering(filter: string, filterBy: string, query: string) {
  if (filter && filterBy) {
    query += format(' and %I = %L', filterBy, filter);
  }
  return query;
}

export function readUserExpenses(userId,
  page?: number | undefined,
  pageSize?: number | undefined,
  filter?: string | undefined,
  filterBy?: string | undefined,
  sort?: 'asc' | 'desc' | undefined,
  sortBy?: string | undefined) {
  const query = buildQueryString(userId, page, pageSize, filter, filterBy, sort, sortBy);

  return dbQuery(query)
    .then((response) => response.rows);
}
