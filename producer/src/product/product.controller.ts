import { Body, Controller, Get, HttpCode, NotFoundException, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add-product')
  @HttpCode(202)
  @ApiOperation({ summary: 'Add a product' })
  @ApiResponse({ status: 202, description: 'Product added' })
  @ApiBody({ type: ProductDto })
  addProduct(@Body() product: ProductDto) {
    return this.productService.addProduct(product);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products' })
  getProducts() {
    return this.productService.getProducts();
  }

  @Post('update-product/:id')
  @HttpCode(202)
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 202, description: 'Product updated' })
  @ApiBody({ type: ProductDto })
  updateProduct(@Param() data: { id: number; product: ProductDto }) {
    return this.productService.updateProduct(data.id, data.product);
  }

  @Post('delete-product/:id')
  @HttpCode(202)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 202, description: 'Product deleted' })
  deleteProduct(@Param() id: number) {
    return this.productService.deleteProduct(id);
  }

  @Get('product/:id')
  @ApiOperation({ summary: 'Get a product' })
  @ApiResponse({ status: 200, description: 'Return a product' })
  async getProduct(@Param('id') id: number) {
    const product = await this.productService.getProduct(id).toPromise();
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }
}
