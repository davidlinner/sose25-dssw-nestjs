import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageService],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should add a message', async () => {
    const author = createRandomString(10);
    const message = createRandomString(50);
    const title = createRandomString(20);

    const createdMessage = await service.addMessage({
      author,
      message,
      title,
    });

    expect(createdMessage).toBeDefined();
    expect(createdMessage.id).toBeDefined();
    expect(createdMessage.author).toBe(author);
    expect(createdMessage.message).toBe(message);
    expect(createdMessage.latitude).toBeUndefined();
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
