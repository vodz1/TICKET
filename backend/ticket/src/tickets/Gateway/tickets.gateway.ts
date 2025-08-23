import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { Ticket, TicketDocument, TicketStatus } from "../schemas/ticket.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { NotFoundException, ForbiddenException } from "@nestjs/common";

@WebSocketGateway({
  cors: {
    origin: '*', // allow Angular dev server
  },
})

export class TicketsGateway {
constructor(
  @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
) {}

  @WebSocketServer()
  server: Server;

  // ✅ Join chat room only if ticket is OPEN
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() data: { roomId: string; userId: string; role: 'USER' | 'ADMIN' },
    @ConnectedSocket() client: Socket
   ){

    const ticket = await this.ticketModel.findById(data.roomId).exec();
    console.log("ticket" , ticket)
    if (!ticket) throw new NotFoundException('Ticket not found');

    // User can only join if OPEN
    if (ticket.status !== TicketStatus.OPEN && data.role === 'USER') {
      this.server.emit('roomDenied', { reason: 'Ticket is not open yet.' });
      return;
    }

    client.join(data.roomId);
    client.emit('roomJoined', { roomId: data.roomId, status: ticket.status });
    console.log(`Client joined room: ${data.roomId}`);
  }

  // ✅ Send chat messages
  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: { roomId: string; message: string; senderId: string; senderRole: 'USER' | 'ADMIN' , senderEmail: string  , at : Date}) {
    const ticket = await this.ticketModel.findById(data.roomId).exec();
    if (!ticket) throw new NotFoundException('Ticket not found');

    if (ticket.status !== TicketStatus.OPEN) {
      throw new ForbiddenException('Cannot send messages in a closed or pending ticket');
    }

    this.server.to(data.roomId).emit('receiveMessage', data);
    await this.ticketModel.findByIdAndUpdate(data.roomId, { 
      $push: { messages: {
        message: data.message,
        at: data.at,
        senderEmail: data.senderEmail,
        senderId: data.senderId,
        senderRole: data.senderRole
      }}
    }, { new: true }).exec();
  }  



  // 🔹 When a new ticket is created
  ticketCreated(ticket: any) {
    this.server.emit('ticketCreated', ticket);
  }

  // 🔹 When a ticket is updated
  ticketUpdated(ticket: any) {
    this.server.emit('ticketUpdated', ticket);
  }

    ticketStatusUpdated(ticket: any) {
    this.server.to(ticket._id.toString()).emit('ticketStatusUpdated', { id: ticket._id, status: ticket.status });
  }
}