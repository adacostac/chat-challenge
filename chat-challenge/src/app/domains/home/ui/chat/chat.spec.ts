import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { ChatMessageModel } from '../../models/chat-message.model';
import { ChatMessageService } from '../../services/chat-message';
import { Chat } from './chat';

describe('Chat', () => {
  let component: Chat;
  let fixture: ComponentFixture<Chat>;
  let mockService: any;
  let messagesSubj: BehaviorSubject<ChatMessageModel[]>;

  beforeEach(async () => {
    messagesSubj = new BehaviorSubject<ChatMessageModel[]>([
      { from: 'bot', text: 'hola', time: Date.now() } as ChatMessageModel
    ]);

    mockService = {
      messages$: messagesSubj.asObservable(),
      sendMessage: jasmine.createSpy('sendMessage')
    };

    await TestBed.configureTestingModule({
      imports: [Chat],
      providers: [
        { provide: ChatMessageService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Chat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to messages$ and set messages', () => {
    expect((component as any).messages.length).toBe(1);
    expect((component as any).messages[0].text).toBe('hola');
  });

  it('send(answer) should call sendMessage with answer text and id', () => {
    (component as any).send({ text: '¿Qué es un chatbot?', id: 1 });
    expect(mockService.sendMessage).toHaveBeenCalledWith('¿Qué es un chatbot?', 1);
  });

  it('send() should send typed value and clear it', () => {
    (component as any).value = 'hello';
    (component as any).send();
    expect(mockService.sendMessage).toHaveBeenCalledWith('hello');
    expect((component as any).value).toBe('');
  });

  it('minimize toggles toggleChat', () => {
    const before = (component as any).toggleChat();
    (component as any).minimize();
    expect((component as any).toggleChat()).toBe(!before);
  });

  it('moveToRight sets showAngelLeft true and moveToLeft sets showAngelRight true', fakeAsync(() => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'clientWidth', { get: () => 200 });
    Object.defineProperty(el, 'scrollWidth', { get: () => 1000 });
    let internalScrollLeft = 0;
    Object.defineProperty(el, 'scrollLeft', {
      get: () => internalScrollLeft,
      set: (v: number) => { internalScrollLeft = v; }
    });
    (el as any).scrollBy = jasmine.createSpy('scrollBy').and.callFake(function (opts: any) {
      internalScrollLeft += opts.left || 0;
    });

    (component as any).suggestionContainer = { nativeElement: el } as any;

    (component as any).moveToRight();
    expect((component as any).showAngelLeft()).toBeTrue();

    (component as any).moveToLeft();
    expect((component as any).showAngelRight()).toBeTrue();
  }));

  it('ngAfterViewChecked scrolls to bottom when messages length changed', () => {
    const scrollEl = { nativeElement: { scrollTop: 0, scrollHeight: 500 } } as any;
    (component as any).scrollContainer = scrollEl;
    (component as any).lastMessagesLength = 0;
    (component as any).messages = [{ from: 'bot', text: 'x', time: Date.now() }];

    component.ngAfterViewChecked();
    expect((component as any).scrollContainer.nativeElement.scrollTop).toBe((component as any).scrollContainer.nativeElement.scrollHeight);
  });

});
