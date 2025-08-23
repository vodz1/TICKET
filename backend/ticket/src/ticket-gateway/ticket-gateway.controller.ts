import { Controller } from '@nestjs/common';
import { TicketGatewayService } from './ticket-gateway.service';

@Controller('ticket-gateway')
export class TicketGatewayController {
  constructor(private readonly ticketGatewayService: TicketGatewayService) {}
}
