import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import { bootstrapNestApplication } from 'test/helpers/bootstrap-nest-application.helper';
import * as request from 'supertest';
import { App } from 'supertest/types';
import {
  completeUser,
  missinFirstName,
  missingEmail,
  missingPassword,
} from './users.post.e2e-spec.sample-data';

describe('[users] @Post endpoints', () => {
  let app: INestApplication;
  let config: ConfigService;
  let httpServer: App;

  beforeEach(async () => {
    app = await bootstrapNestApplication();
    config = app.get<ConfigService>(ConfigService);
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });

  // it('/users - Endpoint is public', () => {
  //   return request(httpServer).post('/users').send({}).expect(400);
  // });

  test('/users - firstName is mendatory', () => {
    return request(httpServer).post('/users').send(missinFirstName).expect(400);
  });

  // test('/users - firstName is mendatory' , () => {
  //   return request(httpServer).post('/users').send(missinFirstName).expect(400);
  // });

  test('/users - email is mendatory', () => {
    return request(httpServer).post('/users').send(missingEmail).expect(400);
  });

  test('/users - password is mendatory', () => {
    return request(httpServer).post('/users').send(missingPassword).expect(400);
  });

  // test('/users - create uaer' , () => {
  //   return request(httpServer).post('/users').send(completeUser).expect(201);
  // });
  test('/users - create uaer', () => {
    return request(httpServer)
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data.firstName).toBe(completeUser.firstName);
        expect(body.data.lastName).toBe(completeUser.lastName);
        expect(body.data.email).toBe(completeUser.email);
      });
  });

  test('/users - password should be undefind' , () => {
    return request(httpServer)
    .post('/users')
    .send(completeUser)
    .expect(201)
    .then(({ body }) => {
      expect(body.data.password).toBeUndefined();
    });
  })

  test('/users - password should be undefind' , () => {
    return request(httpServer)
    .post('/users')
    .send(completeUser)
    .expect(201)
    .then(({ body }) => {
      expect(body.data.googleId).toBeUndefined();
    });
  })
});
