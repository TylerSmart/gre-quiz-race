import { TestBed } from '@angular/core/testing';

import { SameDeviceGameService } from './same-device-game.service';

describe('SameDeviceGameService', () => {
  let service: SameDeviceGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SameDeviceGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
