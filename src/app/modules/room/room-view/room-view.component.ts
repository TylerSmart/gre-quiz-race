import { Component, OnInit } from '@angular/core';
import { RoomGameService } from 'src/app/services/room-game/room-game.service';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss'],
})
export class RoomViewComponent implements OnInit {
  constructor(private roomGame: RoomGameService) {}

  ngOnInit(): void {}
}
