export type Role = 'USER' | 'ADMIN';


export interface AuthTokens { access_token: string; }


export interface UserInfo { sub: string; email: string; role: Role; }


export interface Ticket {
_id: string;
subject: string;
status: 'PENDING' | 'OPEN' | 'CLOSED';
createdBy: string;
assignedAdmin?: string;
messages: Array<{ senderId: string; senderRole: Role; text: string; at: string }>;
createdAt: string;
}