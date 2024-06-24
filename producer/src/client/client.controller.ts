import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './client.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('create-client')
  @ApiOperation({ summary: 'Create a client' })
  @ApiResponse({ status: 201, description: 'Client created' })
  @ApiBody({ type: ClientDto })
  createClient(@Body() client: ClientDto) {
    return this.clientService.createClient(client);
  }

  @Get()
  getClients() {
    return this.clientService.getClients();
  }
}
