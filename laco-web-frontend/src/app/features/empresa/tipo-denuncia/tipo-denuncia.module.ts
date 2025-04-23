import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoDenunciaRoutingModule } from './tipo-denuncia-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material.module';
import { InputsModule } from 'src/app/shared/components/inputs/inputs.module';
import {SharedModule} from "../../../../shared/shared.module";
import {TipoDenunciaListarComponent} from "./tipo-denuncia-listar/tipo-denuncia-listar.component";
import {TipoDenunciaCadastroComponent} from "./tipo-denuncia-cadastro/tipo-denuncia-cadastro.component";

@NgModule({
  imports: [
    TipoDenunciaRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    InputsModule
  ],
  declarations: [
    TipoDenunciaListarComponent,
    TipoDenunciaCadastroComponent
  ],
})
export class TipoDenunciaModule { }
