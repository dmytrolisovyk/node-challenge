import { formatRawUserExpenseData } from '../formatter';
import { getUserExpenses } from '../model';
import { readUserExpenses } from '../data/db-user-expenses';

jest.mock('../data/db-user-expenses');
jest.mock('../formatter');

describe('[Packages | Expense | Model] getUserExpenses', () => {
  test('Should read user from the database and return formatted response to API', async () => {
    const mockedRawExpenses = [
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

    const readExpensesMock: any = readUserExpenses;
    readExpensesMock.mockImplementation(async (_params) => mockedRawExpenses); // eslint-disable-line

    const formatDataMock: any = formatRawUserExpenseData;
    formatDataMock.mockImplementation(async (_params) => mockedFormatted); // eslint-disable-line

    const expenses = await getUserExpenses('da140a29-ae80-4f0e-a62d-6c2d2bc8a474');

    expect(expenses).toEqual(mockedFormatted);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
