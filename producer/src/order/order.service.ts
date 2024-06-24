import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderDto } from './order.dto';
import { timeout } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(@Inject('ORDER_SERVICE') private rabbitClient: ClientProxy) {}

  placeOrder(order: OrderDto) {
    this.rabbitClient.emit('place_order', order);

    return {
      message: 'Order placed!',
    };
  }

  getOrders() {
    return this.rabbitClient.send({ cmd: 'fetch-orders' }, {}).pipe(timeout(5000));
  }
}
