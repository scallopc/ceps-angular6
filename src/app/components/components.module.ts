import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../_helpers/material-imports';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    BreadcrumbComponent,
    ToastComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
