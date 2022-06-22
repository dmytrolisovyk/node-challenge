import { ApiError } from '@nc/utils/errors';
import { formatUserExpenseResponse } from '../formatter';
import { getExpenseValidator } from '../validation/get-expense-validator';
import { getUserExpenses } from '../model';
import { Router } from 'express';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/get-user-expenses', getExpenseValidator, async (req, res, next) => {
  const [expensesError, userExpenses] = await to(
    getUserExpenses(
      req.query?.userId,
      req.query?.page,
      req.query?.pageSize,
      req.query?.filter,
      req.query?.filterBy,
      req.query?.sort,
      req.query?.sortBy
    )
  );

  if (expensesError) {
    return next(new ApiError(expensesError, expensesError.status, `Could not get user expenses: ${expensesError}`, expensesError.title, req));
  }

  return res.json(formatUserExpenseResponse(userExpenses));
});
