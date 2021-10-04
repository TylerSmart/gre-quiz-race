import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SameDeviceActionsComponent } from './same-device-actions/same-device-actions.component';
import { RouterModule } from '@angular/router';
import { SameDeviceGameComponent } from './same-device-game/same-device-game.component';

@NgModule({
  declarations: [SameDeviceActionsComponent, SameDeviceGameComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class SameDeviceModule {}
