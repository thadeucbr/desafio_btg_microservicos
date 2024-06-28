import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    private jwtService: JwtService,
  ) {}

  async login(userData: { username: string; password: string }) {
    const client = await this.clientRepository.findOne({
      where: { email: userData.username },
    });
    if (client) {
      const payload = { sub: client.id };
      const isValid = await bcrypt.compare(userData.password, client.password);
      if (isValid) {
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
    return null;
  }
}
