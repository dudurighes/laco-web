import { NewButtonComponent } from './new-button/new-button.component';

import { NgxMaskModule } from 'ngx-mask';
import { AppMaterialModule } from 'src/app/app-material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';
import { ConfirmButtonComponent } from './confirm-button/confirm-button.component';
import {UpdateButtonComponent} from "./update-button/update-button.component";


@NgModule({
  declarations: [
    NewButtonComponent,CancelButtonComponent,
    ConfirmButtonComponent, UpdateButtonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialModule,
    NgxMaskModule,

  ],
  exports:[
    NewButtonComponent,ConfirmButtonComponent, CancelButtonComponent, UpdateButtonComponent
  ]
})
export class ButtonsModule { }
