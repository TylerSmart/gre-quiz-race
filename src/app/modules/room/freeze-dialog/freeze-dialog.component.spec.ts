import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezeDialogComponent } from './freeze-dialog.component';

describe('FreezeDialogComponent', () => {
  let component: FreezeDialogComponent;
  let fixture: ComponentFixture<FreezeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreezeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreezeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
