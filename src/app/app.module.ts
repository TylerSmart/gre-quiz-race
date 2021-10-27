import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './modules/home/home.module';
import { SameDeviceModule } from './modules/same-device/same-device.module';
import { GameModule } from './modules/game/game.module';
import { TimePipe } from './modules/pipes/time/time.pipe';
import { RoomModule } from './modules/room/room.module';
import { environment } from 'src/environments/environment';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: environment.SOCKETIO_ENDPOINT };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    GameModule,
    SameDeviceModule,
    RoomModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
