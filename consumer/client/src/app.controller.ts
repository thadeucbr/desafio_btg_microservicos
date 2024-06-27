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

  @MessagePattern({ cmd: 'update-client' })
  updateClient(@Payload() data: { id: number; client: ClientDto }) {
    return this.appService.updateClient(data.id, data.client);
  }

  @MessagePattern({ cmd: 'delete-client' })
  deleteClient(@Payload() id: number) {
    return this.appService.deleteClient(id);
  }

  @MessagePattern({ cmd: 'fetch-client' })
  getClient(@Payload() id: number) {
    return this.appService.getClient(id);
  }
}
