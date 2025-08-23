import { Component, inject, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Auth } from './Services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , CommonModule ,RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  auth = inject(Auth)
  protected readonly title = signal('ticket');
}
