import { capitalize, secureTrim } from '../formatter';

describe('[Packages | Core-util | Formatter] capitalize', () => {
  test('capitalize should make the first character as a capital letter', () => {
    return expect(capitalize('mario')).toEqual('Mario');
  });

  test('capitalize should do nothing on already capitalized word', () => {
    return expect(capitalize('Mario')).toEqual('Mario');
  });

  test('capitalize should do nothing on numbers', () => {
    return expect(capitalize(123)).toEqual('123');
  });

  test('capitalize should do nothing on strings of numbers', () => {
    return expect(capitalize('123')).toEqual('123');
  });
});

describe('[Packages | Core-util | Formatter] secureTrim', () => {
  test('secureTrim should remove fields that are not defined in the list of public fields', () => {
    const publicFields = ['first_name', 'last_name', 'company_name'];

    return expect(secureTrim({
      first_name: 'John',
      last_name: 'Smith',
      company_name: 'Pleo',
      ssn: 1,
    }, publicFields))
      .toEqual({
        first_name: 'John',
        last_name: 'Smith',
        company_name: 'Pleo',
      });
  });
});
