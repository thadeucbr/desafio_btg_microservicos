import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientDto } from './client.dto';
import { timeout } from 'rxjs';

@Injectable()
export class ClientService {
  constructor(@Inject('CLIENT_SERVICE') private client: ClientProxy) {}

  createClient(client: ClientDto) {
    this.client.emit('create_client', client);

    return {
      message: 'Client created!',
    };
  }

  getClients() {
    return this.client.send({ cmd: 'fetch-clients' }, {}).pipe(timeout(5000));
  }
}
