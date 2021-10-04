import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyPlayer1Component } from './ready-player1.component';

describe('ReadyPlayer1Component', () => {
  let component: ReadyPlayer1Component;
  let fixture: ComponentFixture<ReadyPlayer1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadyPlayer1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyPlayer1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
