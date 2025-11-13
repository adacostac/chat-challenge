import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { App } from './app';
import { BootCard } from './domains/home/ui/boot-card/boot-card';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isOpenChat signal should be false by default', () => {
    expect((component as any).isOpenChat()).toBeFalse();
  });

  it('openChat() should set isOpenChat to true and set BootCard.chatWithBoot to true if BootCard is present', async () => {
    const bootDebug = fixture.debugElement.query(By.directive(BootCard));
    let bootInstance: BootCard | undefined = bootDebug?.componentInstance as BootCard | undefined;

    if (!bootInstance) {
      const bootFixture = TestBed.createComponent(BootCard);
      bootInstance = bootFixture.componentInstance;
      (component as any).suggestionContainer = bootInstance;
    } else {
      (component as any).suggestionContainer = bootInstance;
    }

    expect((component as any).isOpenChat()).toBeFalse();
    expect((component as any).suggestionContainer).toBeTruthy();
    expect(((component as any).suggestionContainer as BootCard).chatWithBoot()).toBeFalse();

    component.openChat();
    fixture.detectChanges();

    expect((component as any).isOpenChat()).toBeTrue();
    const target = (component as any).suggestionContainer as BootCard;
    expect(target).toBeTruthy();
    expect(target.chatWithBoot()).toBeTrue();
  });
});

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('IA y asistentes virtuales para revolucionar la empresa');
  });
});
