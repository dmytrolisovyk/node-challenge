import { BadRequest } from '@nc/utils/errors';

export const getExpenseValidator = (req, res, next) => {
  if (!req.params.userId) {
    next(BadRequest('userId property is missing.'));
  }

  const maxPageSize = 100;
  if (req.query.page !== undefined) {
    const pageAsInt: number = parseInt(req.query.page);
    if (isNaN(pageAsInt) || pageAsInt < 0) {
      next(BadRequest('page must be >= 0'));
    }
  }

  if (req.query.pageSize !== undefined) {
    const pageSizeAsInt = parseInt(req.query.pageSize);
    if (isNaN(pageSizeAsInt) || pageSizeAsInt < 0 || pageSizeAsInt > maxPageSize) {
      next(BadRequest(`page size must be an integer in range (0, ${maxPageSize})`));
    }
  }

  if (!!req.query.filterBy !== !!req.query.filter) {
    next(BadRequest('filter and filterBy must be provided for filtering'));
  }

  const allowedFilterFields = ['merchant_name', 'currency', 'status'];
  if (req.query.filterBy && !allowedFilterFields.includes(req.query.filterBy)) {
    next(BadRequest('filterBy value is incorrect'));
  }
  if (req.query.sort && !req.query.sortBy) {
    next(BadRequest('sort parameter must be provided together with sortBy'));
  }

  const allowedSortFields = ['merchant_name', 'currency', 'status', 'amount_in_cents', 'date_created'];
  if (req.query.sortBy && !allowedSortFields.includes(req.query.sortBy)) {
    next(BadRequest('sortBy value is incorrect'));
  }

  next();
};
