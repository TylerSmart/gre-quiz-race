import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, timer } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { TimerData } from '../game/game.service';
import {
  IAnswerData,
  IQuestionData,
  QuestionsService,
} from '../questions/questions.service';

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

  public questions$: BehaviorSubject<IQuestionData[] | null> =
    new BehaviorSubject<IQuestionData[] | null>(null);
  public questionIndex$: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(null);

  public readyTimer: TimerData | null = null;

  constructor(private QuestionsService: QuestionsService) {
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
          this.player1Start = new Date();
          this.questionIndex$.next(0);
          break;
        case SameDeviceGameState.Player2Ready:
          this.player1End = new Date();
          this.readyTimer = this.createTimer();
          this.readyTimer.timer$.subscribe((_) => {
            this.state$.next(SameDeviceGameState.Player2);
            this.readyTimer = null;
          });
          break;
        case SameDeviceGameState.Player2:
          this.player2Start = new Date();
          this.questionIndex$.next(0);
          break;
        case SameDeviceGameState.Review:
          this.player2End = new Date();
          break;
      }
    });

    this.questions$.subscribe((questions) => {
      if (questions) this.state$.next(SameDeviceGameState.Player1Ready);
    });

    this.QuestionsService.getQuestions().then((questions) =>
      this.questions$.next(questions)
    );
  }

  get reviewQuestions(): IQuestionData[] | null {
    return (
      this.questions$.getValue()?.filter((question) => question.review) ?? null
    );
  }

  get currentQuestion(): IQuestionData {
    return this.questions$.getValue()![this.questionIndex$.getValue()!];
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

  checkAnswer(answer: IAnswerData) {
    if (answer.correct) {
      const questionIndex: number = this.questionIndex$.getValue() as number;
      if (questionIndex + 1 >= 10) {
        if (this.state$.getValue() == SameDeviceGameState.Player1) {
          this.state$.next(SameDeviceGameState.Player2Ready);
        } else {
          this.state$.next(SameDeviceGameState.Review);
        }
      } else {
        this.questionIndex$.next(questionIndex + 1);
      }
    } else {
      this.currentQuestion.review = true;
    }
  }
}
