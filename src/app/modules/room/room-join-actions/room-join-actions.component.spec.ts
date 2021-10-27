import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomJoinActionsComponent } from './room-join-actions.component';

describe('RoomJoinActionsComponent', () => {
  let component: RoomJoinActionsComponent;
  let fixture: ComponentFixture<RoomJoinActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomJoinActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomJoinActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
