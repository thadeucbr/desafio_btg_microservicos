import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, Min, MinLength, ValidateNested } from 'class-validator';

export class OrderProductDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ example: '123456789', description: 'The product ID' })
  productId: string;

  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 1, description: 'The quantity of the product' })
  quantity: number;
}

export class OrderDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  @ApiProperty({ example: '123456789', description: 'The client ID' })
  clientId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  @ApiProperty({
    example: [{ productId: '123456789', quantity: 1 }],
    description: 'The products in the order',
    type: [OrderProductDto],
  })
  products: OrderProductDto[];
}

export class GetOrderDto {
  @ApiProperty({ example: 1, description: 'The User ID', required: false })
  userId: number;
}
