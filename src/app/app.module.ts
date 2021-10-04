import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './modules/home/home.module';
import { SameDeviceModule } from './modules/same-device/same-device.module';
import { GameModule } from './modules/game/game.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    GameModule,
    SameDeviceModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
