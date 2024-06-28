import { Injectable } from '@nestjs/common';
import { ClientDto } from './clients.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}

  handleClient(client: ClientDto) {
    const newClient = this.clientRepository.create(client);
    newClient.password = bcrypt.hashSync(newClient.password, 10);
    console.log('Client received:', newClient);
    return this.clientRepository.save(newClient);
  }

  updateClient(id: number, client: ClientDto) {
    console.log('Client updated:', client);
    return this.clientRepository.update(id, client);
  }

  deleteClient(id: number) {
    console.log('Client deleted:', id);
    return this.clientRepository.softDelete(id);
  }
  getClients() {
    return this.clientRepository.find();
  }

  getClient(id: number) {
    return this.clientRepository.findOne({ where: { id } });
  }
}
