import { formatRawUserExpenseData, formatUserExpenseResponse } from '../formatter';

describe('[Packages | Expense | Formatter] formatUserExpenseResponse', () => {
  test('Should format user expenses to exclude any non-public fields', () => {
    return expect(
      formatUserExpenseResponse([
        {
          id: '12',
          merchant_name: 'Shop',
          amount_in_cents: 114,
          currency: 'DDK',
          user_id: 'abc123',
          date_created: new Date(2000, 1, 1),
          status: 'pending',
        },
        {
          id: '25',
          merchant_name: 'Store',
          amount_in_cents: 54,
          currency: 'DDK',
          user_id: 'cde567',
          date_created: new Date(2002, 2, 2),
          status: 'processed',
        },
      ])
    ).toEqual([
      {
        merchant_name: 'Shop',
        amount_in_cents: 114,
        currency: 'DDK',
        date_created: new Date(2000, 1, 1),
        status: 'pending',
      },
      {
        merchant_name: 'Store',
        amount_in_cents: 54,
        currency: 'DDK',
        date_created: new Date(2002, 2, 2),
        status: 'processed',
      },
    ]);
  });
});

describe('[Packages | Expense | Formatter] formatRawUserExpenseData', () => {
  test('Should format user expenses to capitalize merchant name', () => {
    return expect(
      formatRawUserExpenseData([
        {
          id: '12',
          merchant_name: 'shop',
          amount_in_cents: 443,
          currency: 'DDK',
          user_id: 'abc123',
          date_created: new Date(2000, 1, 1),
          status: 'pending',
        },
        {
          id: '25',
          merchant_name: 'store',
          amount_in_cents: 134,
          currency: 'USD',
          user_id: 'ec24',
          date_created: new Date(2002, 2, 2),
          status: 'processed',
        },
      ])
    ).toEqual([
      {
        id: '12',
        merchant_name: 'Shop',
        amount_in_cents: 443,
        currency: 'DDK',
        user_id: 'abc123',
        date_created: new Date(2000, 1, 1),
        status: 'pending',
      },
      {
        id: '25',
        merchant_name: 'Store',
        amount_in_cents: 134,
        currency: 'USD',
        user_id: 'ec24',
        date_created: new Date(2002, 2, 2),
        status: 'processed',
      },
    ]);
  });
});
