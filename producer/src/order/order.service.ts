import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetOrderDto, OrderDto } from './order.dto';
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

  getOrders(query: GetOrderDto) {
    return this.rabbitClient.send({ cmd: 'fetch-orders' }, query).pipe(timeout(5000));
  }

  getOrder(id: number) {
    return this.rabbitClient.send({ cmd: 'fetch-order' }, id).pipe(timeout(5000));
  }

  deleteOrder(id: number) {
    this.rabbitClient.emit('delete_order', { id });

    return {
      message: 'Order deleted!',
    };
  }
}
