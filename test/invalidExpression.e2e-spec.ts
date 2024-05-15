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

  it('6. /calc (POST) - Test invalid expression', () => {
    return request(app.getHttpServer())
      .post('/calc')
      .send({ expression: '1+1+' })
      .expect({
        statusCode: 400,
        message: 'Invalid expression provided',
        error: 'Invalid expression provided',
      });
  });
});
