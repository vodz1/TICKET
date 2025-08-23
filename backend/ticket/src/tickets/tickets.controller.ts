import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/interfaces/decorators/roles.decorators';
import { CreateTicketDto } from './DTO/createTicket.dto';
// import { UpdateTicketDto } from './DTO/updateTicket.dto';

@Controller('tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @Roles('USER', 'ADMIN')
  create(@Body() dto: CreateTicketDto, @Req() req : any) {
    console.log('Creating ticket for user:', req.user);
    return this.ticketsService.create(dto, req.user.sub);
  }

  @Get()
  @Roles('USER', 'ADMIN')
  findAll() {
    return this.ticketsService.findAll();
  }
  @Get('test')
  @Roles('USER', 'ADMIN')
  test() {
    return this.ticketsService.test();
  }

  @Get(':id')
  @Roles('USER', 'ADMIN')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.ticketsService.update(id, dto);
  }

}
