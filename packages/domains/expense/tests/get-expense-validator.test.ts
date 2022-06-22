import { getExpenseValidator } from '../validation/get-expense-validator';

describe('[Packages | Expense | Get-Expense-Validator] getExpenseValidator', () => {
  it.each`
  userId      | page         | pageSize     | filter       | filterBy           | sort         | sortBy      
  ${undefined}| ${undefined} | ${undefined} | ${undefined} | ${undefined}       | ${undefined} | ${undefined} 
  ${'abc2'}   | ${-1}        | ${5}         | ${undefined} | ${undefined}       | ${undefined} | ${undefined}   
  ${'abc1'}   | ${undefined} | ${-3}        | ${'Store'}   | ${'merchant_name'} | ${undefined} | ${undefined}      
  ${'abc3'}   | ${undefined} | ${undefined} | ${'Store'}   | ${undefined}       | ${undefined} | ${undefined}    
  ${'abc4'}   | ${undefined} | ${undefined} | ${undefined} | ${undefined}       | ${'desc'}    | ${undefined}    
  ${'abc1'}   | ${undefined} | ${10}        | ${undefined} | ${'currency'}      | ${undefined} | ${undefined}  
  ${'abc5'}   | ${4}         | ${10}        | ${'pending'} | ${'wrong'}         | ${undefined} | ${undefined} 
  ${'abc4'}   | ${undefined} | ${undefined} | ${undefined} | ${undefined}       | ${'desc'}    | ${'wrong'}  
  `('Returns BadRequest if validation parameters are incorrect', (queryParameters) => {
    const nextMock = jest.fn();
    const resMock = jest.fn();
    const req = {
      query: queryParameters,
    };
    getExpenseValidator(req, resMock, nextMock);

    expect(nextMock).toHaveBeenCalledWith(expect.objectContaining({ status: 400 }));
  });

  it.each`
  userId      | page         | pageSize     | filter       | filterBy           | sort         | sortBy      
  ${'abc1'}   | ${undefined} | ${undefined} | ${undefined} | ${undefined}       | ${undefined} | ${undefined} 
  ${'abc2'}   | ${3}         | ${5}         | ${undefined} | ${undefined}       | ${undefined} | ${undefined}   
  ${'abc1'}   | ${undefined} | ${30}        | ${'Store'}   | ${'merchant_name'} | ${undefined} | ${undefined}      
  ${'abc3'}   | ${undefined} | ${undefined} | ${'Store'}   | ${'merchant_name'} | ${undefined} | ${undefined}    
  ${'abc1'}   | ${2}         | ${10}        | ${'DDK'}     | ${'currency'}      | ${undefined} | ${undefined}  
  ${'abc5'}   | ${4}         | ${10}        | ${'pending'} | ${'status'}        | ${'asc    '} | ${'date_created'} 
  ${'abc4'}   | ${undefined} | ${undefined} | ${undefined} | ${undefined}       | ${'desc'}    | ${'date_created'}  
  `('Succefully passes validation and calls next if data is correct', (queryParameters) => {
    const nextMock = jest.fn();
    const resMock = jest.fn();
    const req = {
      query: queryParameters,
    };
    getExpenseValidator(req, resMock, nextMock);

    expect(nextMock.mock.calls[0].length).toBe(0);
  });
});
