import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './client.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('create-client')
  @ApiOperation({ summary: 'Create a client' })
  @HttpCode(202)
  @ApiResponse({ status: 202, description: 'Client created' })
  @ApiBody({ type: ClientDto })
  createClient(@Body() client: ClientDto) {
    return this.clientService.createClient(client);
  }

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({ status: 200, description: 'Clients retrieved' })
  getClients() {
    return this.clientService.getClients();
  }

  @Post('update-client/:id')
  @HttpCode(202)
  @ApiOperation({ summary: 'Update a client' })
  @ApiResponse({ status: 202, description: 'Client updated' })
  @ApiBody({ type: ClientDto })
  async updateClient(@Body() data: ClientDto, @Param('id') id: number) {
    return this.clientService.updateClient(id, data);
  }

  @Delete('delete-client/:id')
  @HttpCode(202)
  @ApiOperation({ summary: 'Delete a client' })
  @ApiResponse({ status: 202, description: 'Client deleted' })
  deleteClient(@Param('id') id: number) {
    return this.clientService.deleteClient(id);
  }

  @Get('client/:id')
  @ApiOperation({ summary: 'Get a client' })
  @ApiResponse({ status: 200, description: 'Client retrieved' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async getClient(@Param('id') id: number) {
    const client = await this.clientService.getClient(id).toPromise();
    if (!client) {
      throw new NotFoundException();
    }
    return client;
  }
}
