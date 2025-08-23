import { Module } from '@nestjs/common';
import { TicketGatewayService } from './ticket-gateway.service';
import { TicketGatewayController } from './ticket-gateway.controller';

@Module({
  controllers: [TicketGatewayController],
  providers: [TicketGatewayService],
})
export class TicketGatewayModule {}
