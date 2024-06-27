import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { OrderDto } from './order.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('place_order')
  handleOrder(order: OrderDto) {
    return this.appService.handleOrder(order);
  }

  @MessagePattern({ cmd: 'fetch-orders' })
  getOrders() {
    return this.appService.getOrders();
  }

  @EventPattern('delete_order')
  deleteOrder(id: number) {
    return this.appService.deleteOrder(id);
  }

  @MessagePattern({ cmd: 'fetch-order' })
  getOrder(id: number) {
    return this.appService.getOrder(id);
  }
}
