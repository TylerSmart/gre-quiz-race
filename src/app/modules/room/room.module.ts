import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomJoinActionsComponent } from './room-join-actions/room-join-actions.component';
import { RoomViewComponent } from './room-view/room-view.component';
import { RouterModule } from '@angular/router';
import { RoomGameComponent } from './room-game/room-game.component';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { GameModule } from '../game/game.module';
import { FreezeDialogComponent } from './freeze-dialog/freeze-dialog.component';

@NgModule({
  declarations: [
    RoomJoinActionsComponent,
    RoomViewComponent,
    RoomGameComponent,
    FreezeDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    PipesModule,
    GameModule,
  ],
})
export class RoomModule {}
