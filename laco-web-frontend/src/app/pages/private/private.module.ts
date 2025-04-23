import { InputsModule } from './../../shared/components/inputs/inputs.module';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './../../app-material.module';
import { NgModule } from '@angular/core';
import { PrivateRoutingModule } from './private-routing.module';
import { HomeComponent } from './home/home.component';
import {DenunciaListarComponent} from "./empresa/denuncia/denuncia-listar/denuncia-listar.component";
import {ButtonsModule} from "../../shared/components/buttons/buttons.module";
import {SharedModule} from "../../shared/shared.module";
import {SituacaoLabelModule} from "../../shared/components/situacao-label/situacao-label.module";
import {ConfigComponent} from "./config/config.component";
import {CnaeComponent} from "./config/cnae/cnae.component";



@NgModule({
  declarations: [
    HomeComponent,
    ConfigComponent,
    CnaeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrivateRoutingModule,
    FormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    InputsModule,
    SituacaoLabelModule
  ]
})
export class PrivateModule { }
