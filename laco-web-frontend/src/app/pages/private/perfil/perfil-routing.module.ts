import { PerfilListarComponent } from './perfil-listar/perfil-listar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/authentication/auth.guard';
import {PerfilCadastroComponent} from "./perfil-cadastro/perfil-cadastro.component";
import {PerfilAlterarComponent} from "./perfil-alterar/perfil-alterar.component";

const routes: Routes = [
  {
    path: '',
    component: PerfilListarComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Lista Perfil',
    },
  },
  {
    path: 'cadastro',
    component: PerfilCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Cadastrar Perfil',
    },
  },

  {
    path: 'alterar/:perfilId',
    component: PerfilAlterarComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Atualizar Perfil',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
