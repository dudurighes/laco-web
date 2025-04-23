import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material.module';
import { LoginRoutingModule } from './login-routing.module';
import { RouterModule } from '@angular/router';

import { SnackBarMessageModule } from 'src/app/shared/components/snack-bar-message/snack-bar-message.module';
import { InputsModule } from 'src/app/shared/components/inputs/inputs.module';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    RouterModule,
    AppMaterialModule,
    ReactiveFormsModule,
    SnackBarMessageModule,
    LoginRoutingModule,
  ],
  providers: [
  ],
  bootstrap: []
})


export class LoginModule { }
