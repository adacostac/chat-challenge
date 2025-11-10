import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BootCard } from './domains/home/ui/boot-card/boot-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, BootCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('chat-challenge');
}
