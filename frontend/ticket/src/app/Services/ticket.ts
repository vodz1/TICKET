import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Ticket {
  constructor(private http: HttpClient) {}
  createTicket(title: string, description: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/tickets`, { title, description });
  }

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/tickets`);
  }

  getTicket(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/tickets/${id}`);
  }

  updateTicket(id: string, dto: any): Observable<any> {
  return this.http.patch(`${environment.apiUrl}/tickets/${id}`, dto);
}
}
