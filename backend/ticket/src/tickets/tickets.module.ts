import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TicketsGateway } from './Gateway/tickets.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { BullModule } from '@nestjs/bullmq';
import { testWorker } from './test-worker';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
  BullModule.registerQueue({name : 'test'})],
  providers: [TicketsService, TicketsGateway , testWorker],
  controllers: [TicketsController],
  exports: [TicketsService],
})
export class TicketsModule {}
