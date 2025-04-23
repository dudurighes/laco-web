import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarMessageComponent } from './snack-bar-message.component';
import { AppMaterialModule } from 'src/app/app-material.module';
import { SuccessSnackBarComponent } from '../success-snack-bar/success-snack-bar.component';
import { WarnSnackBarComponent } from '../warn-snack-bar/warn-snack-bar.component';
import { ErrorSnackBarComponent } from '../error-snack-bar/error-snack-bar.component';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
  ],
  declarations: [SnackBarMessageComponent, SuccessSnackBarComponent, WarnSnackBarComponent, ErrorSnackBarComponent],
  exports: [SnackBarMessageComponent],
})
export class SnackBarMessageModule { }
