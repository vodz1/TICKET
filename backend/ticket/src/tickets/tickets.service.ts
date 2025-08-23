import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketDto } from './DTO/createTicket.dto';
// import { UpdateTicketDto } from './DTO/updateTicket.dto';
import { Ticket } from './schemas/ticket.schema';
import { TicketsGateway } from './Gateway/tickets.gateway';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class TicketsService {
    constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>,
    private readonly ticketsGateway: TicketsGateway, // inject gateway
    @InjectQueue('test') private readonly testQueue : Queue
  ) {}

  async create(dto: CreateTicketDto, userId: string) {
    const ticket = new this.ticketModel({ ...dto, createdBy: userId });
    const savedTicket = await ticket.save();

    // Emit socket event
    this.ticketsGateway.ticketCreated(savedTicket);
    return savedTicket;
  }

  async findAll() {
    return this.ticketModel.find().exec();
  }

  async findOne(id: string) {
    const ticket = await this.ticketModel.findById(id).exec();
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }

  async update(id: string, dto: any) {
   const ticket = await this.ticketModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!ticket) throw new NotFoundException('Ticket not found');
    this.ticketsGateway.ticketStatusUpdated(ticket); // 🔥 notify clients
    return ticket;
  }

  test(){
    this.testQueue.add('tryingTest' ,{data: 'HEELLLO FROM TEST'} ,{
      delay: 1000 * 30,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000
      }
    })

  }
}
