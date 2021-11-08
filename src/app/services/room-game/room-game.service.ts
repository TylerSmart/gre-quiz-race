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
      this.questions$.next(response.questions);
      this.state$.next(response.state);
      this.questionIndex$.next(response.questionIndex);
    });

    this.state$.subscribe((state) => {
      switch (state) {
        case RoomGameState.Player1Ready:
          this.readyTimer = this.createTimer();
          this.readyTimer.timer$.subscribe((_) => {
            this.state$.next(RoomGameState.Player1);
            this.readyTimer = null;
          });
          break;
        case RoomGameState.Player1:
          this.player1Start = new Date();
          this.questionIndex$.next(0);
          break;
        case RoomGameState.Player2Ready:
          this.player1End = new Date();
          this.readyTimer = this.createTimer();
          this.readyTimer.timer$.subscribe((_) => {
            this.state$.next(RoomGameState.Player2);
            this.readyTimer = null;
          });
          break;
        case RoomGameState.Player2:
          this.player2Start = new Date();
          this.questionIndex$.next(0);
          break;
        case RoomGameState.Review:
          this.player2End = new Date();
          break;
      }
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
        if (this.state$.getValue() == RoomGameState.Player1) {
          this.state$.next(RoomGameState.Player2Ready);
        } else {
          this.state$.next(RoomGameState.Review);
        }
      } else {
        this.questionIndex$.next(questionIndex + 1);
      }
    } else {
      this.currentQuestion.review = true;
    }
  }
}
