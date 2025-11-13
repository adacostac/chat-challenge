import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootCard } from './boot-card';

describe('BootCard', () => {
  let component: BootCard;
  let fixture: ComponentFixture<BootCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BootCard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BootCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('chatWithBoot signal should be false by default', () => {
    expect(component.chatWithBoot()).toBeFalse();
  });

  it('goToChat() should set chatWithBoot to true', () => {
    component.goToChat();
    expect(component.chatWithBoot()).toBeTrue();
  });

  it('clicking the preview div should open the chat and render <app-chat>', async () => {
    const el: HTMLElement = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain('¡Hola, soy Jhon!');

    const clickable = el.querySelector('.cursor-pointer') as HTMLElement | null;
    expect(clickable).toBeTruthy();

    clickable!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.chatWithBoot()).toBeTrue();

    const appChat = el.querySelector('app-chat');
    expect(appChat).toBeTruthy();
  });
});
