import { NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-chat',
  imports: [
    ChipModule,
    InputTextModule,
    FormsModule,
    OverlayBadgeModule,
    AvatarModule,
    AvatarGroupModule,
    NgClass
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat implements AfterViewInit, OnDestroy {
  protected value = '';
  protected minimized = signal(false);
  protected showOptionsMenu = signal(false);
  protected showAngelLeft = signal(false);
  protected showAngelRight = signal(true);
  private onScroll = () => this.checkPositions();
  protected readonly bootName = "Jhon Doe";

  @ViewChild('suggestionContainer', { read: ElementRef }) suggestionContainer?: ElementRef<HTMLDivElement>;

  protected messages = [
    { from: 'boot', text: '¡Hola! ¿En qué puedo ayudarte hoy?' },
    { from: 'user', text: '¿Qué es un chatbot?' },
    { from: 'boot', text: 'Un chatbot es un programa de inteligencia artificial diseñado para simular conversaciones humanas.' },
    { from: 'user', text: '¿Cómo funcionan los chatbots?' },
    { from: 'boot', text: 'Los chatbots funcionan utilizando procesamiento de lenguaje natural (NLP) para entender y responder a las consultas de los usuarios.' }
  ];

  protected suggestions = [
    { text: '¿Qué es un chatbot?', id: 1 },
    { text: '¿Cómo funcionan los chatbots?', id: 2 },
    { text: '¿Cuáles son los beneficios de usar chatbots?', id: 3 },
    { text: '¿Dónde se utilizan los chatbots?', id: 4 }
  ];

  protected readonly optionsMenuItems = [
    { label: 'Política de privacidad', icon: 'pi pi-shield' },
    { label: 'Seleccionar idioma', icon: 'pi pi-globe' },
    { label: 'Olvidar mis datos', icon: 'pi pi-info-circle' }
  ]

  ngAfterViewInit(): void {
    const el = this.suggestionContainer?.nativeElement;
    if (!el) return;
    el.addEventListener('scroll', this.onScroll, { passive: true });
    setTimeout(() => this.checkPositions(), 0);
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
    this.minimized.update(value => !value);
  }

  protected showOptions() {
    this.showOptionsMenu.update(value => !value);
  }

  protected closeOptions() {
    this.showOptionsMenu.set(false);
  }

  ngOnDestroy(): void {
    const el = this.suggestionContainer?.nativeElement;
    if (!el) return;
    el.removeEventListener('scroll', this.onScroll);
  }
}
