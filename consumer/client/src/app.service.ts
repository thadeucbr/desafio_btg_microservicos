import { Injectable } from '@nestjs/common';
import { ClientDto } from './clients.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}

  handleClient(client: ClientDto) {
    console.log('Client received:', client);
    const newClient = this.clientRepository.create(client);
    return this.clientRepository.save(newClient);
  }

  getClients() {
    return this.clientRepository.find();
  }
}
