import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material.module';

import { InputsModule } from 'src/app/shared/components/inputs/inputs.module';
import {ButtonsModule} from "../../../shared/components/buttons/buttons.module";
import {SharedModule} from "../../../shared/shared.module";
import {EmpresaListarComponent} from "./empresa-listar/empresa-listar.component";
import {EmpresaCadastroComponent} from "./empresa-cadastro/empresa-cadastro.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EmpresaRoutingModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    InputsModule,
  ],
  declarations: [
    DashboardComponent,
    EmpresaListarComponent,
    EmpresaCadastroComponent
  ]
})
export class EmpresaModule { }
