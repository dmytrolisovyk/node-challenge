import { Api } from '../utils/api';

describe('GET User expense', () => {
  test('Should return user expense when received correct input parameters', (done) => {
    const expectedBody = [
      {
        merchant_name: 'Sliders',
        amount_in_cents: 12000,
        currency: 'DKK',
        date_created: '2021-09-20T17:57:40.021Z',
        status: 'processed',
      },
    ];
    Api.get('/v1/user/da140a29-ae80-4f0e-a62d-6c2d2bc8a474/expenses?&page=0&pageSize=3&sortBy=merchant_name&sort=asc&filter=Sliders&filterBy=merchant_name')
      .expect(200, expectedBody, done);
  });

  test('Should return BadRequest when incorrect parameters in url', (done) => {
    Api.get('/v1/user/da140a29-ae80-4f0e-a62d-6c2d2bc8a474/expenses?page=-3')
      .expect(400, done);
  });
});
