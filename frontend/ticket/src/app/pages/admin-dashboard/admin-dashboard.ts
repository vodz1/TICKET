import { Component } from '@angular/core';
import { Ticket } from '../../Services/ticket';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule , FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {
  tickets: any[] = [];

  constructor(private ticketService: Ticket, private router: Router) {}

  ngOnInit() {
    this.ticketService.getTickets().subscribe(data => this.tickets = data);
    
  }

  openChat(id: string) {
    this.router.navigate(['/tickets', id]);
  }

  changeStatus(id: string, status: 'OPEN' | 'CLOSED') {
  this.ticketService.updateTicket(id, { status }).subscribe(() => {
    this.ticketService.getTickets().subscribe(data => this.tickets = data);
    this.openChat(id);
  });
}

}
