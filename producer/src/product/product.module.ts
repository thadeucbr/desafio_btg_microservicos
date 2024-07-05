import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
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
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'product_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, JwtStrategy, RolesGuard],
})
export class ProductModule {}
