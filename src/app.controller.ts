import { Body, Controller, Get, Put, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateMessage } from './model/CreateMessage';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  @Render('hello')
  getHello(): any {
    return { message: 'hello' };
  }

  @Put('/data')
  sendHello(@Body() createMessage: CreateMessage) {
    console.log(createMessage);
  }
}
