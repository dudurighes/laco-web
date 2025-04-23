import { InputsModule } from 'src/app/shared/components/inputs/inputs.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from './../../../shared/components/dialog/confirm-dialog/confirm-dialog.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from 'src/app/app-material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuarioAdminComponent } from './lista-usuario-admin/lista-usuario-admin.component';
import {UsuarioCadastroComponent} from "./usuario-cadastro/usuario-cadastro.component";



@NgModule({
  declarations: [
    UsuarioCadastroComponent,
    ListaUsuarioAdminComponent,
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule,
    FormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    InputsModule,
  ]
})
export class UsuarioModule { }
