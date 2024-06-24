import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ example: 'Apples', description: 'The name of the product' })
  name: string;
  @ApiProperty({
    example: '1.99',
    description: 'The price of the product',
  })
  price: string;
  @ApiProperty({
    example: 'A delicious fruit',
    description: 'The description of the product',
  })
  description: string;
  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'The image of the product',
  })
  image: string;
  @ApiProperty({
    example: 100,
    description: 'The stock of the product',
  })
  stock: number;
}
