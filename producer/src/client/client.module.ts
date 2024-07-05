import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: process.env.SECRET, signOptions: { expiresIn: '1d' } }),
    ClientsModule.register([
      {
        name: 'CLIENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'client_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [ClientController],
  providers: [ClientService, JwtStrategy, RolesGuard],
})
export class ClientModule {}
