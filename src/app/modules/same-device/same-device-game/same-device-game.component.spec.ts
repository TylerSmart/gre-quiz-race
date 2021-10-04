import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SameDeviceGameComponent } from './same-device-game.component';

describe('SameDeviceGameComponent', () => {
  let component: SameDeviceGameComponent;
  let fixture: ComponentFixture<SameDeviceGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SameDeviceGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SameDeviceGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
