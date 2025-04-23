import { ListaUsuarioAdminComponent } from './lista-usuario-admin/lista-usuario-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/authentication/auth.guard';
import {UsuarioCadastroComponent} from "./usuario-cadastro/usuario-cadastro.component";

const routes: Routes = [
  // {
  //   path: '',
  //   component: ListarUsuarioComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Lista Usuário',
  //   },
  // },
  {
    path: 'cadastro',
    component: UsuarioCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Cadastrar Usuário',
    },
  },
  {
    path: '',
    component: ListaUsuarioAdminComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Lista Usuário',
    },
  },
  // {
  //   path: 'atualizar/:usuarioId',
  //   component: AtualizarUsuarioComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Atualizar Usuário',
  //   },
  // },
  //
  // {
  //   path: 'registrar-acesso',
  //   component: RegistrarUsuarioEmpresaComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Registrar Acesso',
  //   },
  // },

  { path: '', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
