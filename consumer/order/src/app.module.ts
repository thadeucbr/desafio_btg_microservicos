import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.0.227',
      port: 5432,
      username: 'postgres',
      password: 'thadeu',
      database: 'btg',
      entities: [Client, Order, Product],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, Client, Order]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
