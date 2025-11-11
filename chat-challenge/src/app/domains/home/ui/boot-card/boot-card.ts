import { Component, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Chat } from '../chat/chat';

@Component({
  selector: 'app-boot-card',
  imports: [Chat, AvatarModule, AvatarGroupModule],
  templateUrl: './boot-card.html',
  styleUrl: './boot-card.scss',
})
export class BootCard {
  protected chatWithBoot = signal(false);

  protected goToChat() {
    this.chatWithBoot.set(true);
  }
}
