import { Component, OnInit } from '@angular/core';
import { IQuestionData } from 'src/app/services/questions/questions.service';
import {
  RoomGameService,
  RoomGameState,
} from 'src/app/services/room-game/room-game.service';

@Component({
  selector: 'app-room-game',
  templateUrl: './room-game.component.html',
  styleUrls: ['./room-game.component.scss'],
})
export class RoomGameComponent implements OnInit {
  timeCounter: number | null = null;
  question: IQuestionData | null = null;
  timerInterval: any = null;

  constructor(public RoomGame: RoomGameService) {
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
  }

  ngOnInit(): void {}

  get RoomGameState() {
    return RoomGameState;
  }
}
