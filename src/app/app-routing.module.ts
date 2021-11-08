import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameViewComponent } from './modules/game/game-view/game-view.component';
import { HomeActionsComponent } from './modules/home/home-actions/home-actions.component';
import { HomeViewComponent } from './modules/home/home-view/home-view.component';
import { RoomGameComponent } from './modules/room/room-game/room-game.component';
import { RoomJoinActionsComponent } from './modules/room/room-join-actions/room-join-actions.component';
import { RoomViewComponent } from './modules/room/room-view/room-view.component';
import { SameDeviceActionsComponent } from './modules/same-device/same-device-actions/same-device-actions.component';
import { SameDeviceGameComponent } from './modules/same-device/same-device-game/same-device-game.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeViewComponent,
    children: [{ path: '', component: HomeActionsComponent }],
  },
  {
    path: 'same-device',
    component: HomeViewComponent,
    children: [{ path: '', component: SameDeviceActionsComponent }],
  },
  {
    path: 'same-device/game',
    component: GameViewComponent,
    children: [{ path: '', component: SameDeviceGameComponent }],
  },
  {
    path: 'room',
    component: RoomViewComponent,
    children: [{ path: 'join', component: RoomJoinActionsComponent }],
  },
  {
    path: 'room/game',
    component: GameViewComponent,
    children: [{ path: '', component: RoomGameComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
