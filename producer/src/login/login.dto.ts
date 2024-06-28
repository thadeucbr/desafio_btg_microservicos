import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'jon@doe.net', description: 'The email' })
  @IsEmail()
  username: string;
  
  @ApiProperty({ example: 'jondoe', description: 'The password' })
  @IsString()
  password: string;
}