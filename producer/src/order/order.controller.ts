import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './order.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('place-order')
  @HttpCode(202)
  @ApiOperation({ summary: 'Place an order' })
  @ApiResponse({ status: 202, description: 'Order placed' })
  @ApiBody({ type: OrderDto })
  placeOrder(@Body() order: OrderDto) {
    return this.orderService.placeOrder(order);
  }

  @Get()
  getOrders() {
    return this.orderService.getOrders();
  }

  @Delete('delete-order/:id')
  @HttpCode(202)
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ status: 202, description: 'Order deleted' })
  deleteOrder(@Param('id') id: number) {
    return this.orderService.deleteOrder(id);
  }

  @Get('order/:id')
  @ApiOperation({ summary: 'Get an order' })
  @ApiResponse({ status: 200, description: 'Order retrieved' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getOrder(@Param('id') id: number) {
    const order = await this.orderService.getOrder(id).toPromise();
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }
}
