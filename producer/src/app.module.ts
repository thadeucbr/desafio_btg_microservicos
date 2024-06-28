import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [ClientModule, OrderModule, ProductModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
