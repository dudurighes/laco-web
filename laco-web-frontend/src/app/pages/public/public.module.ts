import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';

import { SnackBarMessageModule } from 'src/app/shared/components/snack-bar-message/snack-bar-message.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material.module';
import { RouterModule } from '@angular/router';
import { InputsModule } from 'src/app/shared/components/inputs/inputs.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    InputsModule,
    RouterModule,
    AppMaterialModule,
    ReactiveFormsModule,
    SnackBarMessageModule,

    PublicRoutingModule,
  ],
})
export class PublicModule {}
