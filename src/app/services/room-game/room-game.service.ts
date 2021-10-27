import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Socket } from 'ngx-socket-io';

export class RoomPlayer {
  constructor(public name: string, public admin: boolean) {}
}

@Injectable({
  providedIn: 'root',
})
export class RoomGameService {
  name?: string;

  player1?: RoomPlayer;
  player2?: RoomPlayer;

  get player(): RoomPlayer | null {
    if (this.player1 && this.player1?.name == this.name) return this.player1;
    if (this.player2 && this.player2?.name == this.name) return this.player2;
    // throw 'Player is not either one of the players.';
    return null;
  }

  constructor(private socket: Socket, private snackBar: MatSnackBar) {
    this.connect();

    this.socket.on('room-users', (users: any) => {
      console.log({ users });

      this.player1 = users[0]
        ? new RoomPlayer(users[0].name, users[0].admin)
        : undefined;
      this.player2 = users[1]
        ? new RoomPlayer(users[1].name, users[1].admin)
        : undefined;
    });
  }

  public connect() {
    this.socket.connect();
  }

  public async joinRoom(name: string, room: string) {
    return new Promise((resolve, reject) => {
      this.socket.once('join-error', (response: any) => {
        this.snackBar.open(response.error, undefined, {
          panelClass: 'error',
          duration: 5000,
        });
        reject(response.error);
      });
      this.socket.once('room-users', () => {
        this.name = name;
        this.socket.removeAllListeners('join-error');
        resolve(true);
      });

      this.socket.emit('join', name, room);
    });
  }

  public async leaveRoom() {
    return new Promise((resolve, reject) => {
      this.socket.once('leave-error', (response: any) => {
        this.snackBar.open(response.error, undefined, {
          panelClass: 'error',
          duration: 5000,
        });
        reject(response.error);
      });
      this.socket.once('room-users', () => {
        this.name = undefined;
        this.socket.removeAllListeners('leave-error');
        resolve(true);
      });

      this.socket.emit('leave');
    });
  }
}
