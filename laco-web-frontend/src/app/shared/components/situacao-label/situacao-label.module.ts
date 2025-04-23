import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SituacaoLabelComponent } from './situacao-label.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [SituacaoLabelComponent],
  exports: [SituacaoLabelComponent]
})
export class SituacaoLabelModule { }
