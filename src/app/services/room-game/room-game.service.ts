import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, interval, timer } from 'rxjs';
import { startWith, take, map } from 'rxjs/operators';
import { TimerData } from '../game/game.service';
import { IAnswerData, IQuestionData } from '../questions/questions.service';

export class RoomPlayer {
  constructor(public name: string, public admin: boolean) {}
}

export enum RoomGameState {
  Player1Ready,
  Player1,
  Player2Ready,
  Player2,
  Review,
}

@Injectable({
  providedIn: 'root',
})
export class RoomGameService {
  name?: string;

  player1?: RoomPlayer;
  player2?: RoomPlayer;

  public state$ = new BehaviorSubject<RoomGameState | null>(null);

  public player1Start: Date | null = null;
  public player2Start: Date | null = null;
  public player1End: Date | null = null;
  public player2End: Date | null = null;

  public questions$ = new BehaviorSubject<IQuestionData[] | null>(null);
  public questionIndex$ = new BehaviorSubject<number | null>(null);

  public fiftyFifty = new BehaviorSubject<boolean>(false);
  public freeze = new BehaviorSubject<boolean>(false);

  public readyTimer: TimerData | null = null;

  get player(): RoomPlayer | null {
    if (this.player1 && this.player1?.name == this.name) return this.player1;
    if (this.player2 && this.player2?.name == this.name) return this.player2;
    // throw 'Player is not either one of the players.';
    return null;
  }

  constructor(
    private socket: Socket,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.connect();

    this.questions$.subscribe((questions) => {
      console.warn('QUESTIONS WERE UPDATED');
    });

    this.socket.on('room-users', (users: any) => {
      console.log({ users });

      this.player1 = users[0]
        ? new RoomPlayer(users[0].name, users[0].admin)
        : undefined;
      this.player2 = users[1]
        ? new RoomPlayer(users[1].name, users[1].admin)
        : undefined;
    });

    this.socket.on('start', () => {
      this.router.navigateByUrl('room/game');
    });

    this.socket.on('game', (response: any) => {
      this.socket.removeAllListeners('start-error');
      console.log({ response });
      if (response.questions) this.questions$.next(response.questions);
      this.state$.next(response.state);
      this.questionIndex$.next(response.questionIndex);

      if (response.player1Start)
        this.player1Start = new Date(response.player1Start);
      if (response.player2Start)
        this.player2Start = new Date(response.player2Start);
      if (response.player1End) this.player1End = new Date(response.player1End);
      if (response.player2End) this.player2End = new Date(response.player2End);
    });

    this.state$.subscribe((state) => {
      console.log({ state });
      switch (state) {
        case RoomGameState.Player1Ready:
          this.fiftyFifty.next(false);
          this.freeze.next(false);
          this.readyTimer = this.createTimer();
          this.readyTimer.timer$.subscribe((_) => {
            // this.state$.next(RoomGameState.Player1);
            if (this.name == this.player1?.name)
              this.socket.emit('ready-finished');
            this.readyTimer = null;
          });
          break;
        case RoomGameState.Player1:
          if (!this.player1Start) this.player1Start = new Date();
          // this.questionIndex$.next(0);
          break;
        case RoomGameState.Player2Ready:
          this.fiftyFifty.next(false);
          this.freeze.next(false);
          this.player1End = new Date();
          this.readyTimer = this.createTimer();
          this.readyTimer.timer$.subscribe((_) => {
            // this.state$.next(RoomGameState.Player2);
            if (this.name == this.player2?.name)
              this.socket.emit('ready-finished');
            this.readyTimer = null;
          });
          break;
        case RoomGameState.Player2:
          if (!this.player2Start) this.player2Start = new Date();
          // this.questionIndex$.next(0);
          break;
        case RoomGameState.Review:
          this.player2End = new Date();
          break;
      }
    });

    this.socket.on('fiftyFifty', () => {
      this.fiftyFifty.next(true);
    });

    this.socket.on('freeze', () => {
      this.freeze.next(true);
    });
  }

  public connect() {
    this.socket.connect();
  }

  public async joinRoom(name: string, room: string) {
    return new Promise((resolve, reject) => {
      this.socket.once('join-error', (response: any) => {
        this.snackBar.open(response.error, undefined, {
          panelClass: 'error',
          duration: 5000,
        });
        reject(response.error);
      });
      this.socket.once('room-users', () => {
        this.name = name;
        this.socket.removeAllListeners('join-error');
        resolve(true);
      });

      this.socket.emit('join', name, room);
    });
  }

  public async leaveRoom() {
    return new Promise((resolve, reject) => {
      this.socket.once('leave-error', (response: any) => {
        this.snackBar.open(response.error, undefined, {
          panelClass: 'error',
          duration: 5000,
        });
        reject(response.error);
      });
      this.socket.once('room-users', () => {
        this.name = undefined;
        this.socket.removeAllListeners('leave-error');
        resolve(true);
      });

      this.socket.emit('leave');
    });
  }

  public async startGame() {
    return new Promise((resolve, reject) => {
      this.socket.once('start-error', (response: any) => {
        this.snackBar.open(response.error, undefined, {
          panelClass: 'error',
          duration: 5000,
        });
        reject(response.error);
      });

      this.socket.on('game', (response: any) => {
        this.socket.removeAllListeners('start-error');
        resolve(true);
      });

      this.socket.emit('start');
    });
  }

  get reviewQuestions(): IQuestionData[] | null {
    if (this.player1 && this.player1?.name == this.name) {
      return (
        this.questions$
          .getValue()
          ?.filter((question) => question.reviewPlayer1) ?? null
      );
    } else {
      return (
        this.questions$
          .getValue()
          ?.filter((question) => question.reviewPlayer1) ?? null
      );
    }
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
        if (this.state$.getValue() == RoomGameState.Player1) {
          this.socket.emit('switch');
          // this.state$.next(RoomGameState.Player2Ready);
        } else {
          this.socket.emit('review');
          // this.state$.next(RoomGameState.Review);
        }
      } else {
        this.socket.emit('question', questionIndex + 1);
        this.questionIndex$.next(questionIndex + 1);
      }
    } else {
      this.socket.emit('review-question');
      this.currentQuestion.review = true;
    }
  }

  playAgain() {
    this.socket.emit('play-again');
    this.state$.next(null);
    this.player1Start = null;
    this.player2Start = null;
    this.player1End = null;
    this.player2End = null;

    this.questions$.next(null);
    this.questionIndex$.next(null);
  }

  useFiftyFifty() {
    this.socket.emit('fiftyFifty');
  }

  useFreeze() {
    this.socket.emit('freeze');
  }
}
