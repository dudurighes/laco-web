import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { AppMaterialModule } from 'src/app/app-material.module';

@NgModule({
  imports:[
    CommonModule,
    AppMaterialModule,
    FormsModule
  ],
  declarations: [ConfirmDialogComponent]
})
export class ConfirmDialogModule { }
