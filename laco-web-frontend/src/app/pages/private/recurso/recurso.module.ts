import { ButtonsModule } from '../../../shared/components/buttons/buttons.module';
import { InputsModule } from '../../../shared/components/inputs/inputs.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '../../../shared/components/dialog/confirm-dialog/confirm-dialog.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AppMaterialModule } from '../../../app-material.module';
import { RecursoRoutingModule } from './recurso-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecursoListarComponent} from "./recurso-listar/recurso-listar.component";
import {RecursoCadastroComponent} from "./recurso-cadastro/recurso-cadastro.component";
import {RecursoAlterarComponent} from "./recurso-alterar/recurso-alterar.component";



@NgModule({
  declarations: [
    RecursoListarComponent,
    RecursoCadastroComponent,
    RecursoAlterarComponent
  ],
  imports: [
    CommonModule,
    RecursoRoutingModule,
    AppMaterialModule,
    SharedModule,
    FormsModule,
    FlexLayoutModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    InputsModule,
    ButtonsModule
  ]
})
export class RecursoModule { }
