import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(@Inject('PRODUCT_SERVICE') private rabbitClient: ClientProxy) {}

  addProduct(product: ProductDto) {
    this.rabbitClient.emit('place_product', product);

    return {
      message: 'Product added!',
    };
  }

  getProducts() {
    return this.rabbitClient.send({ cmd: 'fetch-products' }, {}).pipe(timeout(5000));
  }
}
