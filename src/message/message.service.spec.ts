import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';

function createRandomString(length) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageService],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should add a message', async () => {
    const createdMessage = await service.addMessage({
      author: createRandomString(10),
      message: createRandomString(50),
      title: createRandomString(20),
    });

    expect(createdMessage.id).toBeDefined();
  });
});
