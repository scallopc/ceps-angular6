import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CepRoutingModule } from './cep-routing.module';
import { SearchCepComponent } from './search-cep/search-cep.component';
import { SearchListComponent } from './search-list/search-list.component';
import { MaterialModule } from '../_helpers/material-imports';
import { SearchHomeComponent } from './search-home/search-home.component';
import { ComponentsModule } from "../components/components.module";
import { NgxMaskModule } from 'ngx-mask';
import { ViaCepService } from '../_services/via-cep.service';

const routes: Routes = [
  {
    path: '',
    component: SearchHomeComponent
  }
];

@NgModule({
  declarations: [
    SearchCepComponent,
    SearchListComponent,
    SearchHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forChild(routes),
    CepRoutingModule,
    ComponentsModule,
    NgxMaskModule.forRoot()
],
  exports: [
    SearchCepComponent,
    SearchListComponent,
    SearchHomeComponent
  ],
  providers: [ViaCepService]
})
export class CepModule { }
