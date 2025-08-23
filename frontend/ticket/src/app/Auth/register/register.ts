import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../Services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule , CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
private auth = inject(Auth);
private router = inject(Router);
email = '';
password = '';
error = '';


submit() {
this.error = '';
this.auth.register(this.email, this.password).subscribe({
next: (res) => { this.auth.setToken(res.access_token); this.router.navigateByUrl('/'); },
error: (e) => this.error = e.error?.message || 'Register failed',
});
}
}
