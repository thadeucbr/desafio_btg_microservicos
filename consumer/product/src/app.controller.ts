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

  @MessagePattern({ cmd: 'update-product' })
  async updateProduct(data: { id: number; product: ProductDto }) {
    return await this.appService.updateProduct(data.id, data.product);
  }

  @MessagePattern({ cmd: 'delete-product' })
  async deleteProduct(id: number) {
    return await this.appService.deleteProduct(id);
  }

  @MessagePattern({ cmd: 'fetch-product' })
  async getProduct(id: number) {
    return await this.appService.getProduct(id);
  }
}
