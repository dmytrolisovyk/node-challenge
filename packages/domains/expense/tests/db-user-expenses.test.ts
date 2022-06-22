import { query } from '@nc/utils/db';
import { buildQueryString, readUserExpenses } from '../data/db-user-expenses';

describe('[Packages | Expense | DB-User-Expenses] buildQueryString', () => {
  it.each`
  userId   | page         | pageSize     | filter       | filterBy           | sort         | sortBy            | expectedQuery
  ${'abc1'}| ${undefined} | ${undefined} | ${undefined} | ${undefined}       | ${undefined} | ${undefined}      | ${'SELECT * FROM expenses WHERE user_id = \'abc1\' LIMIT \'20\''}
  ${'abc2'}| ${2}         | ${5}         | ${undefined} | ${undefined}       | ${undefined} | ${undefined}      | ${'SELECT * FROM expenses WHERE user_id = \'abc2\' OFFSET \'10\' LIMIT \'5\''}
  ${'abc1'}| ${undefined} | ${undefined} | ${'Store'}   | ${'merchant_name'} | ${undefined} | ${undefined}      | ${'SELECT * FROM expenses WHERE user_id = \'abc1\' and merchant_name = \'Store\' LIMIT \'20\''}
  ${'abc3'}| ${undefined} | ${undefined} | ${undefined} | ${undefined}       | ${'desc'}    | ${'currency'}     | ${'SELECT * FROM expenses WHERE user_id = \'abc3\' ORDER BY currency desc LIMIT \'20\''}
  ${'abc4'}| ${undefined} | ${undefined} | ${undefined} | ${undefined}       | ${undefined} | ${'currency'}     | ${'SELECT * FROM expenses WHERE user_id = \'abc4\' ORDER BY currency asc LIMIT \'20\''}
  ${'abc1'}| ${undefined} | ${10}        | ${undefined} | ${undefined}       | ${undefined} | ${undefined}      | ${'SELECT * FROM expenses WHERE user_id = \'abc1\' LIMIT \'10\''}
  ${'abc5'}| ${4}         | ${10}        | ${'pending'}  | ${'status'}       | ${'desc'}    | ${'date_created'} | ${'SELECT * FROM expenses WHERE user_id = \'abc5\' and status = \'pending\' ORDER BY date_created desc OFFSET \'40\' LIMIT \'10\''}
  `('Builds correct query string with provided parameters', ({ userId, page, pageSize, filter, filterBy, sort, sortBy, expectedQuery }) => {
    expect(buildQueryString(userId, page, pageSize, filter, filterBy, sort, sortBy))
      .toEqual(expectedQuery);
  });
});

jest.mock('@nc/utils/db', () => {
  const originalModule = jest.requireActual('@nc/utils/db');

  return {
    __esModule: true,
    ...originalModule,
    query: jest.fn(),
  };
});

describe('[Packages | Expense | DB-User-Expenses] readUserExpense', () => {
  test('Read user from the database with correct query string', async () => {
    const mockedRows = {
      rows: [
        {
          id: '12',
          merchant_name: 'shop',
          amount_in_cents: 443,
          currency: 'DDK',
          user_id: 'abc123',
          date_created: new Date(2000, 1, 1),
          status: 'pending',
        },
      ],
    };
    const queryMock: any = query;
    queryMock.mockImplementation(async (_params) => mockedRows); // eslint-disable-line
    const expenses = await readUserExpenses('da140a29-ae80-4f0e-a62d-6c2d2bc8a474');
    const queryString = 'SELECT * FROM expenses WHERE user_id = \'da140a29-ae80-4f0e-a62d-6c2d2bc8a474\' LIMIT \'20\'';

    expect(queryMock).toHaveBeenCalledWith(queryString);
    expect(expenses).toEqual(mockedRows.rows);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
