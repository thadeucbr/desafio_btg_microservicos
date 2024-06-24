import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add-product')
  @ApiOperation({ summary: 'Add a product' })
  @ApiResponse({ status: 201, description: 'Product added' })
  @ApiBody({ type: ProductDto })
  addProduct(@Body() product: ProductDto) {
    return this.productService.addProduct(product);
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }
}
