import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty({ example: '123456789', description: 'The client ID' })
  clientId: string;
  @ApiProperty({
    example: [{ productId: '123456789', quantity: 1 }],
    description: 'The products in the order',
  })
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}
