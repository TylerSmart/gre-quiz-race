import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomGameService } from 'src/app/services/room-game/room-game.service';

@Component({
  selector: 'app-room-join-actions',
  templateUrl: './room-join-actions.component.html',
  styleUrls: ['./room-join-actions.component.scss'],
})
export class RoomJoinActionsComponent implements OnInit {
  public roomForm = new FormGroup({
    name: new FormControl(undefined, [Validators.required]),
    room: new FormControl(undefined, [Validators.required]),
  });

  constructor(public roomGame: RoomGameService, private router: Router) {}

  ngOnInit(): void {}

  public async createRoom() {
    const { name, room } = this.roomForm.value;

    this.roomGame.joinRoom(name, room);
  }

  public async leaveRoom() {
    this.roomGame
      .leaveRoom()
      .then(() => {})
      .finally(() => {
        this.router.navigateByUrl('home');
      });
  }

  public async startGame() {
    console.log('Here');
    this.roomGame.startGame().then(() => {});
  }
}
