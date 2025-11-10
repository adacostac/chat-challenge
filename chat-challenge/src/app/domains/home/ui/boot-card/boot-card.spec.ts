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
});
