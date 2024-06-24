import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ClientDto } from './clients.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create_client')
  handleClient(@Payload() client: ClientDto) {
    return this.appService.handleClient(client);
  }

  @MessagePattern({ cmd: 'fetch-clients' })
  getClients() {
    return this.appService.getClients();
  }
}
