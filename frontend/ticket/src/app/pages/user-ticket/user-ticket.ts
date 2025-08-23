import { Component } from '@angular/core';
import { Ticket } from '../../Services/ticket';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-ticket',
  imports: [CommonModule , FormsModule],
  templateUrl: './user-ticket.html',
  styleUrl: './user-ticket.css'
})
export class UserTicket {
 tickets: any[] = [];
  title = '';
  description = '';

  constructor(private ticketService: Ticket, private router: Router) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe(data => this.tickets = data);
  }

  createTicket() {
    this.ticketService.createTicket(this.title, this.description).subscribe(() => {
      this.loadTickets();
      this.title = '';
      this.description = '';
    });
  }

  openChat(id: string) {
    this.router.navigate(['/tickets', id]);
  }
}