import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './order.entity';
import { Client } from './client.entity';
import { Product } from './product.entity';
import { OrderDto } from './order.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async handleOrder(orderDto: OrderDto) {
    const client = await this.clientRepository.findOne({
      where: { id: orderDto.clientId },
    });

    const products = await this.productRepository.findBy({
      id: In(orderDto.products.map((p) => p.productId)),
    });

    const totalPrice = orderDto.products.map((p) => {
      {
        const product = products.find(
          (product) => product.id === Number(p.productId),
        );
        return Number(p.quantity) * product.price;
      }
    });

    const order = new Order();
    order.client = client;
    order.products = products;
    order.total = totalPrice.reduce((total, product) => total + product, 0);

    await this.orderRepository.save(order);

    console.log('Order created:', order);
  }

  getOrders() {
    return this.orderRepository
      .find({ relations: ['client', 'products'] })
      .then((orders) =>
        orders.map((order) => ({
          id: order.id,
          total: order.total,
          createdAt: order.createdAt,
          client: {
            name: order.client.name,
            email: order.client.email,
          },
          products: order.products.map((product) => ({
            name: product.name,
            price: product.price,
          })),
        })),
      );
  }

  getOrder(id: number) {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['client', 'products'],
    });
  }
}
