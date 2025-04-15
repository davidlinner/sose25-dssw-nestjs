import { Body, Controller, Get, Post, Redirect, Render } from '@nestjs/common';
import { MessageService, Message } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  @Render('message-list')
  async getMessages(): Promise<any> {
    return {
      messages: await this.messageService.getMessage(),
    };
  }

  @Get('/add')
  @Render('message-form')
  getMessageForm() {}

  @Post()
  @Redirect('/messages')
  async addMessage(@Body() post: Message) {
    await this.messageService.addMessage(post);
  }
}
