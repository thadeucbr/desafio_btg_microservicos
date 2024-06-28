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

  updateProduct(id: number, product: ProductDto) {
    this.rabbitClient.emit('update-product', { id, product });

    return {
      message: 'Product updated!',
    };
  }

  deleteProduct(id: number) {
    this.rabbitClient.emit('delete-product', id);

    return {
      message: 'Product deleted!',
    };
  }

  getProduct(id: number) {
    return this.rabbitClient.send({ cmd: 'fetch-product' }, id).pipe(timeout(5000));
  }
}
