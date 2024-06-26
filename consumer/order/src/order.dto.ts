export class OrderDto {
  clientId: number;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}

export class GetOrderDto {
  userId?: number;
}
