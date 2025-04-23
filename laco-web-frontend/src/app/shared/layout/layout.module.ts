import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { SnackBarMessageModule } from '../components/snack-bar-message/snack-bar-message.module';
import { AppMaterialModule } from 'src/app/app-material.module';
import { InputsModule } from '../components/inputs/inputs.module';
import { RouterModule } from '@angular/router';
import {SharedModule} from "../shared.module";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  imports: [
    CommonModule,
    SnackBarMessageModule,
    AppMaterialModule,
    RouterModule,
    InputsModule
  ],
  declarations: [],
})
export class LayoutModule { }
