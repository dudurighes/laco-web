import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthEmpresaGuard } from 'src/app/core/authentication/auth-empresa.guard';
import {EmpresaListarComponent} from "../empresa/empresa-listar/empresa-listar.component";
import {EmpresaCadastroComponent} from "../empresa/empresa-cadastro/empresa-cadastro.component";
import {DashboardComponent} from "../empresa/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthEmpresaGuard],
    data: {
      title: 'Dashboard',
    },
  },
  {
    path: 'empresa',
    component: EmpresaListarComponent,
    canActivate: [AuthEmpresaGuard],
    data: {
      title: 'Empresas',
    },
  },
  {
    path: 'cadastro',
    component: EmpresaCadastroComponent,
    canActivate: [AuthEmpresaGuard],
    data: {
      title: 'Cadastro de empresa',
    },
  },
  {
    path: 'denuncia',
    loadChildren: () => import('../empresa/denuncia/denuncia.module').then(m => m.DenunciaModule),
    canActivate: [AuthEmpresaGuard],
  },
  {
    path: 'perfil',
    loadChildren: () => import('./../perfil/perfil.module').then(m => m.PerfilModule),
    canActivate: [AuthEmpresaGuard],
  },
  {
    path: 'empresa',
    loadChildren: () => import('../empresa/empresa.module').then(m => m.EmpresaModule),
    canActivate: [AuthEmpresaGuard],
  },
  {
    path: 'tipo-denuncia',
    loadChildren: () => import('../empresa/tipo-denuncia/tipo-denuncia.module').then(m => m.TipoDenunciaModule),
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
export class VigilanciaRoutingModule { }
