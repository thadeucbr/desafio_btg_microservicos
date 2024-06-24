import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { ProductDto } from './product.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('place_product')
  handleProduct(product: ProductDto) {
    return this.appService.handleProduct(product);
  }

  @MessagePattern({ cmd: 'fetch-products' })
  async getProducts() {
    return await this.appService.getProducts();
  }
}
