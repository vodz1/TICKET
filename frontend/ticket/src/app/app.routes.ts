import { Routes } from '@angular/router';
import { Login } from './Auth/login/login';
import { Register } from './Auth/register/register';
import { UserTicket } from './pages/user-ticket/user-ticket';
import { UserChat } from './pages/user-chat/user-chat';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { authGuard } from './Guards/auth.guard';
import { roleGuard } from './Guards/role.guard';
import { UnAuthorized } from './un-authorized/un-authorized';


export const routes: Routes = [
{ path: '', redirectTo: 'tickets', pathMatch: 'full' },
{ path: 'login', component: Login },
{ path: 'register', component: Register },
{ path: 'tickets', component: UserTicket , canActivate : [authGuard , roleGuard],
    data: { allowedRoles: ['USER'] }
 },
{ path: 'tickets/:id', component: UserChat , canActivate : [authGuard , roleGuard] ,
    data: { allowedRoles: ['USER' , 'ADMIN'] }},

{ path: 'admin', component: AdminDashboard , canActivate : [authGuard , roleGuard] ,
    data: { allowedRoles: ['ADMIN'] }
},
{
    path : 'unauthorized' , component : UnAuthorized
}
];
