import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './order.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('place-order')
  @ApiOperation({ summary: 'Place an order' })
  @ApiResponse({ status: 201, description: 'Order placed' })
  @ApiBody({ type: OrderDto })
  placeOrder(@Body() order: OrderDto) {
    return this.orderService.placeOrder(order);
  }

  @Get()
  getOrders() {
    return this.orderService.getOrders();
  }
}
