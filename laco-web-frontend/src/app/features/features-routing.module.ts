import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/authentication/auth.guard';
import { LayoutComponent } from '../shared/layout/layout.component';
import { HomeComponent } from './home/home.component';
import { ConfigComponent } from './config/config.component';

const routes: Routes = [
  // Public routes
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  // Private routes
  {
    path: 'private',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home', 
        component: HomeComponent,
        data: { title: 'Home' }
      },
      {
        path: 'empresa', 
        loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule)
      },
      {
        path: 'usuariosSistema', 
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
      },
      {
        path: 'perfil', 
        loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule)
      },
      {
        path: 'recurso', 
        loadChildren: () => import('./recurso/recurso.module').then(m => m.RecursoModule)
      },
      {
        path: 'config', 
        component: ConfigComponent,
        data: { title: 'Configurações' }
      },
      {
        path: 'empresa/:empresaId', 
        loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule)
      },
      {
        path: 'vigilancia/:empresaId', 
        loadChildren: () => import('./vigilancia/vigilancia.module').then(m => m.VigilanciaModule)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }