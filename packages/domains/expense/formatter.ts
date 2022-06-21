import { capitalize, secureTrim } from '@nc/utils/formatter';
import { UserExpense, UserExpenseResponse } from './types';

const publicFields = ['merchant_name', 'amount_in_cents', 'currency', 'date_created', 'status'];

export function formatUserExpenseResponse(userExpense: UserExpense[]): UserExpenseResponse[] {
  return userExpense.map((expense) => secureTrim<UserExpense, UserExpenseResponse>(expense, publicFields));
}

export function formatRawUserExpenseData(userExpenses: UserExpense[]): UserExpense[] {
  return userExpenses.map((expense) => ({
    ...expense,
    merchant_name: capitalize(expense.merchant_name),
  }));
}
