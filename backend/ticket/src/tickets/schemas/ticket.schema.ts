import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';


export type TicketDocument = HydratedDocument<Ticket>;


export enum TicketStatus {
PENDING = 'PENDING',
OPEN = 'OPEN',
CLOSED = 'CLOSED',
}


@Schema({ _id: false, timestamps: false })
class Message {
@Prop({ required: true , ref : 'User' }) senderId: string; // user or admin id
@Prop({ required: true , ref : 'User' }) senderEmail: string; // user or admin email
@Prop({ required: true }) senderRole: 'USER' | 'ADMIN';
@Prop({ required: true }) message: string;
@Prop({ default: () => new Date() }) at: Date;
}


const MessageSchema = SchemaFactory.createForClass(Message);


@Schema({ timestamps: true })
export class Ticket {
@Prop({ required: true }) title: string;
@Prop({ required: true }) description: string;
@Prop({ type: Types.ObjectId, ref: 'User', required: false }) createdBy: Types.ObjectId;
@Prop({ enum: TicketStatus, default: TicketStatus.PENDING }) status: TicketStatus;
@Prop({ type: [MessageSchema], default: [] }) messages: Message[];
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
