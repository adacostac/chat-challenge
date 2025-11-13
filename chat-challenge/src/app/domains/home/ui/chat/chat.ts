import { NgClass } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { of, Subscription } from 'rxjs';
import { ChatMessageModel } from '../../models/chat-message.model';
import { ChatMessageService } from '../../services/chat-message';

interface suggestion { text: string; id: number; }

@Component({
  selector: 'app-chat',
  imports: [
    ChipModule,
    InputTextModule,
    FormsModule,
    OverlayBadgeModule,
    AvatarModule,
    AvatarGroupModule,
    NgClass,
    ButtonModule
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  private readonly _chatMessageService = inject(ChatMessageService);

  protected message = '';
  protected readonly toggleChat = signal(false);
  protected readonly showOptionsMenu = signal(false);
  protected readonly showAngelLeft = signal(false);
  protected readonly showAngelRight = signal(true);
  protected readonly bootName = "Jhon Doe";
  protected messagesSub?: Subscription;
  public messages: ChatMessageModel[] = [];
  private lastMessagesLength = 0;

  private onScroll = () => this.checkPositions();
  @ViewChild('suggestionContainer', { read: ElementRef }) suggestionContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('scrollContainer', { static: false }) private scrollContainer!: ElementRef;

  protected readonly suggestionsList = rxResource({
    params: () => null,
    stream: () => {
      return of([
        { text: '¿Qué es un chatbot?', id: 1 },
        { text: '¿Cómo funcionan los chatbots?', id: 2 },
        { text: '¿Cuáles son los beneficios de usar chatbots?', id: 3 },
        { text: '¿Dónde se utilizan los chatbots?', id: 4 }
      ])
    }
  });


  protected readonly optionsMenuItems = rxResource({
    params: () => null,
    stream: () => {
      return of([
        { label: 'Política de privacidad', icon: 'pi pi-shield' },
        { label: 'Seleccionar idioma', icon: 'pi pi-globe' },
        { label: 'Olvidar mis datos', icon: 'pi pi-info-circle' }
      ])
    }
  });

  ngOnInit(): void {
    this.messagesSub = this._chatMessageService.messages$.subscribe(m => this.messages = m);
  }

  ngAfterViewInit(): void {
    const el = this.suggestionContainer?.nativeElement;
    if (!el) return;
    el.addEventListener('scroll', this.onScroll, { passive: true });
    setTimeout(() => this.checkPositions(), 0);
  }

  ngAfterViewChecked(): void {
    if (!this.scrollContainer) return;
    if (this.messages.length !== this.lastMessagesLength) {
      this.scrollToBottom();
      this.lastMessagesLength = this.messages.length;
    }
  }

  private scrollToBottom(): void {
    try {
      const el = this.scrollContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (err) {
    }
  }

  protected moveToRight() {
    const el = this.suggestionContainer?.nativeElement;
    if (!el) return;
    const amount = Math.floor(el.clientWidth * 0.8);
    el.scrollBy({ left: amount, behavior: 'smooth' });

    this.showAngelLeft.set(true);

    setTimeout(() => this.checkPositions(), 200);
  }

  protected moveToLeft() {
    const el = this.suggestionContainer?.nativeElement;
    if (!el) return;
    const amount = Math.floor(el.clientWidth * 0.8);
    el.scrollBy({ left: -amount, behavior: 'smooth' });

    this.showAngelRight.set(true);

    setTimeout(() => this.checkPositions(), 200);
  }

  private checkPositions() {
    const el = this.suggestionContainer?.nativeElement;
    if (!el) return;

    const eps = 1;
    const isAtStart = el.scrollLeft <= eps;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - eps;

    this.showAngelLeft.set(!isAtStart);
    this.showAngelRight.set(!isAtEnd);
  }

  protected minimize() {
    this.toggleChat.update(value => !value);
    this.showOptionsMenu.set(false);
  }

  protected showOptions() {
    this.showOptionsMenu.update(value => !value);
  }

  protected closeOptions() {
    this.showOptionsMenu.set(false);
  }

  protected send(answer?: suggestion) {
    if (answer) {
      this._chatMessageService.sendMessage(answer.text, answer.id);
    } else {
      const text = this.message?.trim();
      if (!text) return;
      this._chatMessageService.sendMessage(text);
      this.message = '';
    }
  }

  ngOnDestroy(): void {
    const el = this.suggestionContainer?.nativeElement;
    if (!el) return;
    el.removeEventListener('scroll', this.onScroll);
    this.messagesSub?.unsubscribe();
  }
}
