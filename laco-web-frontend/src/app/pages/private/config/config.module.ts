import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material.module';
import { InputsModule } from 'src/app/shared/components/inputs/inputs.module';
import {SharedModule} from "../../../shared/shared.module";
import {CnaeComponent} from "./cnae/cnae.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    InputsModule
  ],

})
export class ConfigModule { }
