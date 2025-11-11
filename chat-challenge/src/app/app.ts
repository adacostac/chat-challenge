import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { BootCard } from './domains/home/ui/boot-card/boot-card';

@Component({
  selector: 'app-root',
  imports: [
    ButtonModule,
    MenuModule,
    BootCard
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {


  protected readonly title = signal('chat-challenge');
  protected readonly items = [
    {
      label: 'Chatbots',
      icon: 'pi pi-home'
    },
    {
      label: 'Contacto',
      icon: 'pi pi-star'
    },
    {
      label: 'Blog',
      icon: 'pi pi-envelope'
    },
    {
      label: 'Solicita una demo',
      icon: 'pi pi-envelope'
    }
  ]
}
