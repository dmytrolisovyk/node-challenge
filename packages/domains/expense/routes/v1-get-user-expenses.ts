import { ApiError } from '@nc/utils/errors';
import { getUserExpenses } from '../model';
import { Router } from 'express';
// import { secureTrim } from '../formatter';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/get-user-expenses', async (req, res, next) => {
  const [expensesError, userExpenses] = await to(getUserExpenses(req.query?.userId));

  if (expensesError) {
    return next(new ApiError(expensesError, expensesError.status, `Could not get user expenses: ${expensesError}`, expensesError.title, req));
  }

  if (!userExpenses) {
    return res.json({});
  }

  return res.json(userExpenses);// secureTrim(userExpenses));
});
