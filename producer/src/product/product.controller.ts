import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('add-product')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('admin')
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('admin')
  @HttpCode(202)
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 202, description: 'Product updated' })
  @ApiBody({ type: ProductDto })
  updateProduct(@Param() data: { id: number; product: ProductDto }) {
    return this.productService.updateProduct(data.id, data.product);
  }

  @Delete('delete-product/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles('admin')
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
