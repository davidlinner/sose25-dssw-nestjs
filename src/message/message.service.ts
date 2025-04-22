import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { v4 as v4uuid } from 'uuid';

const DATA_FILE = './data/messages.json';

export interface Message {
  id?: string;
  author: string;
  message: string;
  title: string;
  longitude?: number;
  latitude?: number;
}

@Injectable()
export class MessageService {
  async getMessage(): Promise<Message[]> {
    const raw = await fs.readFile(DATA_FILE, { encoding: 'utf-8' });
    return JSON.parse(raw) as Message[];
  }

  async addMessage(message: Message) {
    const raw = await fs.readFile(DATA_FILE, { encoding: 'utf-8' });
    const messages = JSON.parse(raw) as Message[];

    messages.push({
      ...message,
      id: v4uuid(),
    });

    await fs.writeFile(DATA_FILE, JSON.stringify(messages), {
      encoding: 'utf-8',
    });
  }

  async removeMessage(messageId: string) {
    const raw = await fs.readFile(DATA_FILE, { encoding: 'utf-8' });
    let messages = JSON.parse(raw) as Message[];

    messages = messages.filter((message) => message.id != messageId);

    await fs.writeFile(DATA_FILE, JSON.stringify(messages), {
      encoding: 'utf-8',
    });
  }
}
