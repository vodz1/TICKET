import { effect, Injectable } from '@angular/core';
import { Auth } from './auth';
import { io } from 'socket.io-client';
import { Socket as IOSocket } from 'socket.io-client';
import { environment } from '../../environment/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Socket {
  private socket?: IOSocket;


constructor(private auth: Auth) {
effect(() => {
const token = this.auth.getToken();
if (token) this.connect(token); else this.disconnect();
});
}


private connect(token: string) {
this.socket?.disconnect();
this.socket = io(environment.apiUrl, { auth: { token } });
}


private disconnect() { this.socket?.disconnect(); this.socket = undefined; }



  joinRoom(roomId: string) {
    this.socket?.emit('joinRoom', roomId);
  }

  sendMessage(roomId: string, message: string) {
    this.socket?.emit('message', { roomId, message });
  }

  onMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket?.on('message', (msg) => observer.next(msg));
    });
  }
}
