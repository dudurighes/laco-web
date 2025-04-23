import { AuthGuard } from 'src/app/core/authentication/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecursoListarComponent } from "./recurso-listar/recurso-listar.component";
import {RecursoCadastroComponent} from "./recurso-cadastro/recurso-cadastro.component";
import {RecursoAlterarComponent} from "./recurso-alterar/recurso-alterar.component";

const routes: Routes = [
  {
    path: '',
    component: RecursoListarComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Lista Recurso',
    },
  },
  {
    path: 'cadastro',
    component: RecursoCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Cadastrar Recurso',
    },
  },

  {
    path: 'atualizar/:recursoId',
    component: RecursoAlterarComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Atualizar Recurso',
    },
  },
  { path: '', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursoRoutingModule { }
