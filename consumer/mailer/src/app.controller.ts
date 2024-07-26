import { Body, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @MessagePattern({ cmd: 'send-email' })
  // sendEmail(
  //   @Body() emailData: { email: string; subject: string; text: string },
  // ) {
  //   return this.appService.sendEmail(emailData);
  // }

  // @MessagePattern({ cmd: 'reset-password' })
  // resetPassword(@Body() emailData: { email: string }) {
  //   return this.appService.resetPassword(emailData);
  // }

  // @MessagePattern({ cmd: 'send-confirmation-email' })
  // sendConfirmationEmail(
  //   @Body() emailData: { email: string; type: 'password' | 'welcome' },
  // ) {
  //   return this.appService.sendConfirmationEmail(emailData);
  // }

  // @MessagePattern({ cmd: 'send-welcome-email' })
  // sendWelcomeEmail(@Body() emailData: { email: string }) {
  //   return this.appService.sendWelcomeEmail(emailData);
  // }

  // @MessagePattern({ cmd: 'send-invoice' })
  // sendInvoice(@Body() emailData: { email: string; invoice: string }) {
  //   return this.appService.sendInvoice(emailData);
  // }
}
