import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SameDeviceActionsComponent } from './same-device-actions.component';

describe('SameDeviceActionsComponent', () => {
  let component: SameDeviceActionsComponent;
  let fixture: ComponentFixture<SameDeviceActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SameDeviceActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SameDeviceActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
