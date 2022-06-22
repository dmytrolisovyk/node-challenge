import { formatRawUserData, formatUserResponse } from '../formatter';

describe('[Packages | User-domain | Formatter] formatRawUserData', () => {
  test('format should return an instance of users that fits the API model, based on the db raw value', () => {
    return expect(formatRawUserData({
      first_name: 'john',
      last_name: 'smith',
      company_name: 'Pleo',
      ssn: 1,
    })).toEqual({
      first_name: 'John',
      last_name: 'Smith',
      company_name: 'Pleo',
      ssn: 1,
    });
  });
});

describe('[Packages | User-domain | Formatter] formatUserResponse', () => {
  test('format should return an instance of users that should be returned by the API', () => {
    return expect(formatUserResponse({
      id: '123',
      first_name: 'John',
      last_name: 'Smith',
      company_name: 'Pleo',
      ssn: 1,
    })).toEqual({
      first_name: 'John',
      last_name: 'Smith',
      company_name: 'Pleo',
    });
  });
});
