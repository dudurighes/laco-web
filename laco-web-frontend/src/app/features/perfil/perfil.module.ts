import { InputsModule } from 'src/app/shared/components/inputs/inputs.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '../../../shared/components/dialog/confirm-dialog/confirm-dialog.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppMaterialModule } from 'src/app/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilListarComponent } from './perfil-listar/perfil-listar.component';
import {PerfilCadastroComponent} from "./perfil-cadastro/perfil-cadastro.component";
import {PerfilAlterarComponent} from "./perfil-alterar/perfil-alterar.component";

@NgModule({
  declarations: [
    PerfilCadastroComponent,
    PerfilListarComponent,
    PerfilAlterarComponent,
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    AppMaterialModule,
    SharedModule,
    FormsModule,
    FlexLayoutModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    InputsModule,
  ]
})
export class PerfilModule { }
