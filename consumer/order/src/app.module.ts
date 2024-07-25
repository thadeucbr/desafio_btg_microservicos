import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { OrderProduct } from './orderProduct.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_URL,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: 'btg',
      entities: [Client, Product, Order, OrderProduct],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, Client, Order, OrderProduct]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
