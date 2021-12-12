import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IQuestionData } from 'src/app/services/questions/questions.service';
import {
  RoomGameService,
  RoomGameState,
} from 'src/app/services/room-game/room-game.service';
import { FreezeDialogComponent } from '../freeze-dialog/freeze-dialog.component';

@Component({
  selector: 'app-room-game',
  templateUrl: './room-game.component.html',
  styleUrls: ['./room-game.component.scss'],
})
export class RoomGameComponent implements OnInit {
  timeCounter: number | null = null;
  question: IQuestionData | null = null;
  timerInterval: any = null;

  constructor(public RoomGame: RoomGameService, private dialog: MatDialog) {
    this.RoomGame.state$.subscribe((state) => {
      clearInterval(this.timerInterval);
      switch (state) {
        case RoomGameState.Player1:
          this.timeCounter = 0;
          this.timerInterval = setInterval(() => {
            this.timeCounter =
              new Date().getTime() - this.RoomGame.player1Start!.getTime();
          });
          break;
        case RoomGameState.Player2:
          this.timeCounter = 0;
          this.timerInterval = setInterval(() => {
            this.timeCounter =
              new Date().getTime() - this.RoomGame.player2Start!.getTime();
          });
          break;
        default:
          this.timeCounter = null;
      }
    });

    this.RoomGame.questionIndex$.subscribe((index) => {
      if (typeof index == 'number')
        this.question = this.RoomGame.questions$.getValue()![index];
    });

    this.RoomGame.fiftyFifty.subscribe((value) => {
      if (value == true && this.question) {
        const wrongAnswers = this.question.answers.filter(
          (answer) => !answer.correct
        );
        const randNum = Math.round(Math.random() * 100) % wrongAnswers.length;
        this.question.answers = this.question.answers.filter((answer) => {
          if (answer.correct) return true;
          if (answer == wrongAnswers[randNum]) return true;
          return false;
        });
      }
    });

    this.RoomGame.freeze.subscribe((value) => {
      if (value == true && this.question) {
        this.dialog.open(FreezeDialogComponent, {
          hasBackdrop: true,
          disableClose: true,
        });
      }
    });
  }

  ngOnInit(): void {}

  get RoomGameState() {
    return RoomGameState;
  }

  useFiftyFifty() {
    if (this.RoomGame.fiftyFifty.getValue())
      return console.error('User has already used 50/50!');

    this.RoomGame.useFiftyFifty();
  }

  useFreeze() {
    if (this.RoomGame.freeze.getValue())
      return console.error('User has already used freeze!');

    this.RoomGame.useFreeze();
  }
}
