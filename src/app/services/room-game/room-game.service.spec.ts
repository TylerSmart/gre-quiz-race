import { TestBed } from '@angular/core/testing';

import { RoomGameService } from './room-game.service';

describe('RoomGameService', () => {
  let service: RoomGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
