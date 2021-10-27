import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomJoinActionsComponent } from './room-join-actions/room-join-actions.component';
import { RoomViewComponent } from './room-view/room-view.component';
import { RouterModule } from '@angular/router';
import { RoomGameComponent } from './room-game/room-game.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    RoomJoinActionsComponent,
    RoomViewComponent,
    RoomGameComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
})
export class RoomModule {}
