import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the client' })
  name: string;
  @ApiProperty({
    example: 'john@doe.net',
    description: 'The email of the client',
  })
  email: string;
  @ApiProperty({
    example: '123456789',
    description: 'The phone number of the client',
  })
  phone: string;
}
