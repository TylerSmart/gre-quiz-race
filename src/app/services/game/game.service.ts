import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TimerData {
  timer$: Observable<number>;
  interval$: Observable<number>;
  countdown$: Observable<number>;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}
}
