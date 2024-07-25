import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { GetOrderDto, OrderDto } from './order.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guard';
// import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@ApiTags('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('place-order')
  @HttpCode(202)
  @ApiOperation({ summary: 'Place an order' })
  @ApiResponse({ status: 202, description: 'Order placed' })
  @ApiBody({ type: OrderDto })
  placeOrder(@Body() order: OrderDto, @Req() req: Request) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = this.jwtService.decode(token);
    if (decoded.role === 'admin') {
      return this.orderService.placeOrder(order);
    }
    order.clientId = decoded.sub;
    return this.orderService.placeOrder(order);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Orders retrieved' })
  getOrders(@Query() query: GetOrderDto, @Req() req: Request) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = this.jwtService.decode(token);

    if (decoded.role === 'admin') {
      return this.orderService.getOrders(query);
    }

    return this.orderService.getOrders({ userId: decoded.sub });
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
