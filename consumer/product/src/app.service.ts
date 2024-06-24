import { Injectable } from '@nestjs/common';
import { ProductDto } from './product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  products: ProductDto[] = [];

  handleProduct(product: ProductDto) {
    console.log('Product received:', product);
    const newProduct = this.productRepository.create(product);
    console.log(newProduct)
    return this.productRepository.save(newProduct);
  }

  async getProducts() {
    const response = await this.productRepository.find();
    return response;
  }
}
