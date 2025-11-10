import { Component, signal } from '@angular/core';
import { Chat } from '../chat/chat';

@Component({
  selector: 'app-boot-card',
  imports: [Chat],
  templateUrl: './boot-card.html',
  styleUrl: './boot-card.scss',
})
export class BootCard {
  protected chatWithBoot = signal(false);

  protected goToChat() {
    this.chatWithBoot.set(true);
  }
}
