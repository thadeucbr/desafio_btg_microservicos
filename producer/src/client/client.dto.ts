import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class ClientDto {
  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'John Doe', description: 'The name of the client' })
  name: string;

  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'john@doe.net',
    description: 'The email of the client',
  })
  email: string;

  @IsString()
  @IsPhoneNumber('BR')
  @ApiProperty({
    example: '11967544739',
    description: 'The phone number of the client',
  })
  phone: string;
}
