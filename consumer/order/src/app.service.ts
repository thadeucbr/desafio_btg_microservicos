import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './order.entity';
import { Client } from './client.entity';
import { Product } from './product.entity';
import { OrderProduct } from './orderProduct.entity';
import { GetOrderDto, OrderDto } from './order.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>,
  ) {}

  async handleOrder(orderDto: OrderDto) {
    const client = await this.clientRepository.findOne({
      where: { id: orderDto.clientId },
    });

    const products = await this.productRepository.findBy({
      id: In(orderDto.products.map((p) => p.productId)),
    });

    products.forEach((product) => {
      const orderProduct = orderDto.products.find(
        (p) => p.productId === product.id.toString(),
      );
      if (product.stock < orderProduct.quantity) {
        throw new Error(`Product ${product.name} is out of stock`);
      }
    });

    const totalPrice = orderDto.products.map((p) => {
      const product = products.find(
        (product) => product.id === Number(p.productId),
      );
      return Number(p.quantity) * product.price;
    });

    const order = new Order();
    order.client = client;
    order.total = totalPrice.reduce((total, product) => total + product, 0);

    await this.orderRepository.save(order);

    for (const p of orderDto.products) {
      const product = products.find(
        (product) => product.id === Number(p.productId),
      );
      const orderProduct = new OrderProduct();
      orderProduct.order = order;
      orderProduct.product = product;
      orderProduct.quantity = Number(p.quantity);
      await this.orderProductRepository.save(orderProduct);

      product.stock -= Number(p.quantity);
      await this.productRepository.save(product);
    }

    console.log('Order created:', order);
  }

  async getOrders(query: GetOrderDto) {
    return this.orderRepository
      .find({
        relations: ['client', 'orderProducts', 'orderProducts.product'],
        where: { client: { id: query.userId } },
      })
      .then((orders) =>
        orders.map((order) => ({
          id: order.id,
          total: order.total,
          createdAt: order.createdAt,
          status: order.status,
          client: {
            name: order.client?.name || 'Disabled',
            email: order.client?.email || 'Disabled',
          },
          products: order.orderProducts.map((orderProduct) => ({
            name: orderProduct.product.name,
            price: orderProduct.product.price,
            quantity: orderProduct.quantity,
          })),
        })),
      );
  }

  getOrder(id: number) {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['client', 'orderProducts', 'orderProducts.product'],
    });
  }

  deleteOrder(id: number) {
    return this.orderRepository.softDelete(id);
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async checkPendingOrders() {
    const pendingOrders = await this.orderRepository.find({
      where: { status: 'pending' },
      relations: ['orderProducts', 'orderProducts.product'],
    });

    const now = new Date();

    for (const order of pendingOrders) {
      const orderAge =
        (now.getTime() - new Date(order.createdAt).getTime()) /
        (1000 * 60 * 60 * 1);
      if (orderAge >= 1) {
        order.status = 'cancelled';
        await this.orderRepository.save(order);

        for (const orderProduct of order.orderProducts) {
          const product = orderProduct.product;
          product.stock += orderProduct.quantity;
          await this.productRepository.save(product);
        }
      }
    }
  }
}
