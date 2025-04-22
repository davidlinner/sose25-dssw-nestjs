import { Body, Controller, Get, Post, Query, Redirect, Render } from '@nestjs/common';
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

  @Get('/delete')
  @Redirect('/messages')
  async deleteMessage(@Query('message-id') messageId: string) {
    await this.messageService.removeMessage(messageId);
  }

  @Post()
  @Redirect('/messages')
  async addMessage(@Body() message: Message) {
    await this.messageService.addMessage(message);
  }
}
