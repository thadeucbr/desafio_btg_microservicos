import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLIENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://192.168.0.227'],
          queue: 'client_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
