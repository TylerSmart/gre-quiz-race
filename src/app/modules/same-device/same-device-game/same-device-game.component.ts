import { Component, OnInit } from '@angular/core';
import { timeInterval } from 'rxjs/operators';
import { IQuestionData } from 'src/app/services/questions/questions.service';
import {
  SameDeviceGameService,
  SameDeviceGameState,
} from 'src/app/services/same-device-game/same-device-game.service';

@Component({
  selector: 'app-same-device-game',
  templateUrl: './same-device-game.component.html',
  styleUrls: ['./same-device-game.component.scss'],
})
export class SameDeviceGameComponent implements OnInit {
  timeCounter: number | null = null;
  question: IQuestionData | null = null;
  timerInterval: any;

  constructor(public SameDeviceGame: SameDeviceGameService) {
    this.SameDeviceGame.state$.subscribe((state) => {
      clearInterval(this.timerInterval);
      switch (state) {
        case SameDeviceGameState.Player1:
          this.timeCounter = 0;
          this.timerInterval = setInterval(() => {
            this.timeCounter =
              new Date().getTime() -
              this.SameDeviceGame.player1Start!.getTime();
          });
          break;
        case SameDeviceGameState.Player2:
          this.timeCounter = 0;
          this.timerInterval = setInterval(() => {
            this.timeCounter =
              new Date().getTime() -
              this.SameDeviceGame.player2Start!.getTime();
          });
          break;
        default:
          this.timeCounter = null;
      }
    });

    this.SameDeviceGame.questionIndex$.subscribe((index) => {
      if (typeof index == 'number')
        this.question = this.SameDeviceGame.questions$.getValue()![index];
    });
  }

  ngOnInit(): void {}

  get SameDeviceGameState() {
    return SameDeviceGameState;
  }
}
