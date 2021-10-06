import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SameDeviceActionsComponent } from './same-device-actions/same-device-actions.component';
import { RouterModule } from '@angular/router';
import { SameDeviceGameComponent } from './same-device-game/same-device-game.component';
import { GameModule } from '../game/game.module';
import { TimePipe } from 'src/app/modules/pipes/time/time.pipe';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [SameDeviceActionsComponent, SameDeviceGameComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    GameModule,
    PipesModule,
  ],
})
export class SameDeviceModule {}
