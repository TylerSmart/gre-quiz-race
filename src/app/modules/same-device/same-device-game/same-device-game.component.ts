import { Component, OnInit } from '@angular/core';
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
  constructor(public SameDeviceGame: SameDeviceGameService) {}

  ngOnInit(): void {}

  get SameDeviceGameState() {
    return SameDeviceGameState;
  }
}
