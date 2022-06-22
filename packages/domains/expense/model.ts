import { formatRawUserExpenseData } from './formatter';
import { readUserExpenses } from './data/db-user-expenses';
import { to } from '@nc/utils/async';
import { UserExpense } from './types';
import { InternalError, NotFound } from '@nc/utils/errors';

export async function getUserExpenses(
  userId,
  page?,
  pageSize?,
  filter?,
  filterBy?,
  sort?,
  sortBy?
): Promise<UserExpense[]> {
  const pageAsInt = page === undefined ? undefined : parseInt(page);
  const pageSizeAsInt = pageSize === undefined ? undefined : parseInt(pageSize);

  const [dbError, rawExpenses] = await to(readUserExpenses(userId, pageAsInt, pageSizeAsInt, filter, filterBy, sort, sortBy));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawExpenses || !rawExpenses.length) {
    throw NotFound('Could not find expenses with the provided parameters');
  }

  return formatRawUserExpenseData(rawExpenses);
}
