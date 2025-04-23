import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DenunciaRoutingModule } from './denuncia-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material.module';

import { InputsModule } from 'src/app/shared/components/inputs/inputs.module';
import {DenunciaCadastroComponent} from "./denuncia-cadastro/denuncia-cadastro.component";
import {DenunciaListarComponent} from "./denuncia-listar/denuncia-listar.component";
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
  imports: [
    DenunciaRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    InputsModule
  ],
  declarations: [
    DenunciaCadastroComponent,
    DenunciaListarComponent
  ],
})
export class DenunciaModule { }
