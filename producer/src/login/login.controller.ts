import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './login.dto';

@ApiTags('login')
@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Return authorization token' })
  @ApiBody({ type: LoginDto })
  login(@Body() data: { username: string; password: string }) {
    return this.loginService.login(data.username, data.password);
  }
}
