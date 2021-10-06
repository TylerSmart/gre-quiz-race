import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameViewComponent } from './game-view/game-view.component';
import { CountdownComponent } from './countdown/countdown.component';
import { QuestionComponent } from './question/question.component';
import { ReviewComponent } from './review/review.component';
import { ReadyPlayer1Component } from './ready-player1/ready-player1.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    GameViewComponent,
    CountdownComponent,
    QuestionComponent,
    ReviewComponent,
    ReadyPlayer1Component,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [QuestionComponent],
})
export class GameModule {}
