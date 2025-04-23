import { AutoFocus } from './autoFocus/autoFocus.directive';

import { NgxMaskModule } from 'ngx-mask';
import { AppMaterialModule } from 'src/app/app-material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndDirective } from './dragAndDropFiles/dnd.directive';



@NgModule({
  declarations: [
    AutoFocus,
    DndDirective
   ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialModule,
    NgxMaskModule,
  ],
  exports:[
    AutoFocus,
    DndDirective
  ]
})
export class DiretivasModule { }
