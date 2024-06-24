import { Injectable } from '@nestjs/common';
import { ClientDto } from './clients.dto';

@Injectable()
export class AppService {
  clients: ClientDto[] = [];

  handleClient(client: ClientDto) {
    console.log('Client received:', client);
    this.clients.push(client);
  }

  getClients() {
    return this.clients;
  }
}
