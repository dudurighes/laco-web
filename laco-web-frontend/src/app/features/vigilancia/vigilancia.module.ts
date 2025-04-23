import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VigilanciaRoutingModule } from './vigilancia-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material.module';

import { InputsModule } from 'src/app/shared/components/inputs/inputs.module';
import {ButtonsModule} from "../../../shared/components/buttons/buttons.module";
import {SharedModule} from "../../../shared/shared.module";
import {EmpresaListarComponent} from "../empresa/empresa-listar/empresa-listar.component";
import {EmpresaCadastroComponent} from "../empresa/empresa-cadastro/empresa-cadastro.component";
import {DashboardComponent} from "../empresa/dashboard/dashboard.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    VigilanciaRoutingModule,
  ],
})
export class VigilanciaModule { }
