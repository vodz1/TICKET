import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { Auth } from '../../Services/auth';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../Services/ticket';

@Component({
  selector: 'app-user-chat',
  imports: [CommonModule , FormsModule],
  templateUrl: './user-chat.html',
  styleUrl: './user-chat.css'
})


export class UserChat {
  private socket!: Socket;
  roomId!: string;
  messages = signal<{ roomId: string; message: string; senderId: string | undefined; senderRole: string |undefined , senderEmail: string| undefined  , at : Date}[]>([]);
  newMessage = '';
  role! : string | undefined
  date : Date = new Date();
  auth = inject(Auth);
  constructor(private route: ActivatedRoute , private authService : Auth ,
     private ticketService : Ticket , private router : Router) {
    this.role = this.authService.user()?.role
  }

ngOnInit() {
  this.socket = io('http://localhost:3000');
  this.roomId = this.route.snapshot.paramMap.get('id')!;
  
  this.socket.emit('joinRoom', { 
    roomId: this.roomId, 
    userId: this.authService.user()?.sub, 
    role: this.authService.user()?.role 
  });

  this.socket.on('roomDenied', (msg) => {
    alert(msg.reason); // ❌ prevent entering chat
    this.router.navigate(['/tickets']);
  });

  this.socket.on('roomJoined', (data) => {
    console.log('Joined room:', data);
  });

  this.ticketService.getTicket(this.roomId).subscribe(ticket => {
    this.messages.update(prev => [...prev, ...ticket.messages]);
  });

  this.socket.on('receiveMessage', (msg) => {
    this.messages.update(prev => [...prev, msg]);
  });

  // 🔥 Listen for ticket status changes
  this.socket.on('ticketStatusUpdated', (update: { id: string; status: string }) => {
    if (update.status === 'CLOSED') {
      alert('This ticket has been closed by the admin.');
      this.router.navigate(['/tickets']);
    }
  });

}


  send() {
    if (this.newMessage.trim()) {
      const messageBody = {
        roomId: this.roomId,
        message: this.newMessage,
        senderId : this.authService.user()?.sub,
        senderRole : this.authService.user()?.role,
        senderEmail : this.authService.user()?.email,
        at : new Date()
      }
      this.socket.emit('sendMessage', messageBody);
      console.log("message sent", messageBody);
      this.newMessage = '';
    }
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }}
