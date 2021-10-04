import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view/home-view.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { HomeActionsComponent } from './home-actions/home-actions.component';

@NgModule({
  declarations: [HomeViewComponent, HomeActionsComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class HomeModule {}
