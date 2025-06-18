import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../_helpers/material-imports';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    MaterialModule,
    RouterModule,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
