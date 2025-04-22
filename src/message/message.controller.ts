import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessage, UpdateMessage } from './message.model';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async getMessages(): Promise<any> {
    return await this.messageService.getMessages();
  }

  @Get('/:id')
  async getMessage(@Param('id') messageId: string) {
    return await this.messageService.getMessage(messageId);
  }

  @Put('/:id')
  async updateMessage(
    @Param('id') messageId: string,
    @Body() updateMessage: UpdateMessage,
  ) {
    await this.messageService.updateMessage(messageId, updateMessage);
  }

  @Delete('/:id')
  async deleteMessage(@Param('id') messageId: string) {
    await this.messageService.removeMessage(messageId);
  }

  @Post()
  async addMessage(@Body() message: CreateMessage) {
    return await this.messageService.addMessage(message);
  }
}
