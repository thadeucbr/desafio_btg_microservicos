import { Injectable } from '@nestjs/common';
import { OrderDto } from './order.dto';

@Injectable()
export class AppService {
  orders: OrderDto[] = [];

  handleOrder(order: OrderDto) {
    console.log('Order received:', order);
    this.orders.push(order);
  }

  getOrders() {
    return this.orders;
  }
}
