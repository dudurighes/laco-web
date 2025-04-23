import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthEmpresaGuard } from 'src/app/core/authentication/auth-empresa.guard';
import { AuthGuard } from 'src/app/core/authentication/auth.guard';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { HomeComponent } from './home/home.component';
import {ConfigComponent} from "./config/config.component";
import {EmpresaListarComponent} from "./empresa/empresa-listar/empresa-listar.component";
import {ListaUsuarioAdminComponent} from "./usuario/lista-usuario-admin/lista-usuario-admin.component";

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard],
        data: {
          title: 'Home',
        },
      },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'empresa', loadChildren:
          () => import('./empresa/empresa.module').then(m => m.EmpresaModule),
        canActivate: [AuthGuard],
      },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'usuariosSistema', loadChildren:
          () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
        canActivate: [AuthGuard],
      },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'perfil', loadChildren:
          () => import('./perfil/perfil.module').then(m => m.PerfilModule),
        canActivate: [AuthGuard],
      },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'recurso', loadChildren:
          () => import('./recurso/recurso.module').then(m => m.RecursoModule),
        canActivate: [AuthGuard],
      },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'config', component: ConfigComponent, canActivate: [AuthGuard],
        data: {
          title: 'Configurações',
        },
      },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'empresa/:empresaId', loadChildren:
          () => import('./empresa/empresa.module').then(m => m.EmpresaModule),
      },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'vigilancia/:empresaId', loadChildren:
          () => import('./vigilancia/vigilancia.module')
            .then(m => m.VigilanciaModule),
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
