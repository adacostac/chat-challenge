import { NgClass } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { BootCard } from './domains/home/ui/boot-card/boot-card';

@Component({
  selector: 'app-root',
  imports: [
    ButtonModule,
    MenuModule,
    BootCard,
    AvatarModule,
    OverlayBadgeModule,
    NgClass
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  @ViewChild(BootCard) suggestionContainer?: BootCard;
  protected readonly isOpenChat = signal(false);

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
  ];

  protected openChat(): void {
    this.isOpenChat.set(true);
    if (this.suggestionContainer) {
      this.suggestionContainer.chatWithBoot.set(true);
    }
  }
}
