import { ApiError } from '@nc/utils/errors';
import { formatUserExpenseResponse } from '../formatter';
import { getUserExpenses } from '../model';
import { getUserExpensesHandler } from '../routes/v1-get-user-expenses';

jest.mock('../model');
jest.mock('../formatter');

describe('[Packages | Expense | Routes ] getUserExpensesHandler', () => {
  test('Should return read and formatted user expense value', async () => {
    const mockedExpenses = [
      {
        id: '12',
        merchant_name: 'shop',
        amount_in_cents: 443,
      },
    ];
    const mockedFormatted = [
      {
        id: '12',
        merchant_name: 'Shop',
        amount_in_cents: 100,
      },
    ];

    const userExpensesMock: any = getUserExpenses;
    userExpensesMock.mockImplementation(async (_params) => mockedExpenses); // eslint-disable-line

    const formatExpenseMock: any = formatUserExpenseResponse;
    formatExpenseMock.mockImplementation(async (_params) => mockedFormatted); // eslint-disable-line

    const nextMock = jest.fn();
    const resMock = {
      json: jest.fn(),
    };
    const req = {
      query: {},
    };
    await getUserExpensesHandler(req, resMock, nextMock);

    expect(await resMock.json.mock.calls[0][0]).toEqual(mockedFormatted);
  });

  test('Should return Api Error if received an error from the model', async () => {
    const userExpensesMock: any = getUserExpenses;
    userExpensesMock.mockImplementation(async (_params) => { throw Error() });  // eslint-disable-line

    const nextMock = jest.fn();
    const resMock = {
      json: jest.fn(),
    };
    const req = {
      query: {},
    };
    await getUserExpensesHandler(req, resMock, nextMock);

    expect(nextMock).toHaveBeenCalledWith(expect.any(ApiError));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
