import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_URL,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: 'btg',
      entities: [Client, Product, Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Client]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
