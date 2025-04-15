import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';

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
    messages.push(message);
    await fs.writeFile(DATA_FILE, JSON.stringify(messages), {
      encoding: 'utf-8',
    });
  }
}
