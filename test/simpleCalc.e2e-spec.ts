// calc.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('CalcController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('1. /calc (POST) - Test addition', () => {
    return request(app.getHttpServer())
      .post('/calc')
      .send({ expression: '1+1+1' })
      .expect(201)
      .expect({ result: 3 });
  });

  it('2. /calc (POST) - Test subtraction', () => {
    return request(app.getHttpServer())
      .post('/calc')
      .send({ expression: '1-1-1' })
      .expect(201)
      .expect({ result: -1 });
  });

  it('3. /calc (POST) - Test multiplication', () => {
    return request(app.getHttpServer())
      .post('/calc')
      .send({ expression: '2*2*2' })
      .expect(201)
      .expect({ result: 8 });
  });

  it('4. /calc (POST) - Test division', () => {
    return request(app.getHttpServer())
      .post('/calc')
      .send({ expression: '8/2/2' })
      .expect(201)
      .expect({ result: 2 });
  });

  it('6. /calc (POST) - Test invalid expression', () => {
    return request(app.getHttpServer())
      .post('/calc')
      .send({ expression: '1+1+' })
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Invalid expression provided',
        error: 'Invalid expression provided',
      });
  });
});
