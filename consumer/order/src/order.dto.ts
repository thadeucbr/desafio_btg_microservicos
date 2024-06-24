export class OrderDto {
  clientId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}
