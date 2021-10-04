import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, timer } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { TimerData } from '../game/game.service';
import { IQuestionData } from '../questions/questions.service';

export enum SameDeviceGameState {
  Player1Ready,
  Player1,
  Player2Ready,
  Player2,
  Review,
}

@Injectable({
  providedIn: 'root',
})
export class SameDeviceGameService {
  public state$: BehaviorSubject<SameDeviceGameState | null> =
    new BehaviorSubject<SameDeviceGameState | null>(null);

  public player1Start: Date | null = null;
  public player2Start: Date | null = null;
  public player1End: Date | null = null;
  public player2End: Date | null = null;

  public questions: IQuestionData[] | null = null;

  public readyTimer: TimerData | null = null;

  constructor() {
    this.state$.subscribe((state) => {
      switch (state) {
        case SameDeviceGameState.Player1Ready:
          this.readyTimer = this.createTimer();
          this.readyTimer.timer$.subscribe((_) => {
            this.state$.next(SameDeviceGameState.Player1);
            this.readyTimer = null;
          });
          break;
        case SameDeviceGameState.Player1:
          break;
        case SameDeviceGameState.Player2Ready:
          this.readyTimer = this.createTimer();
          this.readyTimer.timer$.subscribe((_) => {
            this.state$.next(SameDeviceGameState.Player2);
            this.readyTimer = null;
          });
          break;
        case SameDeviceGameState.Player2:
          break;
        case SameDeviceGameState.Review:
          break;
      }
    });

    this.state$.next(SameDeviceGameState.Player1Ready);
  }

  get reviewQuestions(): IQuestionData[] | null {
    return this.questions?.filter((question) => question.review) ?? null;
  }

  createTimer(seconds: number = 5): TimerData {
    const timer$ = timer(seconds * 1000);
    const interval$ = interval(1000);
    const countdown$ = interval$.pipe(
      startWith(-1),
      take(seconds),
      map((num) => seconds - num - 1)
    );

    countdown$.subscribe((val) => console.log(seconds - val - 1));

    return { timer$, interval$, countdown$ };
  }
}
