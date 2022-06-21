import { formatRawUserExpenseData } from './formatter';
import { readUserExpenses } from './data/db-user-expenses';
import { to } from '@nc/utils/async';
import { UserExpense } from './types';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getUserExpenses(userId): Promise<UserExpense[]> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rawExpenses] = await to(readUserExpenses(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpenses) {
    throw NotFound(`Could not find user with id ${userId}`);
  }

  return formatRawUserExpenseData(rawExpenses);
}
