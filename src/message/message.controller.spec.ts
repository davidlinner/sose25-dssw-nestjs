import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { promises as fs } from 'fs';
import { v4 as v4uuid } from 'uuid';
import { Message } from './message.model';

describe('MessageController API Test', () => {
  let app: INestApplication;
  let id: string;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    id = v4uuid();
    const author = createRandomString(10);
    const message = createRandomString(50);
    const title = createRandomString(20);

    await fs.writeFile(
      'data/messages.json',
      JSON.stringify([
        {
          id,
          author,
          message,
          title,
        },
      ]),
      {
        encoding: 'utf-8',
      },
    );
  });

  it('GET /messages', async () => {
    return request(app.getHttpServer())
      .get('/messages')
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(1);
        expect(
          (response.body as Array<Message>).find(
            (message) => message.id === id,
          ),
        ).toBeDefined();
      });
  });
});

function createRandomString(length) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
