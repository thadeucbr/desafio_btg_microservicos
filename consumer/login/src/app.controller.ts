import { Body, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'login' })
  login(@Body() userData: { username: string; password: string }) {
    return this.appService.login(userData);
  }
}
