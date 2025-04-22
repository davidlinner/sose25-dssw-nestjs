import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { v4 as v4uuid } from 'uuid';
import { Message, UpdateMessage } from './message.model';

const DATA_FILE = './data/messages.json';

@Injectable()
export class MessageService {
  async getMessages(): Promise<Message[]> {
    const raw = await fs.readFile(DATA_FILE, { encoding: 'utf-8' });
    return JSON.parse(raw) as Message[];
  }

  async addMessage(message: Message) {
    const raw = await fs.readFile(DATA_FILE, { encoding: 'utf-8' });
    const messages = JSON.parse(raw) as Message[];

    const newMessage = {
      ...message,
      id: v4uuid(),
    };

    messages.push(newMessage);

    await fs.writeFile(DATA_FILE, JSON.stringify(messages), {
      encoding: 'utf-8',
    });

    return newMessage;
  }

  async removeMessage(messageId: string) {
    const raw = await fs.readFile(DATA_FILE, { encoding: 'utf-8' });
    let messages = JSON.parse(raw) as Message[];

    messages = messages.filter((message) => message.id != messageId);

    await fs.writeFile(DATA_FILE, JSON.stringify(messages), {
      encoding: 'utf-8',
    });
  }

  async updateMessage(messageId: string, updateMessage: UpdateMessage) {
    const raw = await fs.readFile(DATA_FILE, { encoding: 'utf-8' });
    const messages = JSON.parse(raw) as Message[];

    const index = messages.findIndex((message) => message.id === messageId);

    messages[index] = {
      ...messages[index],
      ...updateMessage,
      id: messageId,
    } as Message;

    await fs.writeFile(DATA_FILE, JSON.stringify(messages), {
      encoding: 'utf-8',
    });
  }

  async getMessage(messageId: string) {
    const raw = await fs.readFile(DATA_FILE, { encoding: 'utf-8' });
    const messages = JSON.parse(raw) as Message[];

    return messages.find((message) => message.id === messageId);
  }
}
