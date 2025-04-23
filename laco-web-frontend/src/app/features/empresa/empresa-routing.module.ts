import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthEmpresaGuard } from 'src/app/core/authentication/auth-empresa.guard';
import { AuthGuard } from 'src/app/core/authentication/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import {EmpresaListarComponent} from "./empresa-listar/empresa-listar.component";
import {EmpresaCadastroComponent} from "./empresa-cadastro/empresa-cadastro.component";
import {LayoutComponent} from "../../../shared/layout/layout.component";

const routes: Routes = [
  {
    path: '',
    component: EmpresaListarComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Empresas',
    },
  },
  {
    path: 'cadastro',
    component: EmpresaCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Cadastro de empresa',
    },
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthEmpresaGuard],
    data: {
      title: 'Dashboard',
    },
  },
  {
    path: 'denuncia',
    loadChildren: () => import('./denuncia/denuncia.module').then(m => m.DenunciaModule),
    canActivate: [AuthEmpresaGuard],
  },
  {
    path: 'perfil',
    loadChildren: () => import('./../perfil/perfil.module').then(m => m.PerfilModule),
    canActivate: [AuthEmpresaGuard],
  },
  {
    path: 'tipo-denuncia',
    loadChildren: () => import('./tipo-denuncia/tipo-denuncia.module').then(m => m.TipoDenunciaModule),
    canActivate: [AuthEmpresaGuard],
  },

  {
    path: 'usuariosSistema',
    loadChildren: () => import('./../usuario/usuario.module').then(m => m.UsuarioModule),
    canActivate: [AuthEmpresaGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
