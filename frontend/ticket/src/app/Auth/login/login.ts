import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../Services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule , FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
private auth = inject(Auth);
private router = inject(Router);
email = '';
password = '';
error = '';


submit() {
this.error = '';
this.auth.login(this.email, this.password).subscribe({
next: (res) => { this.auth.setToken(res.access_token);
  if(this.auth.user()?.role === 'ADMIN') {
    this.router.navigateByUrl('/admin');
  } else {
    this.router.navigateByUrl('/');
  }
},
error: (e) => this.error = e.error?.message || 'Login failed',
});
}
}
