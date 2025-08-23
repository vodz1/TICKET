import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environment/environment.dev';
import { UserInfo, AuthTokens } from '../core/model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {

private tokenKey = 'helpdesk.jwt';
token = signal<string | null>(localStorage.getItem(this.tokenKey));
user = computed<UserInfo | null>(() => {
const t = this.token();
if (!t) return null;
try { return jwtDecode<UserInfo>(t); } catch { return null; }
});
isAdmin = computed(() => this.user()?.role === 'ADMIN');
isLoggedIn = computed(() => !!this.user());


constructor(private http: HttpClient , private router : Router) {}


login(email: string, password: string) {
return this.http.post<AuthTokens>(`${environment.apiUrl}/auth/login`, { email, password });
}


register(email: string, password: string, displayName?: string) {
return this.http.post<AuthTokens>(`${environment.apiUrl}/auth/register`, { email, password, displayName });
}


setToken(token: string) { localStorage.setItem(this.tokenKey, token); this.token.set(token); }
logout() { localStorage.removeItem(this.tokenKey); this.token.set(null);
  this.router.navigateByUrl('/login')
 }
getToken() { return this.token(); }
  
}
